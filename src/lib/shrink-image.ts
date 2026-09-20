/**
 * Reduz a foto no navegador antes de enviar.
 *
 * Por quê: a Vercel recusa requisições acima de ~4,5 MB, e fotos de celular passam disso com facilidade.
 * Redimensionar para o lado maior ≤ 1600px deixa a imagem em algumas centenas de KB, sem perda perceptível
 * (as imagens da lista aparecem em até ~1200px). Se algo falhar, devolve o arquivo original e o servidor valida.
 */
const MAX_SIDE = 1600;
const QUALITY = 0.85;
/** Abaixo disso e já pequena, não há por que recomprimir. */
const SKIP_BELOW_BYTES = 800 * 1024;

function toBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
}

export async function shrinkImage(file: File): Promise<File> {
  try {
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) return file;

    // `from-image` aplica a rotação EXIF: sem isso, fotos de celular saem deitadas.
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size <= SKIP_BELOW_BYTES) {
      bitmap.close();
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    // JPEG continua JPEG; PNG/WebP viram WebP (mantém transparência). Se o navegador não gera WebP, mantém o original.
    const type = file.type === "image/png" || file.type === "image/webp" ? "image/webp" : "image/jpeg";
    const blob = await toBlob(canvas, type);
    if (!blob || blob.type !== type || blob.size >= file.size) return file;

    const ext = type === "image/webp" ? "webp" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "") || "imagem";
    return new File([blob], `${baseName}.${ext}`, { type });
  } catch {
    return file;
  }
}
