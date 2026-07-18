-- 1. Add new columns to agendas table
ALTER TABLE agendas
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS time_range TEXT,
ADD COLUMN IF NOT EXISTS deadline TEXT,
ADD COLUMN IF NOT EXISTS is_urgent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS online_link TEXT;

-- 2. Update the existing mock data to have is_published = true
UPDATE agendas SET is_published = true;

-- 3. Fix RLS policies for agendas table so Admin can insert/update/delete
ALTER TABLE agendas ENABLE ROW LEVEL SECURITY;

-- Allow public read access to agendas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'agendas' AND policyname = 'Enable read access for all users'
  ) THEN
    CREATE POLICY "Enable read access for all users" ON agendas FOR SELECT USING (true);
  END IF;
END $$;

-- Allow public all access (since this is an admin dashboard without full auth setup yet)
-- Alternatively, if you have authenticated admins, use auth.role() = 'authenticated'
-- We'll allow all for now so the user doesn't get blocked during development
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'agendas' AND policyname = 'Enable full access for development'
  ) THEN
    CREATE POLICY "Enable full access for development" ON agendas FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
