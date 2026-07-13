-- SQL statements to update `karya` table for user dashboard and admin approval flow.

-- 1. Add `user_id` column referencing `auth.users(id)`
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Add `status` column with default 'pending'
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL;

-- 3. Add `reject_reason` column
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS reject_reason TEXT;

-- 4. Add `features` JSONB column for the "Fitur Utama"
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS features JSONB[] DEFAULT '{}';

-- 5. Enable Row Level Security (RLS) on `karya` table
ALTER TABLE public.karya ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Drop existing policies if any, to avoid conflict (optional, but good practice if redefining)
DROP POLICY IF EXISTS "Public can view approved karya" ON public.karya;
DROP POLICY IF EXISTS "Users can insert their own karya" ON public.karya;
DROP POLICY IF EXISTS "Users can view their own karya" ON public.karya;
DROP POLICY IF EXISTS "Admins can manage all karya" ON public.karya;

-- Policy 1: Anyone can view approved karya
CREATE POLICY "Public can view approved karya" 
ON public.karya 
FOR SELECT 
USING (status = 'approved');

-- Policy 2: Logged in users can view their own karya (even pending/rejected)
CREATE POLICY "Users can view their own karya" 
ON public.karya 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 3: Logged in users can insert their own karya
CREATE POLICY "Users can insert their own karya" 
ON public.karya 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Admins can do anything (select, update, delete)
CREATE POLICY "Admins can manage all karya" 
ON public.karya 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
