import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata um valor em centavos para o formato monetário brasileiro (R$). */
export function formatCentsToBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Constante de sistema: tempo de expiração da reserva temporária. */
export const RESERVATION_TIMEOUT_MINUTES = Number(
  process.env.RESERVATION_TIMEOUT_MINUTES ?? 15
);
