import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const state = vi.hoisted(() => ({ ownerId: "owner" as string | null, findMany: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: async () => state.ownerId ? { user: { id: state.ownerId } } : null }));
vi.mock("@/lib/prisma", () => ({ prisma: { gift: { findMany: state.findMany } } }));
import { GiftHistory } from "@/app/dashboard/eventos/[id]/gift-history";
import { GiftHistoryView } from "@/app/dashboard/eventos/[id]/gift-history-view";

const at = new Date("2026-11-24T15:00:00Z");
const reservation = {
  id: "reservation", guest: { name: "Convidada" }, status: "CANCELLED", paymentMethod: "PIX", pixStatus: "DECLARED",
  amountInCents: 12000, reservedAt: at, expiresAt: at, cancelledAt: at, purchaseConfirmedAt: null, receivedAt: null,
  pixDeclaredAt: at, pixConfirmedAt: null, message: "Recado privado preservado", messagePublic: false, messageHidden: true,
};
const gift = { id: "gift", name: "Presente retirado", kind: "PRODUCT", quantity: 0, priceInCents: 99999, reservations: [reservation], contributions: [] };

beforeEach(() => { state.ownerId = "owner"; state.findMany.mockReset(); state.findMany.mockResolvedValue([structuredClone(gift)]); });
describe("owner-only read-only history", () => {
  it("requires authentication before querying any records", async () => {
    state.ownerId = null;
    expect(await GiftHistory({ eventId: "event" })).toBeNull();
    expect(state.findMany).not.toHaveBeenCalled();
  });
  it("restricts the database query to the authenticated owner", async () => {
    state.ownerId = "other-owner"; state.findMany.mockResolvedValue([]);
    const result = await GiftHistory({ eventId: "foreign-event" });
    expect(state.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ eventId: "foreign-event", event: { ownerId: "other-owner" } }) }));
    expect(JSON.stringify(result)).not.toContain("Recado privado");
  });
  it("preserves status, snapshots, financial state, dates, notes and privacy without mutating rows", async () => {
    const rows = [structuredClone(gift)]; const before = structuredClone(rows); state.findMany.mockResolvedValue(rows);
    const result = await GiftHistory({ eventId: "event" });
    expect(result?.type).toBe(GiftHistoryView);
    expect(result?.props.gifts[0]).toMatchObject({ withdrawn: true, records: [{ status: "CANCELLED", statusLabel: "Cancelada", amountInCents: 12000, referenceAmount: false, paymentLabel: "Pix declarado", message: reservation.message, messagePublic: false, messageHidden: true }] });
    expect(result?.props.gifts[0].records[0].dates).toContainEqual({ label: "Cancelamento", at: at.toISOString() });
    expect(rows).toEqual(before);
  });
  it("includes expired reservations and cancelled contributions with their dates", async () => {
    state.findMany.mockResolvedValue([{ ...gift, reservations: [{ ...reservation, status: "EXPIRED", paymentMethod: null }], contributions: [{ id: "contribution", guest: { name: "Convidado" }, status: "CANCELLED", amountInCents: 500, declaredAt: at, confirmedAt: null, cancelledAt: at, message: "Contribuição preservada", messagePublic: false, messageHidden: false }] }]);
    const result = await GiftHistory({ eventId: "event" });
    expect(result?.props.gifts[0].records.map((row: { statusLabel: string }) => row.statusLabel)).toEqual(["Expirada", "Cancelada"]);
    expect(result?.props.gifts[0].records[1]).toMatchObject({ amountInCents: 500, kind: "Contribuição" });
  });
  it("distinguishes a missing historical amount from an original price snapshot", async () => {
    state.findMany.mockResolvedValue([{ ...gift, reservations: [{ ...reservation, amountInCents: null }] }]);
    const result = await GiftHistory({ eventId: "event" });
    expect(result?.props.gifts[0].records[0]).toMatchObject({ referenceAmount: true, amountInCents: gift.priceInCents });
  });
  it("renders contextual empty states for no history and withdrawn gifts without movements", async () => {
    expect(renderToStaticMarkup(createElement(GiftHistoryView, { gifts: [] }))).toContain("Seu histórico ainda está vazio");
    state.findMany.mockResolvedValue([{ ...gift, reservations: [] }]);
    const result = await GiftHistory({ eventId: "event" });
    expect(renderToStaticMarkup(result!)).toContain("sem reservas ou contribuições anteriores");
  });
});
