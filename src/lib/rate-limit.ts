import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

/** Shared by serverless instances. No email or IP is stored in plaintext. Fail closed on DB errors. */
export async function takeRateLimit(
  scope: string,
  identity: string,
  limit: number,
  seconds: number,
): Promise<boolean> {
  const window = Math.floor(Date.now() / (seconds * 1000));
  const key = createHash("sha256")
    .update(`${scope}:${identity}:${window}`)
    .digest("hex");
  const row = await prisma.rateLimit.upsert({
    where: { key },
    create: { key, expiresAt: new Date((window + 1) * seconds * 1000) },
    update: { count: { increment: 1 } },
  });
  return row.count <= limit;
}
