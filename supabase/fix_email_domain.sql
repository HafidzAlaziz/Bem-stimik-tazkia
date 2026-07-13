-- SQL Script untuk memperbaiki batasan domain email saat registrasi
-- Mengizinkan email dengan domain @student.stmik.tazkia.ac.id

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  assigned_role TEXT := 'user';
BEGIN
  -- 1. Domain Restriction Check
  -- Mengizinkan @tazkia.ac.id, @stmik.tazkia.ac.id, dan @student.stmik.tazkia.ac.id
  IF new.email NOT LIKE '%@tazkia.ac.id' 
     AND new.email NOT LIKE '%@stmik.tazkia.ac.id' 
     AND new.email NOT LIKE '%@student.stmik.tazkia.ac.id' THEN
    RAISE EXCEPTION 'Akses ditolak: Hanya email kampus yang diizinkan.';
  END IF;

  -- 2. Auto-assign Admin Role
  IF new.email = 'bem@stmik.tazkia.ac.id' THEN
    assigned_role := 'admin';
  END IF;

  -- 3. Create Profile
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', assigned_role);
  
  RETURN new;
END;
$$;
