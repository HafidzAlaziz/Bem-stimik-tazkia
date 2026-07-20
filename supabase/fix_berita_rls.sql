-- Hapus policy lama (jika ada) agar tidak bentrok
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."berita";
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON "public"."berita";
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON "public"."berita";

-- Buat ulang policy baru yang mengizinkan admin melakukan CRUD
CREATE POLICY "Enable insert for authenticated users only" ON "public"."berita" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."berita" FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."berita" FOR DELETE TO authenticated USING (true);
