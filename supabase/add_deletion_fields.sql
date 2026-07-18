-- Menambahkan kolom untuk fitur penghapusan karya
ALTER TABLE public.karya
ADD COLUMN IF NOT EXISTS deletion_reason TEXT,
ADD COLUMN IF NOT EXISTS deletion_reject_reason TEXT;
