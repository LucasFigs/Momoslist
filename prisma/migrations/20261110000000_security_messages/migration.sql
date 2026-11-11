-- AlterTable
ALTER TABLE "gift_reservations" ADD COLUMN     "amountInCents" INTEGER,
ADD COLUMN     "messageHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "messagePublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receivedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contributions" ADD COLUMN     "messageHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "messagePublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "guest_sessions" (
    "tokenHash" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guest_sessions_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "identity_challenges" (
    "id" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "identity_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limits" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "event_messages" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guest_sessions_guestId_idx" ON "guest_sessions"("guestId");

-- CreateIndex
CREATE INDEX "event_messages_eventId_public_hidden_createdAt_idx" ON "event_messages"("eventId", "public", "hidden", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "event_messages_eventId_guestId_key" ON "event_messages"("eventId", "guestId");

-- AddForeignKey
ALTER TABLE "guest_sessions" ADD CONSTRAINT "guest_sessions_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_messages" ADD CONSTRAINT "event_messages_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_messages" ADD CONSTRAINT "event_messages_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Preserve the best available historical value. Old deployments did not store a price snapshot.
UPDATE "gift_reservations" AS r SET "amountInCents" = g."priceInCents"
FROM "gifts" AS g WHERE g.id = r."giftId" AND r."amountInCents" IS NULL;

-- Rolling deployment compatibility: older app instances also receive a frozen value on insert.
CREATE FUNCTION momos_reservation_amount() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."amountInCents" IS NULL THEN
    SELECT "priceInCents" INTO NEW."amountInCents" FROM gifts WHERE id = NEW."giftId";
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER reservation_amount_snapshot BEFORE INSERT ON gift_reservations
FOR EACH ROW EXECUTE FUNCTION momos_reservation_amount();

ALTER TABLE gift_reservations ADD CONSTRAINT reservation_positive_amount CHECK ("amountInCents" IS NULL OR "amountInCents" > 0);
ALTER TABLE contributions ADD CONSTRAINT contribution_positive_amount CHECK ("amountInCents" > 0);
ALTER TABLE event_messages ADD CONSTRAINT event_message_length CHECK (char_length(btrim(message)) BETWEEN 1 AND 500);

-- New tables are server-only through Prisma. No anonymous Supabase REST access.
ALTER TABLE guest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_messages ENABLE ROW LEVEL SECURITY;
