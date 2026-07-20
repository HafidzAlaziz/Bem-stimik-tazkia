CREATE POLICY "Enable delete for authenticated users only" ON "public"."berita" FOR DELETE TO authenticated USING (true);
