import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import { seedHistorySortingFixture, cleanupHistorySortingFixture } from "./history-sorting-fixture";

const url = process.env.TEST_DATABASE_URL;
if (url) {
  const target = new URL(url);
  if (target.hostname !== "127.0.0.1" || target.port !== "55439" || target.pathname !== "/postgres") throw new Error("Requires synthetic local PostgreSQL");
}
const db = new PrismaClient({ datasources: { db: { url: url || "postgresql://unused@127.0.0.1:1/disabled" } }, log: [] });
let fixture: Awaited<ReturnType<typeof seedHistorySortingFixture>>;
const suggested = ["Loja · Reserva temporária vencida", "Loja · Reserva expirada", "Loja · Panela", "Loja · Duas unidades, uma reservada", "Pix · Link inválido", "Pix · Primeiro no empate", "Pix · Segundo no empate", "Vaquinha · Com contribuição confirmada", "Vaquinha · Com Pix declarado", "Vaquinha · Sem contribuições", "Vaquinha · Contribuição cancelada", "Concluído · Vaquinha com meta atingida", "Concluído · Presente reservado", "Concluído · Compra informada"];
const done = suggested.slice(-3);
const ascending = ["Vaquinha · Sem contribuições", "Vaquinha · Contribuição cancelada", "Vaquinha · Com contribuição confirmada", "Pix · Link inválido", "Vaquinha · Com Pix declarado", "Pix · Primeiro no empate", "Pix · Segundo no empate", "Loja · Reserva temporária vencida", "Loja · Reserva expirada", "Loja · Panela", "Loja · Duas unidades, uma reservada", ...done];
const descending = ["Loja · Duas unidades, uma reservada", "Loja · Panela", "Loja · Reserva expirada", "Loja · Reserva temporária vencida", "Pix · Primeiro no empate", "Pix · Segundo no empate", "Pix · Link inválido", "Vaquinha · Com Pix declarado", "Vaquinha · Com contribuição confirmada", "Vaquinha · Contribuição cancelada", "Vaquinha · Sem contribuições", ...done];

test.describe("history presentation and public ordering", () => {
  test.skip(!url, "Requires synthetic database and local application");
  test.beforeAll(async () => { fixture = await seedHistorySortingFixture(db); });
  test.afterAll(async () => { if (fixture) await cleanupHistorySortingFixture(db, fixture); await db.$disconnect(); });

  test("keeps unavailable items last in every sort and composes search without reviving archived items", async ({ page }) => {
    await page.goto(fixture.publicPath);
    const names = () => page.getByRole("heading", { level: 3 }).allTextContents();
    await expect.poll(names).toEqual(suggested);
    for (const [sort, expected] of [["price_asc", ascending], ["price_desc", descending], ["", suggested]] as const) {
      await page.getByRole("combobox", { name: "Ordenar por", exact: true }).selectOption(sort);
      await expect.poll(names).toEqual(expected);
      expect((await names()).slice(-3)).toEqual(done);
    }
    await page.getByRole("searchbox", { name: "Buscar presente" }).fill("Vaquinha");
    await page.getByRole("combobox", { name: "Ordenar por", exact: true }).selectOption("price_desc");
    await expect.poll(names).toEqual(["Vaquinha · Com Pix declarado", "Vaquinha · Com contribuição confirmada", "Vaquinha · Contribuição cancelada", "Vaquinha · Sem contribuições", "Concluído · Vaquinha com meta atingida"]);
    await page.getByRole("searchbox", { name: "Buscar presente" }).fill("Retirado");
    await expect(page.getByText("Nenhum presente encontrado", { exact: true })).toBeVisible();
    await expect(page.getByText(/Recadinho privado preservado/)).toHaveCount(0);
    await expect(page.getByText(/Contribuição cancelada preservada/)).toHaveCount(0);
  });

  test("renders responsive, accessible history without modifying records or disclosing it publicly", async ({ page, browser }) => {
    const before = {
      reservations: await db.giftReservation.findMany({ where: { gift: { eventId: fixture.eventId } }, orderBy: { id: "asc" } }),
      contributions: await db.contribution.findMany({ where: { gift: { eventId: fixture.eventId } }, orderBy: { id: "asc" } }),
    };
    await page.goto("/login");
    await page.getByLabel("E-mail", { exact: true }).fill(fixture.email);
    await page.getByLabel("Senha", { exact: true }).fill(fixture.password);
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.goto(fixture.ownerPath);
    const history = page.getByRole("region", { name: "Histórico preservado", exact: true });
    const summary = history.locator("summary");
    await summary.focus(); await page.keyboard.press("Enter");
    await expect(history.locator("details")).toHaveAttribute("open", "");
    await expect(history.getByText(/Recadinho privado preservado/)).toBeVisible();
    await expect(history.getByText("Pix declarado", { exact: true }).first()).toBeVisible();
    await expect(history.getByText("Expirada", { exact: true })).toBeVisible();
    await expect(history.getByText(/sem reservas ou contribuições anteriores/)).toBeVisible();
    await expect(history.locator("time").first()).toHaveAttribute("datetime", /T/);
    for (const theme of ["light", "dark"]) for (const width of [320, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(theme => { document.documentElement.classList.toggle("dark", theme === "dark"); }, theme);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const historyBox = await history.locator(":scope > div").boundingBox();
      const fundBox = await page.getByRole("heading", { name: "Vaquinhas", exact: true }).locator("..").locator("..").boundingBox();
      expect(Math.abs(historyBox!.x - fundBox!.x)).toBeLessThan(1);
      expect(Math.abs(historyBox!.width - fundBox!.width)).toBeLessThan(1);
    }
    await summary.focus(); await page.keyboard.press("Space");
    await expect(history.locator("details")).not.toHaveAttribute("open", "");
    const anonymous = await browser.newContext(); const guestPage = await anonymous.newPage();
    await guestPage.goto(fixture.ownerPath);
    await expect(guestPage).toHaveURL(/\/login/);
    await guestPage.goto(fixture.publicPath);
    await expect(guestPage.getByRole("region", { name: "Histórico preservado", exact: true })).toHaveCount(0);
    await expect(guestPage.getByText(/Recadinho privado preservado/)).toHaveCount(0);
    await anonymous.close();
    expect(await db.giftReservation.findMany({ where: { gift: { eventId: fixture.eventId } }, orderBy: { id: "asc" } })).toEqual(before.reservations);
    expect(await db.contribution.findMany({ where: { gift: { eventId: fixture.eventId } }, orderBy: { id: "asc" } })).toEqual(before.contributions);
  });
});
