-- 1. Add form_schema column to agendas for dynamic form builder
ALTER TABLE agendas
ADD COLUMN IF NOT EXISTS form_schema JSONB DEFAULT '[]'::jsonb;

-- 2. Create volunteer_applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agenda_id UUID REFERENCES agendas(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS for volunteer_applications
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Allow public to insert applications (so students can apply without logging in)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'volunteer_applications' AND policyname = 'Allow public inserts'
  ) THEN
    CREATE POLICY "Allow public inserts" ON volunteer_applications FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Allow full access for development (admins can read/delete)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'volunteer_applications' AND policyname = 'Enable full access for development'
  ) THEN
    CREATE POLICY "Enable full access for development" ON volunteer_applications FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
