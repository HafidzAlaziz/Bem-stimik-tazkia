-- Add speakers jsonb column to agendas table
ALTER TABLE agendas DROP COLUMN IF EXISTS speaker;
ALTER TABLE agendas DROP COLUMN IF EXISTS speaker_role;
ALTER TABLE agendas DROP COLUMN IF EXISTS speaker_photo;
ALTER TABLE agendas ADD COLUMN IF NOT EXISTS speakers JSONB DEFAULT '[]'::jsonb;
