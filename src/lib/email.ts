import nodemailer from "nodemailer";

import { logger } from "@/lib/logger";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Envia e-mails transacionais pelo SMTP do Gmail (sem custo, sem domínio próprio — só um app password).
 * Ver README ("Configurando os serviços externos") para o passo a passo de configuração.
 *
 * Mesmo princípio do upload de imagens: se as variáveis não estiverem configuradas, ou o envio falhar, a
 * função nunca lança — o convidado não pode ficar sem resposta (reserva, confirmação de presença) só porque
 * um e-mail de cortesia não saiu.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailInput): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    logger.info("email", "Envio pulado: GMAIL_USER/GMAIL_APP_PASSWORD não configurados.", { to, subject });
    return;
  }

  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Momoslist";

  try {
    // Sem cache entre chamadas: cada função serverless pode rodar num processo novo, e criar o transporte
    // é só configuração local — a conexão de verdade com o Gmail só abre dentro de sendMail.
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({ from: `"${fromName}" <${user}>`, to, subject, html, text });
  } catch (error) {
    logger.error("email", error, { to, subject });
  }
}
