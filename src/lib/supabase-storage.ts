import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export const GIFT_IMAGES_BUCKET = "gift-images";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type UploadResult = { success: true; url: string } | { success: false; error: string };

/**
 * Cliente admin — usa a service role key, então SÓ pode ser usado em código
 * server-side (Server Actions / Route Handlers), nunca em componentes client.
 * Retorna null em vez de lançar, para que a action chamadora transforme isso
 * numa mensagem clara em vez de estourar um erro genérico.
 */
function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    logger.error("supabaseStorage", new Error("Storage nao configurado"), {
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
    });
    return null;
  }

  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

/**
 * Valida e envia uma imagem para o bucket público `gift-images`.
 * Nunca lança: todo caminho de falha vira um UploadResult com mensagem
 * legível para o usuário e um log estruturado no servidor.
 */
export async function uploadImage(file: File, folder: string): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { success: false, error: "Formato inválido. Use JPG, PNG ou WebP." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { success: false, error: "A imagem deve ter no máximo 5MB." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      success: false,
      error:
        "O envio de imagens ainda não está configurado. Confira SUPABASE_SERVICE_ROLE_KEY no .env.",
    };
  }

  const extension = file.type === "image/jpg" ? "jpg" : file.type.split("/")[1];
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

  try {
    const { error } = await supabase.storage.from(GIFT_IMAGES_BUCKET).upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      logger.error("supabaseStorage.upload", error, { fileName, bucket: GIFT_IMAGES_BUCKET });

      const message = error.message?.toLowerCase() ?? "";
      if (message.includes("bucket") && message.includes("not found")) {
        return {
          success: false,
          error: `O bucket "${GIFT_IMAGES_BUCKET}" não existe no Supabase Storage. Crie-o como público e tente de novo.`,
        };
      }

      return { success: false, error: "Não foi possível enviar a imagem. Tente novamente." };
    }

    const { data } = supabase.storage.from(GIFT_IMAGES_BUCKET).getPublicUrl(fileName);

    if (!data?.publicUrl) {
      logger.error("supabaseStorage.publicUrl", new Error("URL publica vazia"), { fileName });
      return { success: false, error: "Não foi possível gerar o endereço da imagem." };
    }

    return { success: true, url: data.publicUrl };
  } catch (error) {
    logger.error("supabaseStorage.unexpected", error, { fileName });
    return { success: false, error: "Não foi possível enviar a imagem. Tente novamente." };
  }
}
