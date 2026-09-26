import { resolveThemeColor } from "@/lib/theme";
import { describeParty, type RsvpAnswer } from "@/lib/rsvp";

/**
 * E-mails transacionais enviados ao convidado (confirmação de presença, presente escolhido, contribuição
 * na vaquinha). São só um lembrete de cortesia — a fonte da verdade continua sendo a lista pública, e o
 * link de cada e-mail leva de volta a ela.
 *
 * HTML de e-mail não lê `globals.css` (cada cliente de e-mail tem seu próprio sandbox), então as cores da
 * marca são repetidas aqui como hex fixo, e a cor de acento da lista é aplicada por fora (parâmetro).
 */

// Neutros da marca, aproximados a partir de src/app/globals.css (hsl → hex) — só para o e-mail.
const NEUTRAL_BG = "#FAF6EE";
const CARD_BG = "#FFFFFF";
const BORDER = "#E4DDD1";
const FOREGROUND = "#241F1B";
const MUTED_FOREGROUND = "#5C554E";
const ACCENT_FOREGROUND = "#FBF8F2";

export interface EmailEvent {
  title: string;
  slug: string;
  secureToken: string;
  themeColor: string | null;
  theme: string | null;
  eventDate: Date | null;
  locationName: string | null;
}

/** Mesma regra de src/app/lista/[eventSlugToken]/page.tsx e previa/[id]/page.tsx: fora de uma requisição HTTP
 *  não há host para descobrir, então a URL pública vem sempre da variável de ambiente. */
export function buildPublicListUrl(event: Pick<EmailEvent, "slug" | "secureToken">): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}/lista/${event.slug}-${event.secureToken}`;
}

interface LayoutOptions {
  accentColor: string;
  preheader: string;
  title: string;
  /** Parágrafos já em HTML (cada um vira uma linha). */
  bodyHtml: string[];
  ctaLabel: string;
  ctaUrl: string;
}

/** Layout base (tabelas + estilo inline): é o formato que sobrevive à faxina de CSS de qualquer cliente de e-mail. */
function emailLayout({ accentColor, preheader, title, bodyHtml, ctaLabel, ctaUrl }: LayoutOptions): string {
  const paragraphs = bodyHtml
    .map((p) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${FOREGROUND};">${p}</p>`)
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${NEUTRAL_BG};font-family:Arial,Helvetica,sans-serif;">
    <!-- Pré-visualização: texto que aparece ao lado do assunto na caixa de entrada, escondido no corpo do e-mail. -->
    <span style="display:none;font-size:1px;color:${NEUTRAL_BG};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NEUTRAL_BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:${CARD_BG};border-radius:16px;border:1px solid ${BORDER};overflow:hidden;">
            <tr>
              <td style="background:${accentColor};padding:20px 28px;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${ACCENT_FOREGROUND};">Momoslist</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:21px;color:${FOREGROUND};">${title}</h1>
                ${paragraphs}
              </td>
            </tr>
            <tr>
              <td style="padding:4px 28px 28px;">
                <a href="${ctaUrl}" style="display:inline-block;background:${accentColor};color:${ACCENT_FOREGROUND};text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:bold;">${ctaLabel}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid ${BORDER};">
                <p style="margin:0;font-size:12px;line-height:1.5;color:${MUTED_FOREGROUND};">
                  Você recebeu este e-mail porque interagiu com esta lista de presentes pelo Momoslist. Se não foi você, ignore — nenhuma ação é necessária.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Escapa texto dinâmico antes de entrar num template de e-mail. É necessário mesmo indo só para o convidado:
 * o título do evento e o nome do presente são digitados pelo casal e aparecem no e-mail de TODO convidado —
 * sem isso, um título como `<img src=x onerror=...>` viraria HTML de verdade na caixa de entrada de cada um.
 * Serve também para atributos (`href="..."`), já que escapa aspas.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Remove quebras de linha de texto livre antes de entrar no ASSUNTO do e-mail. Sem isso, um título ou nome
 * de presente com um "\r\n" no meio poderia injetar cabeçalhos extras (ex.: um Bcc escondido) no e-mail
 * enviado a outra pessoa — mesmo risco de "response splitting" de e-mail, só que via campo texto livre.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function eventDateAndPlaceLine(event: EmailEvent): string | null {
  const dateLabel = event.eventDate
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(event.eventDate)
    : null;
  const parts = [dateLabel, event.locationName].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}

// ---------------------------------------------------------------------------
// Confirmação de presença
// ---------------------------------------------------------------------------

