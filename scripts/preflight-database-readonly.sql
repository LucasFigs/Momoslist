-- Read-only inventory for an explicitly authorized database connection.
-- Keep the output private. This is NOT a migration or a substitute for a restored snapshot.
BEGIN READ ONLY;
SELECT current_database() AS database_name, current_user AS connection_role,
       current_setting('server_version') AS postgres_version;
SELECT rolname, rolsuper, rolbypassrls FROM pg_roles
WHERE rolname = current_user OR rolname IN ('anon','authenticated','service_role','authenticator');
SELECT member_role.rolname AS member_role, parent_role.rolname AS inherited_role
FROM pg_auth_members m JOIN pg_roles member_role ON member_role.oid=m.member
JOIN pg_roles parent_role ON parent_role.oid=m.roleid
WHERE member_role.rolname = current_user OR member_role.rolname IN ('anon','authenticated','service_role','authenticator');
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
SELECT c.relname AS table_name, pg_get_userbyid(c.relowner) AS table_owner,
       c.relrowsecurity AS rls_enabled,
       has_table_privilege(current_user, c.oid, 'SELECT') AS can_select,
       has_table_privilege(current_user, c.oid, 'INSERT') AS can_insert,
       has_table_privilege(current_user, c.oid, 'UPDATE') AS can_update,
       has_table_privilege(current_user, c.oid, 'DELETE') AS can_delete
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE n.nspname='public' AND c.relkind='r' ORDER BY c.relname;
SELECT tablename, indexname, indexdef FROM pg_indexes WHERE schemaname='public'
ORDER BY tablename, indexname;
SELECT c.relname, con.conname, pg_get_constraintdef(con.oid) AS definition
FROM pg_constraint con JOIN pg_class c ON c.oid=con.conrelid
JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE n.nspname='public' ORDER BY c.relname,con.conname;
SELECT c.relname, t.tgname, t.tgenabled, pg_get_triggerdef(t.oid) AS definition
FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid
JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE n.nspname='public' AND NOT t.tgisinternal ORDER BY c.relname,t.tgname;
SELECT schemaname,tablename,policyname,roles,cmd,qual,with_check
FROM pg_policies WHERE schemaname IN ('public','storage')
ORDER BY schemaname,tablename,policyname;
DO $$
DECLARE item record; total bigint;
BEGIN
  FOR item IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP
    EXECUTE format('SELECT count(*) FROM public.%I',item.tablename) INTO total;
    RAISE NOTICE 'rows %: %',item.tablename,total;
  END LOOP;
  IF to_regclass('public._prisma_migrations') IS NULL THEN
    RAISE NOTICE 'No Prisma migration history. Compare baseline before any resolve command.';
  ELSE
    FOR item IN EXECUTE 'SELECT migration_name,checksum,finished_at,rolled_back_at FROM public._prisma_migrations ORDER BY started_at' LOOP
      RAISE NOTICE 'migration % checksum=% finished=% rolled_back=%',item.migration_name,item.checksum,item.finished_at,item.rolled_back_at;
    END LOOP;
  END IF;
END $$;
ROLLBACK;
