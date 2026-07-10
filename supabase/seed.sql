-- ==========================================
-- BEM STMIK TAZKIA - SUPABASE SCHEMA & SEED
-- ==========================================

-- 1. Create `berita` table
CREATE TABLE IF NOT EXISTS berita (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'Humas BEM STMIK Tazkia',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create `karya` table
CREATE TABLE IF NOT EXISTS karya (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  team TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create `agendas` table
CREATE TABLE IF NOT EXISTS agendas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'event' or 'volunteer'
  date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  image_url TEXT,
  registration_link TEXT,
  status TEXT DEFAULT 'upcoming',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create `profiles` table for RBAC
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'user' NOT NULL,
  full_name TEXT
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function and trigger to auto-create profile on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  assigned_role TEXT := 'user';
BEGIN
  -- 1. Domain Restriction Check
  IF new.email NOT LIKE '%@tazkia.ac.id' AND new.email NOT LIKE '%@stmik.tazkia.ac.id' THEN
    RAISE EXCEPTION 'Akses ditolak: Hanya email kampus (@tazkia.ac.id / @stmik.tazkia.ac.id) yang diizinkan.';
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

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- INSERT MOCK DATA
-- ==========================================

-- Insert Berita
INSERT INTO berita (title, slug, category, excerpt, content, image_url, views, likes, tags) VALUES
('The Future of AI in Campus Management', 'the-future-of-ai', 'Pendidikan', 'STMIK Tazkia memelopori integrasi AI untuk manajemen kampus modern.', '<p>STMIK Tazkia kembali menorehkan sejarah baru dengan menjadi pelopor dalam pengintegrasian kecerdasan buatan...</p>', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1470&q=80', 1240, 350, ARRAY['Teknologi', 'AI', 'Kampus', 'Inovasi']),
('BEM STMIK Tazkia Luncurkan Portal Inovasi', 'portal-inovasi', 'Kampus', 'Portal inovasi ini bertujuan untuk mewadahi ide-ide kreatif mahasiswa STMIK Tazkia.', '<p>Portal inovasi mahasiswa baru resmi diluncurkan...</p>', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80', 890, 120, ARRAY['Kampus', 'Portal']),
('Pelatihan Kepemimpinan Mahasiswa Sukses', 'pelatihan-kepemimpinan', 'Pendidikan', 'Melatih mahasiswa agar siap menjadi organisator tangguh di masa depan.', '<p>Pelatihan kepemimpinan sukses dilaksanakan...</p>', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80', 480, 80, ARRAY['Pendidikan', 'Kepemimpinan']);

-- Insert Karya
INSERT INTO karya (title, slug, category, description, image_url, views, likes, github_url, live_url) VALUES
('Tazkia AI Assistant', 'tazkia-ai-assistant', 'Technology', 'AI Assistant untuk mahasiswa STMIK Tazkia.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', 500, 150, 'https://github.com', 'https://tazkia.ac.id'),
('Portal Donasi Sosial', 'portal-donasi-sosial', 'Community service', 'Aplikasi penggalangan dana untuk program sosial kampus.', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80', 320, 95, 'https://github.com', 'https://tazkia.ac.id');

-- Insert Agendas
INSERT INTO agendas (title, slug, type, date, location, image_url, registration_link, description) VALUES
('Tech Startup Seminar 2026', 'tech-startup-seminar', 'event', '2026-08-15 09:00:00+00', 'Auditorium Utama STMIK Tazkia', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1470&q=80', 'https://tazkia.ac.id/register', 'Seminar tentang membangun tech startup di era modern.'),
('Mengajar Desa Pelosok', 'mengajar-desa-pelosok', 'volunteer', '2026-09-01 08:00:00+00', 'Desa Sukamaju, Bogor', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1470&q=80', 'https://tazkia.ac.id/volunteer', 'Program pengabdian masyarakat untuk mengajar teknologi di desa pelosok.');
