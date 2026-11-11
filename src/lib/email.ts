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
export async function sendEmail(
  { to, subject, html, text }: SendEmailInput,
  required = false,
): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  const smtpHost = process.env.SMTP_HOST;
  const sender =
    process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER || user;
  if ((!smtpHost && (!user || !pass)) || !sender) {
    if (required)
      logger.info("email", "Verificação indisponível: SMTP não configurado.");
    return false;
  }

  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "Momoslist";

  try {
    // Sem cache entre chamadas: cada função serverless pode rodar num processo novo, e criar o transporte
    // é só configuração local — a conexão de verdade com o Gmail só abre dentro de sendMail.
    const transporter = nodemailer.createTransport(
      smtpHost
        ? {
            host: smtpHost,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            ...(process.env.SMTP_USER && {
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            }),
            connectionTimeout: 10000,
            socketTimeout: 15000,
          }
        : {
            service: "gmail",
            auth: { user, pass },
            connectionTimeout: 10000,
            socketTimeout: 15000,
          },
    );
    await transporter.sendMail({
      from: `"${fromName}" <${sender}>`,
      to,
      subject,
      html,
      text,
    });
    return true;
  } catch (error) {
    logger.error("email", error);
    return false;
  }
}
