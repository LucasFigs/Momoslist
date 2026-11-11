import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
const dbUrl = process.env.TEST_DATABASE_URL;
if (dbUrl) {
  const u = new URL(dbUrl);
  if (
    u.hostname !== "127.0.0.1" ||
    u.port !== "55439" ||
    u.pathname !== "/postgres"
  )
    throw new Error("E2E requires isolated local database");
}
const db = new PrismaClient({
  datasources: {
    db: { url: dbUrl || "postgresql://unused@127.0.0.1:1/disabled" },
  },
  log: [],
});
const uid = randomUUID();
const email = `owner-${uid}@example.invalid`;
const guestEmail = `visitor-${uid}@example.invalid`;
const signupEmail = `signup-${uid}@example.invalid`;
const password = "Local-only-test-password-2026";
let ownerId: string, eventId: string, path: string;
async function otp(email: string) {
  let code = "";
  await expect
    .poll(
      () => {
        try {
          code =
            JSON.parse(readFileSync(process.env.TEST_MAILBOX_FILE!, "utf8"))[
              email
            ] || "";
          return code;
        } catch {
          return "";
        }
      },
      { timeout: 15000 },
    )
    .toMatch(/^\d{6}$/);
  return code;
}
async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
}
async function accessible(page: Page) {
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    report.violations.map((v) => ({
      id: v.id,
      description: v.description,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
}
test.describe("real local journeys", () => {
  test.skip(
    !dbUrl || !process.env.TEST_MAILBOX_FILE,
    "Requires isolated local PostgreSQL and a local-only SMTP capture",
  );
  test.describe.configure({ mode: "serial" });
  test.beforeAll(async () => {
    const user = await db.user.create({
      data: {
        email,
        name: "Casal de teste",
        passwordHash: await bcrypt.hash(password, 12),
        emailVerified: new Date(),
      },
    });
    ownerId = user.id;
    const event = await db.event.create({
      data: {
        ownerId,
        title: "Nosso chá de casa nova com amigos e família",
        type: "CHA_CASA_NOVA",
        description:
          "Um encontro para celebrar nosso novo cantinho com muito carinho.",
        slug: `qa-${uid}`,
        secureToken: randomUUID().replace(/-/g, "").slice(0, 24),
        published: true,
        rsvpEnabled: true,
        pixKey: "test@example.invalid",
        pixKeyType: "EMAIL",
        eventDate: new Date("2027-01-20T18:00:00Z"),
      },
    });
    eventId = event.id;
    path = `/lista/${event.slug}-${event.secureToken}`;
    await db.gift.createMany({
      data: [
        {
          eventId,
          name: "Jogo de panelas para o nosso novo cantinho",
          description:
            "Uma descrição completa que pode ser lida antes de reservar o presente.",
          kind: "PRODUCT",
          priceInCents: 12345,
          purchaseUrl: "https://shop.example.invalid/panelas",
          quantity: 1,
        },
        {
          eventId,
          name: "Cafeteira para as manhãs",
          kind: "PIX",
          priceInCents: 25000,
          quantity: 1,
        },
        {
          eventId,
          name: "Nosso sofá",
          kind: "FUND",
          priceInCents: 100000,
          minContributionInCents: 2000,
          quantity: 1,
        },
      ],
    });
  });
  test.afterAll(async () => {
    if (dbUrl) {
      await db.user.deleteMany({
        where: { email: { in: [email, signupEmail] } },
      });
      await db.guest.deleteMany({ where: { email: guestEmail } });
      await db.$disconnect();
    }
  });
  test("store link works before identification on mobile and desktop", async ({
    page,
  }) => {
    await page
      .context()
      .route("https://shop.example.invalid/**", (route) =>
        route.fulfill({ body: "Loja de teste" }),
      );
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 850 });
      await page.goto(path);
      const storeLink = page.getByRole("link", { name: /Ver na loja/ });
      await expect(storeLink).toBeVisible();
      const [store] = await Promise.all([
        page.waitForEvent("popup"),
        storeLink.click(),
      ]);
      await expect(store).toHaveURL("https://shop.example.invalid/panelas");
      await store.close();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await page
        .getByRole("button", { name: "Ver presente", exact: true })
        .first()
        .click();
      await expect(
        page.getByRole("dialog").getByRole("link", { name: /Ver na loja/ }),
      ).toBeVisible();
      expect(
        await db.giftReservation.count({ where: { gift: { eventId } } }),
      ).toBe(0);
      await noOverflow(page);
    }
  });

  test("mobile layouts, dark mode, home link and accessibility", async ({
    page,
  }, info) => {
    for (const width of [320, 360, 375, 390, 430, 1280]) {
      await page.setViewportSize({ width, height: 850 });
      await page.goto(path);
      await expect(
        page.getByRole("heading", { name: "Lista de presentes", exact: true }),
      ).toBeVisible();
      await noOverflow(page);
      await page.screenshot({
        path: info.outputPath(`lista-${width}.png`),
        fullPage: true,
      });
      await page.getByRole("tab", { name: "Recadinhos", exact: true }).click();
      await expect(
        page.getByRole("button", { name: "Deixar um recadinho 💌" }),
      ).toBeVisible();
      await noOverflow(page);
      await page.reload();
      await expect(
        page.getByRole("tab", { name: "Recadinhos", exact: true }),
      ).toHaveAttribute("data-state", "active");
    }
    await accessible(page);
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();
    await accessible(page);
    await noOverflow(page);
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.evaluate(() =>
      Object.defineProperty(navigator, "share", {
        value: undefined,
        configurable: true,
      }),
    );
    await page.getByRole("button", { name: "Compartilhar lista" }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      "http://127.0.0.1:3107/lista/",
    );
    await page.getByRole("link", { name: /Feito com carinho no/ }).click();
    await expect(page).toHaveURL("http://127.0.0.1:3107/");
    await accessible(page);
  });
  test("guest verifies email, writes without a gift, edits, RSVPs and pays Pix", async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path + "?tab=recadinhos");
    await page.getByRole("button", { name: "Deixar um recadinho 💌" }).click();
    await page.getByLabel("Nome", { exact: false }).fill("Ana convidada");
    await page.getByLabel("E-mail", { exact: false }).fill(guestEmail);
    await page.getByLabel("Telefone", { exact: false }).fill("85999999999");
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await page.getByLabel("Código de 6 dígitos").fill(await otp(guestEmail));
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await page.getByLabel("Sua mensagem").fill("Mensagem privada para o casal");
    await page
      .getByRole("button", { name: "Enviar recadinho", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Editar meu recadinho" }),
    ).toBeVisible();
    await expect(
      page.getByText("Mensagem privada para o casal", { exact: true }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Editar meu recadinho" }).click();
    await page.getByLabel("Sua mensagem").fill("Felicidades no novo cantinho!");
    await page.getByLabel("Quem pode ler?").selectOption("public");
    await accessible(page);
    await page
      .getByRole("button", { name: "Enviar recadinho", exact: true })
      .click();
    await expect(
      page.getByText("Felicidades no novo cantinho!", { exact: true }),
    ).toBeVisible();
    expect(
      await db.giftReservation.count({ where: { gift: { eventId } } }),
    ).toBe(0);
    await page.getByRole("button", { name: "Editar meu recadinho" }).click();
    await page.getByLabel("Sua mensagem").fill("Muito amor no novo cantinho!");
    await page
      .getByRole("button", { name: "Enviar recadinho", exact: true })
      .click();
    await expect(
      page.getByText("Muito amor no novo cantinho!", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Confirmar presença", exact: true })
      .click();
    await page.getByRole("radio", { name: "Vou comparecer" }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Confirmar presença", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Presença confirmada" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "Presentes", exact: true }).click();
    const storeLink = page.getByRole("link", { name: /Ver na loja/ }).first();
    await expect(storeLink).toHaveAttribute("target", "_blank");
    await expect(storeLink).toHaveAttribute("rel", "noopener noreferrer");
    await page
      .context()
      .route("https://shop.example.invalid/**", (route) =>
        route.fulfill({ body: "Loja de teste" }),
      );
    const [store] = await Promise.all([
      page.waitForEvent("popup"),
      storeLink.click(),
    ]);
    await expect(store).toHaveURL("https://shop.example.invalid/panelas");
    await store.close();
    expect(
      await db.giftReservation.count({ where: { gift: { eventId } } }),
    ).toBe(0);
    await page
      .getByRole("button", { name: "Ver presente", exact: true })
      .first()
      .click();
    await expect(
      page
        .getByRole("dialog")
        .getByText(
          "Uma descrição completa que pode ser lida antes de reservar o presente.",
          { exact: true },
        ),
    ).toBeVisible();
    expect(
      await db.giftReservation.count({ where: { gift: { eventId } } }),
    ).toBe(0);
    await page.getByRole("button", { name: "Escolher este presente" }).click();
    const pixMethod = page.getByRole("button", { name: "Presentear com Pix" });
    const storeMethod = page.getByRole("button", {
      name: "Comprar em uma loja",
    });
    await expect(storeMethod).toBeVisible();
    expect(await storeMethod.getAttribute("class")).toBe(
      await pixMethod.getAttribute("class"),
    );
    await pixMethod.click();
    await expect(page.getByRole("img", { name: "QR Code Pix" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Copia e cola", exact: true }),
    ).toBeVisible();
    await noOverflow(page);
    await accessible(page);
    await page.screenshot({
      path: info.outputPath("pix-mobile.png"),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Já fiz o Pix", exact: true })
      .click();
    await expect(page.getByText(/Pix informado — aguardando/)).toBeVisible();
    expect(
      (
        await db.giftReservation.findFirstOrThrow({
          where: { gift: { eventId } },
        })
      ).pixStatus,
    ).toBe("DECLARED");
  });
  test("organizer logs in, confirms Pix, moderates messages and creates a list", async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: 375, height: 850 });
    await login(page);
    await page.goto(`/dashboard/eventos/${eventId}`);
    await noOverflow(page);
    await page
      .getByRole("button", { name: "Confirmar", exact: true })
      .first()
      .click();
    await expect(
      page.getByText("Pix confirmado", { exact: true }).first(),
    ).toBeVisible();
    await page.getByRole("tab", { name: /Recadinhos/ }).click();
    await expect(
      page.getByText("Muito amor no novo cantinho!", { exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Ocultar do mural" }).click();
    await expect(page.getByText(/Oculto pelo organizador/)).toBeVisible();
    await accessible(page);
    await page.screenshot({
      path: info.outputPath("dashboard-mobile.png"),
      fullPage: true,
    });
    await page.goto(path + "?tab=recadinhos");
    await expect(
      page.getByText("Muito amor no novo cantinho!", { exact: true }),
    ).toHaveCount(0);
    await page.goto(`/previa/${eventId}`);
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await page.goto("/dashboard/nova-lista");
    await page.getByLabel("Nome do evento").fill("Outra lista de teste");
    await page.getByLabel("Tipo do evento").selectOption("CHA_CASA_NOVA");
    await page
      .getByRole("button", { name: "Criar lista", exact: true })
      .click();
    await expect(page).toHaveURL(/\/dashboard\/eventos\//);
    await expect(page.getByText("Antes de compartilhar")).toBeVisible();
  });
  test("organizer signup requires delivered code and supports credential login", async ({
    page,
  }) => {
    await page.goto("/cadastro");
    await page.getByLabel("Nome", { exact: true }).fill("Organizador novo");
    await page.getByLabel("E-mail", { exact: true }).fill(signupEmail);
    await page.getByLabel("Senha", { exact: true }).fill(password);
    await page
      .getByRole("button", { name: "Receber código por e-mail" })
      .click();
    await page.getByLabel("Código de 6 dígitos").fill(await otp(signupEmail));
    expect(
      await db.user.findUnique({ where: { email: signupEmail } }),
    ).toBeNull();
    await page.getByRole("button", { name: "Confirmar e-mail" }).click();
    await expect(page).toHaveURL(/\/login\?/);
    expect(
      (await db.user.findUniqueOrThrow({ where: { email: signupEmail } }))
        .emailVerified,
    ).not.toBeNull();
    await page.getByLabel("E-mail", { exact: true }).fill(signupEmail);
    await page.getByLabel("Senha", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
  });
  test("real component previews and local performance observations", async ({
    page,
  }, info) => {
    const before = await db.giftReservation.count({
      where: { gift: { eventId } },
    });
    await page.addInitScript(() => {
      const measurements = { lcp: null as number | null, cls: 0 };
      (window as unknown as { localVitals: typeof measurements }).localVitals =
        measurements;
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            measurements.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch {}
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const shift = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!shift.hadRecentInput) measurements.cls += shift.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch {}
    });
    const observations = [];
    await page.setViewportSize({ width: 375, height: 850 });
    await page.goto("/");
    await page
      .getByText(/Veja a mesma interface usada/)
      .scrollIntoViewIfNeeded();
    await expect(page.locator("[data-demo=guest]")).toContainText(
      "Jogo de panelas",
    );
    await expect(page.locator("[data-demo=dashboard]")).toContainText(
      "Selecionados",
    );
    await expect(page.locator("[data-demo=guest]")).toHaveAttribute(
      "inert",
      "",
    );
    await accessible(page);
    await noOverflow(page);
    await page.screenshot({
      path: info.outputPath("landing-real-components.png"),
      fullPage: true,
    });
    for (const route of ["/", path]) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      observations.push(
        await page.evaluate(() => {
          const navigation = performance.getEntriesByType(
            "navigation",
          )[0] as PerformanceNavigationTiming;
          return {
            observations: (
              window as unknown as {
                localVitals: { lcp: number | null; cls: number };
              }
            ).localVitals,
            ttfbMs: navigation.responseStart - navigation.requestStart,
            transferBytes: navigation.transferSize,
          };
        }),
      );
    }
    await info.attach("local-performance.json", {
      body: JSON.stringify(
        {
          environment:
            "local Edge, synthetic fixtures, no field data or INP claim",
          routes: ["home", "public-list"],
          observations,
        },
        null,
        2,
      ),
      contentType: "application/json",
    });
    writeFileSync(
      info.outputPath("local-performance.json"),
      JSON.stringify(
        {
          environment:
            "local Edge, synthetic fixtures, no field data or INP claim",
          routes: ["home", "public-list"],
          observations,
        },
        null,
        2,
      ),
    );
    expect(
      await db.giftReservation.count({ where: { gift: { eventId } } }),
    ).toBe(before);
  });
  test("external purchase stays unpaid until the guest declares it and the owner receives it", async ({
    page,
    context,
  }) => {
    const gift = await db.gift.create({
      data: {
        eventId,
        name: "Presente da compra externa",
        priceInCents: 9900,
        purchaseUrl: "https://shop.example.invalid/externo",
      },
    });
    await db.event.update({
      where: { id: eventId },
      data: { pixKey: null, pixKeyType: null },
    });
    await page.goto(path);
    await page
      .locator('[data-gift-id="' + gift.id + '"]')
      .getByRole("button", { name: "Ver presente" })
      .click();
    await page.getByRole("button", { name: "Escolher este presente" }).click();
    await page.getByLabel("Nome", { exact: false }).fill("Visitante da loja");
    await page.getByLabel("E-mail", { exact: false }).fill(guestEmail);
    await page.getByLabel("Telefone", { exact: false }).fill("85999999999");
    // Reuse the verified mailbox; a fresh code is required in this new browser session.
    let previousCode = "";
    try {
      previousCode =
        JSON.parse(readFileSync(process.env.TEST_MAILBOX_FILE!, "utf8"))[
          guestEmail
        ] ?? "";
    } catch {}
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect.poll(async () => await otp(guestEmail)).not.toBe(previousCode);
    await page.getByLabel("Código de 6 dígitos").fill(await otp(guestEmail));
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Comprar em uma loja", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Presentear com Pix", exact: true }),
    ).toHaveCount(0);
    await page
      .getByRole("button", { name: "Comprar em uma loja", exact: true })
      .click();
    const store = page.getByRole("link", { name: "Abrir site da loja" });
    await expect(store).toBeVisible();
    await context.route("https://shop.example.invalid/**", (route) =>
      route.fulfill({ body: "Loja de teste" }),
    );
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      store.click(),
    ]);
    await popup.close();
    expect(
      (
        await db.giftReservation.findFirstOrThrow({
          where: { giftId: gift.id },
        })
      ).status,
    ).toBe("CONFIRMED");
    await page.getByRole("button", { name: "Já comprei", exact: true }).click();
    await expect
      .poll(
        async () =>
          (
            await db.giftReservation.findFirstOrThrow({
              where: { giftId: gift.id },
            })
          ).status,
      )
      .toBe("COMPLETED");
    expect(
      (
        await db.giftReservation.findFirstOrThrow({
          where: { giftId: gift.id },
        })
      ).receivedAt,
    ).toBeNull();
    await page.goto("/login");
    await page.getByLabel("E-mail", { exact: true }).fill(email);
    await page.getByLabel("Senha", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.goto("/dashboard/eventos/" + eventId);
    await page
      .getByRole("button", { name: /Ver presentes reservados/ })
      .click();
    await page
      .getByRole("button", { name: "Confirmar recebimento", exact: true })
      .click();
    await expect
      .poll(async () =>
        Boolean(
          (
            await db.giftReservation.findFirstOrThrow({
              where: { giftId: gift.id },
            })
          ).receivedAt,
        ),
      )
      .toBe(true);
  });
});