export function rsvpConfirmationEmail(params: { guestName: string; event: EmailEvent; answer: RsvpAnswer }) {
  const { guestName, event, answer } = params;
  const attending = answer.status === "ATTENDING";
  const accentColor = resolveThemeColor(event.themeColor, event.theme);
  const url = buildPublicListUrl(event);
  const placeLine = eventDateAndPlaceLine(event);
  const safeEventTitle = escapeHtml(event.title);
  const subjectEventTitle = singleLine(event.title);

  const title = attending ? "Presença confirmada! 🎉" : "Resposta registrada";
  const bodyHtml = [
    `Oi, ${escapeHtml(guestName)}! Sua resposta para <strong>${safeEventTitle}</strong> foi registrada.`,
    attending
      ? `<strong>${escapeHtml(describeParty(answer))}.</strong>`
      : "Que pena que não vai dar dessa vez — obrigado por avisar.",
    ...(placeLine ? [escapeHtml(placeLine)] : []),
    "Guarde este e-mail: é por ele que você acha o link da lista de novo, caso precise alterar sua resposta.",
  ];

  return {
    subject: attending ? `Presença confirmada — ${subjectEventTitle}` : `Resposta registrada — ${subjectEventTitle}`,
    html: emailLayout({ accentColor, preheader: bodyHtml[1] ?? title, title, bodyHtml, ctaLabel: "Ver a lista", ctaUrl: url }),
    text: [title, "", ...bodyHtml.map(stripHtml), "", `Ver a lista: ${url}`].join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Presente escolhido (produto ou item Pix)
// ---------------------------------------------------------------------------

export function giftReservedEmail(params: {
  guestName: string;
  event: EmailEvent;
  giftName: string;
  priceLabel: string;
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX";
  purchaseUrl: string | null;
}) {
  const { guestName, event, giftName, priceLabel, paymentMethod, purchaseUrl } = params;
  const accentColor = resolveThemeColor(event.themeColor, event.theme);
  const url = buildPublicListUrl(event);
  const safeGiftName = escapeHtml(giftName);
  const safeEventTitle = escapeHtml(event.title);

  const nextStep =
    paymentMethod === "PIX"
      ? "Você escolheu pagar por Pix. Abra a lista para ver o QR Code e o Copia e Cola, e não esqueça de tocar em <strong>“Já fiz o Pix”</strong> depois de pagar."
      : purchaseUrl
        ? `Você escolheu comprar em uma loja. <a href="${escapeHtml(purchaseUrl)}" style="color:${accentColor};">Abra o site do vendedor</a> para concluir e, depois, toque em <strong>“Já comprei”</strong> na lista.`
        : "Você escolheu comprar em uma loja. Quando concluir a compra, volte à lista e toque em <strong>“Já comprei”</strong>.";

  const bodyHtml = [
    `Oi, ${escapeHtml(guestName)}! Você separou <strong>${safeGiftName}</strong> (${priceLabel}) na lista de <strong>${safeEventTitle}</strong>.`,
    nextStep,
    "Guarde este e-mail: é por ele que você acha o link da lista de novo, para acompanhar ou desistir do presente quando quiser.",
  ];

  return {
    subject: `Você separou “${singleLine(giftName)}” — ${singleLine(event.title)}`,
    html: emailLayout({ accentColor, preheader: bodyHtml[0], title: "Presente reservado para você", bodyHtml, ctaLabel: "Ver minha lista", ctaUrl: url }),
    text: ["Presente reservado para você", "", ...bodyHtml.map(stripHtml), "", `Ver a lista: ${url}`].join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Contribuição em vaquinha
// ---------------------------------------------------------------------------

export function contributionDeclaredEmail(params: {
  guestName: string;
  event: EmailEvent;
  fundName: string;
  amountLabel: string;
}) {
  const { guestName, event, fundName, amountLabel } = params;
  const accentColor = resolveThemeColor(event.themeColor, event.theme);
  const url = buildPublicListUrl(event);

  const bodyHtml = [
    `Oi, ${escapeHtml(guestName)}! Sua contribuição de <strong>${amountLabel}</strong> para “${escapeHtml(fundName)}”, na lista de <strong>${escapeHtml(event.title)}</strong>, foi registrada.`,
    "Assim que o casal confirmar o recebimento do Pix, ela passa a contar como confirmada na vaquinha.",
    "Guarde este e-mail: é por ele que você acha o link da lista de novo.",
  ];

  return {
    subject: `Contribuição registrada — ${singleLine(event.title)}`,
    html: emailLayout({ accentColor, preheader: bodyHtml[0], title: "Contribuição registrada", bodyHtml, ctaLabel: "Ver a lista", ctaUrl: url }),
    text: ["Contribuição registrada", "", ...bodyHtml.map(stripHtml), "", `Ver a lista: ${url}`].join("\n"),
  };
}

/**
 * Alternativa em texto puro (clientes sem HTML): tira as tags que o próprio template usa (<strong>/<a>) e
 * desfaz o escape de escapeHtml — sem isso, "Chá & Cia" apareceria como "Chá &amp; Cia" no texto plano.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<a [^>]*>/g, "")
    .replace(/<\/a>/g, "")
    .replace(/<\/?strong>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
