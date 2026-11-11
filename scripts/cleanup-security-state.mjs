import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: [] });
try {
  const now = new Date();
  const result = await prisma.$transaction([
    prisma.identityChallenge.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.guestSession.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.rateLimit.deleteMany({ where: { expiresAt: { lt: now } } }),
  ]);
  console.log(
    JSON.stringify({
      removedExpiredSecurityRecords: result.reduce(
        (sum, row) => sum + row.count,
        0,
      ),
    }),
  );
} finally {
  await prisma.$disconnect();
}
