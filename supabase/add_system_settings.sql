-- Buat tabel system_settings untuk menyimpan konfigurasi aplikasi
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow select/insert/update/delete untuk authenticated users (admin)
CREATE POLICY "Enable all for authenticated users only" 
ON "public"."system_settings" 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Allow select untuk public
-- Agar API route atau frontend bisa membaca settingan ini tanpa login
CREATE POLICY "Enable select for public" 
ON "public"."system_settings" 
FOR SELECT 
USING (true);
