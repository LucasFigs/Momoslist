import type { GuestSelection } from "./guest-selections";

/**
 * Deriva o rótulo/selo de uma reserva a partir do método de pagamento e do status.
 *
 * Vive num módulo à parte (sem "use client") porque é usado tanto pelo componente cliente
 * (guest-selections.tsx) quanto pelo Server Component da página (page.tsx) — funções exportadas
 * de um arquivo "use client" não chegam de fato a quem importa do lado do servidor.
 */
export function statusLabel(selection: GuestSelection): string {
  if (selection.paymentMethod === "PIX") {
    if (selection.pixStatus === "CONFIRMED") return "Pix confirmado";
    if (selection.pixStatus === "DECLARED") return "Aguardando confirmação";
    return "Aguardando pagamento";
  }
  if (selection.status === "COMPLETED") return "Compra confirmada";
  if (selection.status === "CONFIRMED") return "Selecionado";
  return "Reserva em andamento";
}

/** Concluído = verde, precisa de ação/espera = âmbar, o resto = neutro. O texto do selo sempre diz o estado. */
export function statusVariant(selection: GuestSelection): "success" | "pending" | "neutral" {
  if (selection.pixStatus === "CONFIRMED" || selection.status === "COMPLETED") return "success";
  if (selection.paymentMethod === "PIX" && selection.pixStatus !== "CONFIRMED") return "pending";
  return "neutral";
}
