import type { Prisma } from "@prisma/client";
/** Only reservations that have never exposed payment instructions may expire automatically. */
export function expiredReservationWhere(
  now = new Date(),
): Prisma.GiftReservationWhereInput {
  return {
    status: "TEMPORARY",
    expiresAt: { lt: now },
    pixStatus: { notIn: ["DECLARED", "CONFIRMED"] },
  };
}
export function isValidPaymentMethod(
  value: unknown,
): value is "PIX" | "EXTERNAL_PURCHASE" {
  return value === "PIX" || value === "EXTERNAL_PURCHASE";
}
