import type { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

export async function seedHistorySortingFixture(db: PrismaClient) {
  const key = randomUUID();
  const email = `history-sorting-${key}@example.invalid`;
  const password = "Synthetic-history-sorting-only-2026";
  const owner = await db.user.create({ data: { email, name: "Organizador de teste", emailVerified: new Date(), passwordHash: await bcrypt.hash(password, 12) } });
  const guest = await db.guest.create({ data: { email: `history-guest-${key}@example.invalid`, name: "Convidada de teste com um nome bastante longo para conferir o alinhamento", phone: "85999999999" } });
  const event = await db.event.create({ data: { ownerId: owner.id, title: "Nosso novo cantinho", type: "CHA_CASA_NOVA", slug: `history-${key}`, secureToken: key.replace(/-/g, "").slice(0, 24), published: true, pixKey: "synthetic@example.invalid", pixKeyType: "EMAIL" } });
  const ids: Record<string, string> = {};
  let index = 0;
  async function gift(name: string, price: number, options: { kind?: "PRODUCT" | "PIX" | "FUND"; quantity?: number; purchaseUrl?: string; min?: number } = {}) {
    const row = await db.gift.create({ data: { eventId: event.id, name, priceInCents: price, kind: options.kind || "PRODUCT", quantity: options.quantity ?? 1, purchaseUrl: options.purchaseUrl ?? null, minContributionInCents: options.min ?? null, createdAt: new Date(Date.UTC(2026, 10, 1, 12, index++)) } });
    ids[name] = row.id; return row;
  }
  const store = "https://shop.example.invalid/product";
  await gift("Loja · Panela", 3000, { purchaseUrl: store });
  const expired = await gift("Loja · Reserva temporária vencida", 2000, { purchaseUrl: store });
  await db.giftReservation.create({ data: { giftId: expired.id, guestId: guest.id, status: "TEMPORARY", expiresAt: new Date(Date.now() - 60000) } });
  const partial = await gift("Loja · Duas unidades, uma reservada", 4000, { purchaseUrl: store, quantity: 2 });
  await db.giftReservation.create({ data: { giftId: partial.id, guestId: guest.id, status: "CONFIRMED", expiresAt: new Date(Date.now() + 60000) } });
  await gift("Pix · Primeiro no empate", 1000, { kind: "PIX" });
  await gift("Pix · Segundo no empate", 1000);
  await gift("Pix · Link inválido", 500, { purchaseUrl: "javascript:alert(1)" });
  const pending = await gift("Vaquinha · Com Pix declarado", 20000, { kind: "FUND", min: 500 });
  await db.contribution.create({ data: { giftId: pending.id, guestId: guest.id, amountInCents: 25000, status: "DECLARED" } });
  const active = await gift("Vaquinha · Com contribuição confirmada", 20000, { kind: "FUND", min: 300 });
  await db.contribution.create({ data: { giftId: active.id, guestId: guest.id, amountInCents: 2000, status: "CONFIRMED" } });
  await gift("Vaquinha · Sem contribuições", 20000, { kind: "FUND", min: 100 });
  const cancelled = await gift("Vaquinha · Contribuição cancelada", 20000, { kind: "FUND", min: 200 });
  await db.contribution.create({ data: { giftId: cancelled.id, guestId: guest.id, amountInCents: 6000, status: "CANCELLED", message: "Contribuição cancelada preservada, visível somente aos organizadores.", messagePublic: false, cancelledAt: new Date() } });
  const reached = await gift("Concluído · Vaquinha com meta atingida", 20000, { kind: "FUND", min: 50 });
  await db.contribution.create({ data: { giftId: reached.id, guestId: guest.id, amountInCents: 20000, status: "CONFIRMED" } });
  const chosen = await gift("Concluído · Presente reservado", 100, { purchaseUrl: store });
  await db.giftReservation.create({ data: { giftId: chosen.id, guestId: guest.id, status: "CONFIRMED", expiresAt: new Date(Date.now() + 60000) } });
  const bought = await gift("Concluído · Compra informada", 10000, { purchaseUrl: store });
  await db.giftReservation.create({ data: { giftId: bought.id, guestId: guest.id, status: "COMPLETED", paymentMethod: "EXTERNAL_PURCHASE", purchaseConfirmedAt: new Date(), expiresAt: new Date(Date.now() + 60000) } });
  const archived = await gift("Retirado · Presente com um nome muito longo que precisa permanecer legível sem ultrapassar os limites do cartão no celular", 15000, { quantity: 0 });
  await db.giftReservation.create({ data: { giftId: archived.id, guestId: guest.id, status: "CANCELLED", paymentMethod: "PIX", pixStatus: "DECLARED", amountInCents: 12000, cancelledAt: new Date(), pixDeclaredAt: new Date(), expiresAt: new Date(Date.now() - 60000), message: "Recadinho privado preservado. " + "Uma mensagem longa para testar a leitura e a quebra de linha. ".repeat(5) + "A".repeat(100), messagePublic: false } });
  const archivedEmpty = await gift("Retirado · Sem movimentações anteriores", 1000, { quantity: 0 });
  const ended = await gift("Loja · Reserva expirada", 2500, { purchaseUrl: store });
  await db.giftReservation.create({ data: { giftId: ended.id, guestId: guest.id, status: "EXPIRED", expiresAt: new Date(Date.now() - 60000) } });
  return { email, password, ownerId: owner.id, guestId: guest.id, eventId: event.id, ids, archivedId: archived.id, archivedEmptyId: archivedEmpty.id, publicPath: `/lista/${event.slug}-${event.secureToken}`, ownerPath: `/dashboard/eventos/${event.id}` };
}

export async function cleanupHistorySortingFixture(db: PrismaClient, fixture: { ownerId: string; guestId: string }) {
  await db.user.deleteMany({ where: { id: fixture.ownerId } });
  await db.guest.deleteMany({ where: { id: fixture.guestId } });
}
