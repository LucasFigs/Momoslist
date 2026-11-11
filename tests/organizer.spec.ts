import { test, expect, type Page } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";

const url = process.env.TEST_DATABASE_URL;
if (url) {
  const target = new URL(url);
  if (
    target.hostname !== "127.0.0.1" ||
    target.port !== "55439" ||
    target.pathname !== "/postgres"
  )
    throw new Error("Requires isolated loopback PostgreSQL");
}
const db = new PrismaClient({
  datasources: {
    db: { url: url || "postgresql://unused@127.0.0.1:1/disabled" },
  },
  log: [],
});
const uid = randomUUID();
const email = `crud-${uid}@example.invalid`;
const legacyEmail = `legacy-${uid}@example.invalid`;
const password = "Synthetic-only-password-2026";
let ownerId: string, eventId: string, publicPath: string;
async function login(page: Page, address = email) {
  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill(address);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
async function code(address: string) {
  let value = "";
  await expect
    .poll(() => {
      try {
        value =
          JSON.parse(readFileSync(process.env.TEST_MAILBOX_FILE!, "utf8"))[
            address
          ] || "";
      } catch {}
      return value;
    })
    .toMatch(/^\d{6}$/);
  return value;
}
test.describe("organizer merge readiness", () => {
  test.use({ actionTimeout: 15000 });
  test.skip(
    !url || !process.env.TEST_MAILBOX_FILE,
    "Requires isolated database and local SMTP",
  );
  test.describe.configure({ mode: "serial" });
  test.beforeAll(async () => {
    const owner = await db.user.create({
      data: {
        email,
        name: "Organizador sintético",
        emailVerified: new Date(),
        passwordHash: await bcrypt.hash(password, 12),
      },
    });
    ownerId = owner.id;
  });
  test.afterAll(async () => {
    if (url) {
      await db.user.deleteMany({
        where: { email: { in: [email, legacyEmail] } },
      });
      await db.guest.deleteMany({
        where: { email: { endsWith: `-${uid}@example.invalid` } },
      });
      await db.$disconnect();
    }
  });
  test("creates, edits, publishes, shares and deletes gifts without losing readiness", async ({
    page,
  }) => {
    await login(page);
    await page.goto("/dashboard/nova-lista");
    await page
      .getByLabel("Nome do evento", { exact: true })
      .fill("Lista de homologação sintética");
    await page
      .getByLabel("Tipo do evento", { exact: true })
      .selectOption("CHA_CASA_NOVA");
    await page
      .getByRole("button", { name: "Criar lista", exact: true })
      .click();
    await expect(page).toHaveURL(/\/dashboard\/eventos\//);
    const event = await db.event.findFirstOrThrow({ where: { ownerId } });
    eventId = event.id;
    publicPath = `/lista/${event.slug}-${event.secureToken}`;
    await page.getByRole("tab", { name: "Presentes", exact: true }).click();
    await page.getByRole("button", { name: "Adicionar", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog
      .getByLabel("Nome", { exact: true })
      .fill("Presente para editar");
    await dialog.getByLabel("Valor (R$)", { exact: true }).fill("25,00");
    await dialog
      .getByLabel("Link da loja (opcional)")
      .fill("https://shop.example.invalid/crud");
    await dialog
      .getByRole("button", { name: "Adicionar presente", exact: true })
      .click();
    await expect(dialog).toBeHidden();
    await page
      .getByRole("button", { name: "Editar Presente para editar", exact: true })
      .click();
    await dialog
      .getByLabel("Nome", { exact: true })
      .fill("Presente atualizado");
    await dialog.getByLabel("Valor (R$)", { exact: true }).fill("35,00");
    await dialog
      .getByRole("button", { name: "Salvar alterações", exact: true })
      .click();
    await expect(dialog).toBeHidden();
    await expect
      .poll(
        async () =>
          (await db.gift.findFirstOrThrow({ where: { eventId } })).priceInCents,
      )
      .toBe(3500);
    await page.getByRole("tab", { name: "Configurações", exact: true }).click();
    await page
      .getByLabel("Nome do evento", { exact: true })
      .fill("Lista personalizada");
    await page
      .getByLabel("Nome do local", { exact: true })
      .fill("Casa de teste");
    await page
      .getByLabel("Tipo da chave", { exact: true })
      .selectOption("EMAIL");
    await page
      .getByLabel("Chave Pix", { exact: true })
      .fill("synthetic@example.invalid");
    await page
      .getByRole("button", { name: "Salvar alterações", exact: true })
      .click();
    await expect
      .poll(
        async () =>
          (await db.event.findUniqueOrThrow({ where: { id: eventId } })).title,
      )
      .toBe("Lista personalizada");
    await page.getByRole("radio", { name: "Terracota", exact: true }).click();
    await page.getByRole("button", { name: "Salvar cor", exact: true }).click();
    await expect
      .poll(
        async () =>
          (await db.event.findUniqueOrThrow({ where: { id: eventId } }))
            .themeColor,
      )
      .toBe("#9E482E");
    await page
      .getByRole("switch", { name: "Não Publicado", exact: true })
      .click();
    await expect
      .poll(
        async () =>
          (await db.event.findUniqueOrThrow({ where: { id: eventId } }))
            .published,
      )
      .toBe(true);
    await page.evaluate(() => {
      const target = window as unknown as {
        copiedUrl: string;
        sharedUrl: string;
      };
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: undefined,
      });
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            target.copiedUrl = value;
          },
        },
      });
    });
    await page
      .getByRole("button", { name: "Compartilhar", exact: true })
      .click();
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { copiedUrl: string }).copiedUrl,
        ),
      )
      .toBe("http://127.0.0.1:3107" + publicPath);
    await page.evaluate(() =>
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async (value: { url: string }) => {
          (window as unknown as { sharedUrl: string }).sharedUrl = value.url;
        },
      }),
    );
    await page
      .getByRole("button", { name: "Compartilhar", exact: true })
      .click();
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { sharedUrl: string }).sharedUrl,
        ),
      )
      .toBe("http://127.0.0.1:3107" + publicPath);
    await page.goto(publicPath);
    await expect(
      page.getByRole("heading", { name: "Lista personalizada", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Casa de teste", { exact: true }),
    ).toBeVisible();
    await page.goto(`/dashboard/eventos/${eventId}?tab=presentes`);
    await page
      .getByRole("button", { name: "Excluir Presente atualizado", exact: true })
      .click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Excluir", exact: true })
      .click();
    await expect(
      page.getByText(/último item de uma lista publicada/).first(),
    ).toBeVisible();
    expect(await db.gift.count({ where: { eventId } })).toBe(1);
    await page.getByRole("switch", { name: "Publicado", exact: true }).click();
    await expect
      .poll(
        async () =>
          (await db.event.findUniqueOrThrow({ where: { id: eventId } }))
            .published,
      )
      .toBe(false);
    const response = await page.request.get(publicPath);
    // Next may stream notFound() with HTTP 200; verify the access boundary itself.
    expect([200, 404]).toContain(response.status());
    const unavailable = await response.text();
    expect(unavailable).toContain("Lista não encontrada");
    expect(unavailable).not.toContain("Presente atualizado");
    expect(unavailable).not.toContain("Lista personalizada");
    await page
      .getByRole("button", { name: "Excluir Presente atualizado", exact: true })
      .click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Excluir", exact: true })
      .click();
    await expect.poll(() => db.gift.count({ where: { eventId } })).toBe(0);
  });
  test("filters, exports and removes RSVP answers without exporting executable formulas", async ({
    page,
  }) => {
    const yes = await db.guest.create({
      data: {
        name: "=Formula segura",
        email: `yes-${uid}@example.invalid`,
        phone: "00000000000",
      },
    });
    const no = await db.guest.create({
      data: {
        name: "Não participante",
        email: `no-${uid}@example.invalid`,
        phone: "00000000000",
      },
    });
    await db.event.update({
      where: { id: eventId },
      data: { rsvpEnabled: true },
    });
    await db.rsvp.createMany({
      data: [
        {
          eventId,
          guestId: yes.id,
          status: "ATTENDING",
          companionAdults: 1,
          companionChildren: 0,
          companionNames: "Acompanhante teste",
        },
        { eventId, guestId: no.id, status: "NOT_ATTENDING" },
      ],
    });
    await login(page);
    await page.goto(`/dashboard/eventos/${eventId}?tab=confirmacoes`);
    await page.getByRole("tab", { name: /^Não vão/ }).click();
    await expect(
      page.getByText("Não participante", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("=Formula segura", { exact: true }),
    ).toHaveCount(0);
    await page.getByRole("tab", { name: /^Vão/ }).click();
    await page.getByLabel("Buscar convidado").fill("Formula");
    await expect(
      page.getByText("=Formula segura", { exact: true }),
    ).toBeVisible();
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page
        .getByRole("button", { name: "Planilha completa", exact: true })
        .click(),
    ]);
    const csv = readFileSync((await download.path())!, "utf8");
    expect(csv).toContain("'=Formula segura");
    expect(csv).toContain("Não participante");
    const [checklist] = await Promise.all([
      page.waitForEvent("download"),
      page
        .getByRole("button", { name: "Lista de convidados", exact: true })
        .click(),
    ]);
    const flat = readFileSync((await checklist.path())!, "utf8");
    expect(flat).toContain("Acompanhante teste");
    expect(flat).not.toContain("Não participante");
    await page
      .getByRole("button", {
        name: "Remover resposta de =Formula segura",
        exact: true,
      })
      .click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Sim, remover", exact: true })
      .click();
    await expect
      .poll(() => db.rsvp.count({ where: { eventId, guestId: yes.id } }))
      .toBe(0);
  });
  test("recovers an unverified legacy account without replacing its id or losing events", async ({
    page,
  }) => {
    const legacy = await db.user.create({
      data: {
        email: legacyEmail,
        name: "Conta legada",
        passwordHash: await bcrypt.hash("Old-unverified-password", 12),
      },
    });
    const event = await db.event.create({
      data: {
        ownerId: legacy.id,
        title: "Lista preservada",
        type: "CHA_CASA_NOVA",
        slug: `legacy-${uid}`,
        secureToken: randomUUID(),
      },
    });
    await page.goto("/login");
    await page.getByLabel("E-mail", { exact: true }).fill(legacyEmail);
    await page
      .getByLabel("Senha", { exact: true })
      .fill("Old-unverified-password");
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page.getByText(/E-mail ou senha incorretos/)).toBeVisible();
    await page.goto("/cadastro");
    await page.getByLabel("Nome", { exact: true }).fill("Conta recuperada");
    await page.getByLabel("E-mail", { exact: true }).fill(legacyEmail);
    await page.getByLabel("Senha", { exact: true }).fill(password);
    await page
      .getByRole("button", { name: "Receber código por e-mail" })
      .click();
    await page.getByLabel("Código de 6 dígitos").fill(await code(legacyEmail));
    await page
      .getByRole("button", { name: "Confirmar e-mail", exact: true })
      .click();
    await expect(page).toHaveURL(/\/login\?/);
    expect(
      (await db.user.findUniqueOrThrow({ where: { email: legacyEmail } })).id,
    ).toBe(legacy.id);
    await login(page, legacyEmail);
    await page.goto(`/dashboard/eventos/${event.id}`);
    await expect(
      page.getByRole("heading", { name: "Lista preservada", exact: true }),
    ).toBeVisible();
    expect(
      (await db.event.findUniqueOrThrow({ where: { id: event.id } })).ownerId,
    ).toBe(legacy.id);
  });
  test("sets Secure HttpOnly cookies through local HTTPS", async ({
    browser,
  }) => {
    test.skip(
      process.env.TEST_HTTPS_BASE_URL !== "https://127.0.0.1:3447",
      "Requires optional isolated TLS proxy",
    );
    const context = await browser.newContext({
      baseURL: "https://127.0.0.1:3447",
      ignoreHTTPSErrors: true,
    });
    try {
      const page = await context.newPage();
      await login(page);
      const session = (await context.cookies()).find((cookie) =>
        cookie.name.includes("session-token"),
      );
      expect(session).toBeDefined();
      expect(session?.secure).toBe(true);
      expect(session?.httpOnly).toBe(true);
      expect(session?.sameSite).toBe("Lax");
      await page.reload();
      await expect(page).toHaveURL(/\/dashboard$/);
      await db.event.update({
        where: { id: eventId },
        data: { published: true },
      });
      await db.gift.create({
        data: { eventId, name: "TLS fixture", priceInCents: 1000 },
      });
      await page.goto(publicPath);
      await page
        .getByRole("button", { name: "Confirmar presença", exact: true })
        .click();
      await page.getByLabel("Nome", { exact: false }).fill("Convidado TLS");
      await page
        .getByLabel("E-mail", { exact: false })
        .fill(`tls-${uid}@example.invalid`);
      await page.getByLabel("Telefone", { exact: false }).fill("85999999999");
      await page
        .getByRole("button", { name: "Continuar", exact: true })
        .click();
      await page
        .getByLabel("Código de 6 dígitos")
        .fill(await code(`tls-${uid}@example.invalid`));
      await page
        .getByRole("button", { name: "Continuar", exact: true })
        .click();
      await expect
        .poll(async () =>
          Boolean(
            (await context.cookies()).find(
              (cookie) => cookie.name === "momos_guest_session",
            ),
          ),
        )
        .toBe(true);
      const guestCookie = (await context.cookies()).find(
        (cookie) => cookie.name === "momos_guest_session",
      );
      expect(guestCookie?.secure).toBe(true);
      expect(guestCookie?.httpOnly).toBe(true);
      expect(guestCookie?.sameSite).toBe("Lax");
      await page.reload();
      await expect(
        page.getByText("Convidado TLS", { exact: true }),
      ).toBeVisible();
    } finally {
      await context.close();
    }
  });
});
