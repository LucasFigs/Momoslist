import { test, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

test.skipIf(!process.env.TEST_DATABASE_URL || !process.env.PSQL_BIN)(
  "baseline upgrade preserves legacy records, backfills values and denies anonymous reads",
  () => {
    const url = new URL(process.env.TEST_DATABASE_URL!);
    if (
      url.hostname !== "127.0.0.1" ||
      url.port !== "55439" ||
      url.pathname !== "/postgres"
    )
      throw new Error("Migration test requires isolated local database");
    const suffix = randomUUID().replace(/-/g, "");
    const schema = `upgrade_${suffix}`;
    const role = `reader_${suffix}`;
    const baseline = readFileSync(
      "prisma/migrations/00000000000000_baseline/migration.sql",
      "utf8",
    );
    const expansion = readFileSync(
      "prisma/migrations/20261110000000_security_messages/migration.sql",
      "utf8",
    );
    const policies = readFileSync(
      "prisma/migrations/20261110010000_domain_rls/migration.sql",
      "utf8",
    );
    const script = `BEGIN;
CREATE SCHEMA "${schema}";
SET LOCAL search_path TO "${schema}";
${baseline}
INSERT INTO users (id,name,email,"updatedAt") VALUES ('owner','Casal','owner@example.invalid',now());
INSERT INTO guests (id,name,email,phone,"updatedAt") VALUES ('guest','Ana','ana@example.invalid','85999999999',now());
INSERT INTO events (id,"ownerId",title,type,slug,"secureToken","updatedAt") VALUES ('event','owner','Chá','CHA_CASA_NOVA','evento','123456789012345678901234',now());
INSERT INTO gifts (id,"eventId",name,"priceInCents","updatedAt") VALUES ('gift','event','Panela',12000,now());
INSERT INTO gift_reservations (id,"giftId","guestId","expiresAt",message,"updatedAt") VALUES ('reservation','gift','guest',now()+interval '15 minutes','Recado antigo',now());
INSERT INTO gift_reservations (id,"giftId","guestId",status,"paymentMethod","pixStatus","pixDeclaredAt","cancelledAt","expiresAt",message,"updatedAt") VALUES ('cancelled-declared','gift','guest','CANCELLED','PIX','DECLARED',now()-interval '2 hours',now()-interval '1 hour',now()-interval '1 hour','Recado cancelado legado',now());
CREATE TEMP TABLE legacy_financial_snapshot AS SELECT status,"paymentMethod","pixStatus","pixDeclaredAt","pixConfirmedAt","cancelledAt","purchaseConfirmedAt" FROM gift_reservations WHERE id='cancelled-declared';
INSERT INTO contributions (id,"giftId","guestId","amountInCents",message,"updatedAt") VALUES ('contribution','gift','guest',2000,'Outra mensagem antiga',now());
INSERT INTO rsvps (id,"eventId","guestId",status,"updatedAt") VALUES ('rsvp','event','guest','ATTENDING',now());
${expansion}
${policies}
${readFileSync("prisma/migrations/20261110020000_contribution_idempotency/migration.sql", "utf8")}
DO $$ BEGIN
 IF (SELECT count(*) FROM users) <> 1 OR (SELECT count(*) FROM guests) <> 1 OR (SELECT count(*) FROM events) <> 1 OR (SELECT count(*) FROM rsvps) <> 1 THEN RAISE EXCEPTION 'Legacy data lost'; END IF;
 IF NOT EXISTS (SELECT 1 FROM gift_reservations WHERE id='reservation' AND "amountInCents"=12000 AND message='Recado antigo' AND "messagePublic"=false) THEN RAISE EXCEPTION 'Reservation migration failed'; END IF;
 IF NOT EXISTS (SELECT 1 FROM contributions WHERE id='contribution' AND message='Outra mensagem antiga' AND "messagePublic"=false) THEN RAISE EXCEPTION 'Contribution migration failed'; END IF;
 IF NOT EXISTS (SELECT 1 FROM gift_reservations WHERE id='cancelled-declared' AND status='CANCELLED' AND "pixStatus"='DECLARED' AND "paymentMethod"='PIX' AND "pixDeclaredAt" IS NOT NULL AND "cancelledAt" IS NOT NULL AND "pixConfirmedAt" IS NULL AND "amountInCents"=12000 AND "messagePublic"=false) THEN RAISE EXCEPTION 'Cancelled declared Pix history was modified'; END IF;
 IF EXISTS(SELECT status,"paymentMethod","pixStatus","pixDeclaredAt","pixConfirmedAt","cancelledAt","purchaseConfirmedAt" FROM gift_reservations WHERE id='cancelled-declared' EXCEPT SELECT * FROM legacy_financial_snapshot) THEN RAISE EXCEPTION 'Legacy financial states or timestamps changed'; END IF;
END $$;
INSERT INTO gift_reservations (id,"giftId","guestId",status,"expiresAt","updatedAt") VALUES ('legacy-insert','gift','guest','CANCELLED',now(),now());
UPDATE gifts SET "priceInCents"=99000 WHERE id='gift';
DO $$ BEGIN IF (SELECT "amountInCents" FROM gift_reservations WHERE id='legacy-insert')<>12000 THEN RAISE EXCEPTION 'Snapshot was not preserved'; END IF; END $$;
CREATE ROLE "${role}";
GRANT USAGE ON SCHEMA "${schema}" TO "${role}";
GRANT SELECT ON ALL TABLES IN SCHEMA "${schema}" TO "${role}";
SET LOCAL ROLE "${role}";
DO $$ BEGIN IF EXISTS(SELECT 1 FROM guests) OR EXISTS(SELECT 1 FROM users) OR EXISTS(SELECT 1 FROM gift_reservations) THEN RAISE EXCEPTION 'RLS leaked personal data'; END IF; END $$;
RESET ROLE;
ROLLBACK;
`;
    const output = execFileSync(
      process.env.PSQL_BIN!,
      [
        "--dbname",
        // Prisma's schema URL parameter is not a libpq parameter. This test
        // creates its own schema and must connect using a plain PostgreSQL URL.
        (() => {
          const connection = new URL(process.env.TEST_DATABASE_URL!);
          connection.searchParams.delete("schema");
          return connection.toString();
        })(),
        "--no-psqlrc",
        "--set",
        "ON_ERROR_STOP=1",
      ],
      { input: script, encoding: "utf8", windowsHide: true, timeout: 25_000 },
    );
    expect(output).toContain("ROLLBACK");
  },
  30_000,
);
