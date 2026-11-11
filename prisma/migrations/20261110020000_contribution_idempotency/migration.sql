-- Additive; NULL preserves every legacy contribution.
ALTER TABLE contributions ADD COLUMN "requestKey" TEXT;
CREATE UNIQUE INDEX "contributions_guestId_requestKey_key" ON contributions("guestId", "requestKey");
