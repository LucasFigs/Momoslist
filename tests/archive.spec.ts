import { test, expect } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

const url = process.env.TEST_DATABASE_URL;
if (url) {
  const parsed = new URL(url);
  if (parsed.hostname !== "127.0.0.1" || parsed.port !== "55439" || parsed.pathname !== "/postgres")
    throw new Error("Archive tests require isolated local PostgreSQL");
}
const db = new PrismaClient({ datasources: { db: { url: url || "postgresql://unused@127.0.0.1:1/disabled" } }, log: [] });
const uid = randomUUID();
const email = `archive-${uid}@example.invalid`;
const password = "Synthetic-only-password-2026";
let ownerId: string, guestId: string, eventId: string, giftId: string, publicPath: string;

test.describe("gift archive without schema changes", () => {
  test.skip(!url, "Requires isolated database");
  test.beforeAll(async () => {
    ownerId = (await db.user.create({ data: { email, name: "Archive test", emailVerified: new Date(), passwordHash: await bcrypt.hash(password, 12) } })).id;
    guestId = (await db.guest.create({ data: { email: `archive-guest-${uid}@example.invalid`, name: "Convidado sintético", phone: "85999999999" } })).id;
    const event = await db.event.create({ data: { ownerId, title: "Archive test", type: "CHA_CASA_NOVA", slug: uid, secureToken: randomUUID().replace(/-/g, "").slice(0, 24), published: true } });
    eventId = event.id;
    publicPath = `/lista/${event.slug}-${event.secureToken}`;
    await db.gift.create({ data: { eventId, name: "Presente disponível", priceInCents: 1000 } });
    giftId = (await db.gift.create({ data: { eventId, name: "Presente com histórico", priceInCents: 2000 } })).id;
    await db.giftReservation.create({ data: { giftId, guestId, status: "CANCELLED", paymentMethod: "PIX", pixStatus: "DECLARED", amountInCents: 2000, message: "Recado preservado sintético", messagePublic: false, expiresAt: new Date(Date.now() - 60000) } });
  });
  test.afterAll(async () => {
    if (url) {
      await db.user.deleteMany({ where: { id: ownerId } });
      await db.guest.deleteMany({ where: { id: guestId } });
    }
    await db.$disconnect();
  });
  test("owner withdraws and restores; public search and preview hide withdrawn gift", async ({ page, browser }) => {
    const before = await db.giftReservation.findMany({ where: { giftId } });
    await page.goto("/login");
    await page.getByLabel("E-mail", { exact: true }).fill(email);
    await page.getByLabel("Senha", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.goto(`/dashboard/eventos/${eventId}`);
    await page.getByRole("tab", { name: "Presentes", exact: true }).click();
    const publicContext = await browser.newContext();
    const guestPage = await publicContext.newPage();
    await guestPage.goto(publicPath);
    await expect(guestPage.getByRole("heading", { name: "Presente com histórico", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Retirar da lista Presente com histórico", exact: true }).click();
    await expect(page.getByRole("alertdialog")).toContainText("serão preservados");
    await page.getByRole("alertdialog").getByRole("button", { name: "Retirar da lista", exact: true }).click();
    await expect(page.getByRole("button", { name: "Restaurar Presente com histórico", exact: true })).toBeVisible();
    await expect(page.getByText("Retirado", { exact: true }).first()).toBeVisible();
    await page.getByText("Histórico preservado de presentes retirados, reservas e contribuições canceladas", { exact: true }).click();
    await expect(page.getByText(/Recado preservado sintético/)).toBeVisible();
    await expect(page.getByText(/Reserva CANCELLED/)).toBeVisible();
    for (const query of ["", "?q=histórico&sort=price_asc"]) {
      await guestPage.goto(publicPath + query);
      await expect(guestPage.getByRole("heading", { name: "Presente com histórico", exact: true })).toHaveCount(0);
      await expect(guestPage.getByText("Recado preservado sintético")).toHaveCount(0);
    }
    await page.goto(`/previa/${eventId}`);
    await expect(page.getByRole("heading", { name: "Presente com histórico", exact: true })).toHaveCount(0);
    await page.goto(`/dashboard/eventos/${eventId}`);
    await page.getByRole("tab", { name: "Presentes", exact: true }).click();
    await page.getByRole("button", { name: "Editar Presente com histórico", exact: true }).click();
    await page.getByRole("dialog").getByLabel("Nome", { exact: true }).fill("Presente com histórico editado");
    await page.getByRole("button", { name: "Salvar alterações", exact: true }).click();
    await expect.poll(async () => (await db.gift.findUniqueOrThrow({ where: { id: giftId } })).quantity).toBe(0);
    await expect(page.getByRole("dialog")).toBeHidden();
    await page.getByRole("button", { name: "Restaurar Presente com histórico editado", exact: true }).click();
    await page.getByRole("alertdialog").getByRole("button", { name: "Restaurar", exact: true }).click();
    await expect.poll(async () => (await db.gift.findUniqueOrThrow({ where: { id: giftId } })).quantity).toBe(1);
    await guestPage.goto(publicPath);
    await expect(guestPage.getByRole("heading", { name: "Presente com histórico editado", exact: true })).toBeVisible();
    expect(await db.giftReservation.findMany({ where: { giftId } })).toEqual(before);
    await publicContext.close();
  });
});
