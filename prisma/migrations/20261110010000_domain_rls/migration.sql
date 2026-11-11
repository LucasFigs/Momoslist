-- Domain and authentication records must not be available through Supabase's anonymous REST API.
-- Prisma uses a trusted server-side database role. No data is deleted or rewritten.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Existing permissive API policies must not override server-only access to personal records.
REVOKE ALL ON users, accounts, sessions, verification_tokens, guests, events, gifts,
  gift_reservations, contributions, rsvps, guest_sessions, identity_challenges,
  rate_limits, event_messages FROM PUBLIC;
DO $$
DECLARE api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role) THEN
      EXECUTE format('REVOKE ALL ON users, accounts, sessions, verification_tokens, guests, events, gifts, gift_reservations, contributions, rsvps, guest_sessions, identity_challenges, rate_limits, event_messages FROM %I', api_role);
    END IF;
  END LOOP;
END;
$$;
