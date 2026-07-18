-- Migrate team column from TEXT[] to JSONB (avatar support)
-- Step 1: Add new JSONB column
ALTER TABLE public.karya ADD COLUMN IF NOT EXISTS team_jsonb jsonb DEFAULT '[]'::jsonb;

-- Step 2: Convert existing TEXT[] data to JSONB objects
UPDATE public.karya
SET team_jsonb = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'name',
      CASE
        WHEN elem ~ '\(.*\)$'
        THEN trim(substring(elem FROM 1 FOR (length(elem) - length(substring(elem FROM '\([^)]*\)$')))))
        ELSE trim(elem)
      END,
      'role',
      CASE
        WHEN elem ~ '\(.*\)$'
        THEN trim(both ')' FROM substring(elem FROM '\(([^)]*)\)$'))
        ELSE ''
      END,
      'avatar', ''::text
    )
  )
  FROM unnest(team) AS elem
)
WHERE team IS NOT NULL AND array_length(team, 1) > 0;

-- Step 3: Drop old column and rename new column
ALTER TABLE public.karya DROP COLUMN team;
ALTER TABLE public.karya RENAME COLUMN team_jsonb TO team;
