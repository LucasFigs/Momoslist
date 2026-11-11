-- READ ONLY. Review in a staging project first. This script changes no policies.
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname IN ('storage', 'public')
ORDER BY schemaname, tablename, policyname;

SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets WHERE id = 'gift-images';

-- Expected: public image reads only; uploads/updates/deletes only through authenticated
-- owner-checked Server Actions using the server-only service role. Never permit anonymous
-- INSERT/UPDATE/DELETE of storage.objects, or expose the service role to the browser.
-- Bucket limits: 5 MiB and image/webp for new sanitized uploads; retain jpeg/png read support
-- for existing files. Existing files are not rewritten by this release.
