-- Migration to add gallery to karya
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS gallery jsonb DEFAULT '[]'::jsonb;
