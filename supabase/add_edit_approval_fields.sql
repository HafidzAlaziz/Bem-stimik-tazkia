-- Step 1: Add columns for the Edit Approval Flow
ALTER TABLE public.karya 
ADD COLUMN IF NOT EXISTS pending_edits jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS edit_reject_reason text DEFAULT NULL;
