-- Add is_published column to berita table
ALTER TABLE berita ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;

-- Set all existing berita as published by default
UPDATE berita SET is_published = true WHERE is_published IS NULL;
