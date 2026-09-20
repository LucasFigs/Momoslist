/**
 * Confirmação de presença — regras e contas.
 *
 * Convenção: o convidado que responde sempre conta como 1 adulto. O que ele informa são os ACOMPANHANTES
 * (adultos e crianças). Quem não vai tem 0 pessoas, mesmo que algum valor antigo tenha ficado no registro.
 */

/** Teto por tipo de acompanhante: evita digitação absurda e mantém o formulário usável. */
export const MAX_COMPANIONS_PER_KIND = 15;

export type RsvpStatusValue = "ATTENDING" | "NOT_ATTENDING";

export interface RsvpAnswer {
  status: RsvpStatusValue;
  companionAdults: number;
  companionChildren: number;
}

export interface Party {
  adults: number;
  children: number;
  people: number;
}

/** Quantas pessoas essa resposta representa (o convidado + acompanhantes; zero se não vai). */
export function partyOf(answer: RsvpAnswer): Party {
  if (answer.status !== "ATTENDING") return { adults: 0, children: 0, people: 0 };
  const adults = 1 + Math.max(answer.companionAdults, 0);
  const children = Math.max(answer.companionChildren, 0);
  return { adults, children, people: adults + children };
}

export interface RsvpSummary {
  /** Total de respostas recebidas (vão + não vão). */
  responses: number;
  attendingResponses: number;
  notAttendingResponses: number;
  /** Pessoas que vão, contando os acompanhantes. */
  people: number;
  adults: number;
  children: number;
  /** Respostas "vou" com pelo menos um acompanhante / sem nenhum. */
  withCompanions: number;
  alone: number;
}

export function summarizeRsvps(answers: RsvpAnswer[]): RsvpSummary {
  const summary: RsvpSummary = {
    responses: answers.length,
    attendingResponses: 0,
    notAttendingResponses: 0,
    people: 0,
    adults: 0,
    children: 0,
    withCompanions: 0,
    alone: 0,
  };

  for (const answer of answers) {
    if (answer.status !== "ATTENDING") {
      summary.notAttendingResponses += 1;
      continue;
    }
    const party = partyOf(answer);
    summary.attendingResponses += 1;
    summary.people += party.people;
    summary.adults += party.adults;
    summary.children += party.children;
    if (party.people > 1) summary.withCompanions += 1;
    else summary.alone += 1;
  }

  return summary;
}

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

/** "2 adultos e 1 criança" — só os acompanhantes; vazio se for sozinho. */
export function describeCompanions(companionAdults: number, companionChildren: number): string {
  const parts: string[] = [];
  if (companionAdults > 0) parts.push(plural(companionAdults, "adulto", "adultos"));
  if (companionChildren > 0) parts.push(plural(companionChildren, "criança", "crianças"));
  return parts.join(" e ");
}

/** "Você + 2 adultos e 1 criança = 4 pessoas" (para o convidado conferir o que está enviando). */
export function describeParty(answer: RsvpAnswer): string {
  const party = partyOf(answer);
  if (party.people === 0) return "Você não vai comparecer.";
  const companions = describeCompanions(answer.companionAdults, answer.companionChildren);
  return companions
    ? `Você + ${companions} = ${plural(party.people, "pessoa", "pessoas")}`
    : "Só você (1 pessoa)";
}

// ---------------------------------------------------------------------------
// Planilha (CSV) para o casal levar ao buffet, à portaria etc.
// ---------------------------------------------------------------------------

export interface RsvpCsvRow extends RsvpAnswer {
  name: string;
  email: string;
  phone: string;
  /** Texto já formatado (ex.: "20/09/2026 14:30"), no fuso de quem baixa. */
  answeredAt: string;
}

/**
 * Neutraliza "injeção de fórmula": planilhas executam células que começam com = + - @ (o nome de um convidado
 * é texto livre e poderia virar fórmula ao abrir no Excel). O apóstrofo força o texto literal.
 */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[;"\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

/** Separador ";" e BOM UTF-8: é o que o Excel em português espera para abrir com acentos e colunas certas. */
export function buildRsvpCsv(rows: RsvpCsvRow[]): string {
  const header = ["Nome", "E-mail", "Telefone", "Resposta", "Adultos (com o convidado)", "Crianças", "Total de pessoas", "Respondeu em"];
  const lines = rows.map((row) => {
    const party = partyOf(row);
    return [
      row.name,
      row.email,
      row.phone,
      row.status === "ATTENDING" ? "Vai" : "Não vai",
      String(party.adults),
      String(party.children),
      String(party.people),
      row.answeredAt,
    ]
      .map(csvCell)
      .join(";");
  });
  return "﻿" + [header.map(csvCell).join(";"), ...lines].join("\r\n");
}
