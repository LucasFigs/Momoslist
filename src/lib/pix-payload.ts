/**
 * Gera o payload "Pix Copia e Cola" (BR Code, padrão EMV do Banco Central).
 * Implementação local, sem integração bancária e sem dependências externas —
 * o QR Code é apenas uma representação visual desse mesmo texto.
 */

function emvField(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

/** CRC16/CCITT-FALSE, exigido pelo padrão BR Code. */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Remove acentos e caracteres não suportados pelo padrão. */
function sanitize(text: string, maxLength: number): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .slice(0, maxLength);
}

interface PixPayloadParams {
  pixKey: string;
  merchantName: string;
  amountInCents: number;
  city?: string;
  txid?: string;
}

export function buildPixPayload({
  pixKey,
  merchantName,
  amountInCents,
  city = "BRASIL",
  txid = "***",
}: PixPayloadParams): string {
  const merchantAccountInfo =
    emvField("00", "br.gov.bcb.pix") + emvField("01", pixKey.trim());

  const amount = (amountInCents / 100).toFixed(2);

  const payloadWithoutCrc =
    emvField("00", "01") + // payload format indicator
    emvField("26", merchantAccountInfo) +
    emvField("52", "0000") + // merchant category code
    emvField("53", "986") + // moeda: BRL
    emvField("54", amount) +
    emvField("58", "BR") +
    emvField("59", sanitize(merchantName, 25) || "RECEBEDOR") +
    emvField("60", sanitize(city, 15) || "BRASIL") +
    emvField("62", emvField("05", sanitize(txid, 25) || "***")) +
    "6304";

  return payloadWithoutCrc + crc16(payloadWithoutCrc);
}
