export type GiftAvailability = {
  availableUnits: number;
  status: "AVAILABLE" | "LAST_UNIT" | "UNAVAILABLE";
};

const ACTIVE_RESERVATION_STATUSES = ["TEMPORARY", "CONFIRMED", "COMPLETED"] as const;

export { ACTIVE_RESERVATION_STATUSES };

export function computeGiftAvailability(quantity: number, activeReservations: number): GiftAvailability {
  const availableUnits = Math.max(quantity - activeReservations, 0);

  if (availableUnits <= 0) return { availableUnits: 0, status: "UNAVAILABLE" };
  if (availableUnits === 1) return { availableUnits, status: "LAST_UNIT" };
  return { availableUnits, status: "AVAILABLE" };
}
