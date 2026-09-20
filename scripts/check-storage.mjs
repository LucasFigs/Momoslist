/**
 * Diagnóstico do Supabase Storage.
 * Rode com:  node scripts/check-storage.mjs
 *
 * Testa, em ordem: variáveis de ambiente, existência do bucket, se ele é
 * público, upload real de um arquivo e leitura da URL pública.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const BUCKET = "gift-images";

// Carrega o .env sem dependência externa
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
} catch {
  console.log("Aviso: não consegui ler o .env — usando variáveis do ambiente.\n");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("1) Variáveis de ambiente");
console.log("   NEXT_PUBLIC_SUPABASE_URL:", url ? "definida" : "FALTANDO");
console.log("   SUPABASE_SERVICE_ROLE_KEY:", serviceKey ? "definida" : "FALTANDO");

if (!url || !serviceKey) {
  console.log("\nPare aqui: preencha as duas no .env antes de continuar.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

console.log("\n2) Bucket");
const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
if (bucketsError) {
  console.log("   ERRO ao listar buckets:", bucketsError.message);
  console.log("   Provável causa: a service_role key está incorreta.");
  process.exit(1);
}

const bucket = buckets.find((b) => b.name === BUCKET);
if (!bucket) {
  console.log(`   ERRO: o bucket "${BUCKET}" não existe.`);
  console.log(`   Nomes encontrados: ${buckets.map((b) => b.name).join(", ") || "(nenhum)"}`);
  console.log("   Solução: crie o bucket no painel Storage com esse nome exato.");
  process.exit(1);
}
console.log(`   Bucket "${BUCKET}" existe.`);
console.log("   Público:", bucket.public ? "sim" : "NÃO — precisa ser público");

console.log("\n3) Upload de teste");
// 1x1 PNG transparente
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const bytes = Buffer.from(pngBase64, "base64");
const testPath = `diagnostico/${Date.now()}.png`;

const { error: uploadError } = await supabase.storage
  .from(BUCKET)
  .upload(testPath, bytes, { contentType: "image/png" });

if (uploadError) {
  console.log("   ERRO no upload:", uploadError.message);
  process.exit(1);
}
console.log("   Upload OK:", testPath);

const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(testPath);
console.log("\n4) URL pública");
console.log("   ", publicData.publicUrl);

const response = await fetch(publicData.publicUrl);
console.log("   Status HTTP:", response.status, response.ok ? "(acessível)" : "(NÃO acessível)");
if (!response.ok) {
  console.log("   Provável causa: o bucket não está marcado como público.");
}

await supabase.storage.from(BUCKET).remove([testPath]);
console.log("\nArquivo de teste removido. Diagnóstico concluído.");
