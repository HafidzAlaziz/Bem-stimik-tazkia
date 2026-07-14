-- Create Kabinet Profiles table
CREATE TABLE public.kabinet_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    periode TEXT NOT NULL,
    nama_kabinet TEXT NOT NULL,
    visi TEXT,
    misi JSONB DEFAULT '[]'::jsonb,
    pengurus_inti JSONB DEFAULT '[]'::jsonb,
    proker_utama JSONB DEFAULT '[]'::jsonb,
    departemen JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.kabinet_profiles ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Allow anyone to read active kabinet
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.kabinet_profiles FOR SELECT 
USING ( true );

-- Allow authenticated admins to do everything
-- Assuming admins are authenticated users with specific roles, but for simplicity we allow authenticated users for now
-- Update this policy according to your exact admin role structure
CREATE POLICY "Admins can insert kabinet profiles." 
ON public.kabinet_profiles FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admins can update kabinet profiles." 
ON public.kabinet_profiles FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Admins can delete kabinet profiles." 
ON public.kabinet_profiles FOR DELETE 
TO authenticated 
USING (true);

-- Insert initial data
INSERT INTO public.kabinet_profiles (periode, nama_kabinet, visi, misi, pengurus_inti, proker_utama, departemen, is_active)
VALUES (
    '2024/2025',
    'Sinergi Aktif',
    'Mewujudkan BEM STMIK Tazkia sebagai inisiator pergerakan yang progresif, inklusif, dan berdampak nyata bagi sivitas akademika dan masyarakat berbasis data dan keilmuan statistik.',
    '["Membangun sinergi internal BEM yang solid, transparan, dan profesional.", "Menyelenggarakan program kerja berbasis teknologi informasi dan dakwah yang inovatif.", "Menjadi wadah aspirasi yang responsif terhadap kebutuhan mahasiswa STMIK Tazkia."]',
    '[
        {"name": "Ahmad Fulan", "role": "Ketua BEM", "ig": "@ahmadfulan", "wa": "6281234567890", "initials": "AF", "color": "#1b4086", "bg": "#e1e7ff"},
        {"name": "Siti Fulanah", "role": "Wakil Ketua BEM", "ig": "@sitifulanah", "wa": "6281234567891", "initials": "SF", "color": "#f2791e", "bg": "#ffdbca"},
        {"name": "Budi Santoso", "role": "Sekretaris Umum", "ig": "@budisnts", "wa": "6281234567892", "initials": "BS", "color": "#006684", "bg": "#bce9ff"},
        {"name": "Nurul Hidayah", "role": "Bendahara Umum", "ig": "@nurulhdyh", "wa": "6281234567893", "initials": "NH", "color": "#1b4086", "bg": "#e1e7ff"}
    ]',
    '[
        {"nama": "STMIK Tazkia Summit", "deskripsi": "Forum diskusi rutin antar UKM dan ORMAWA kampus untuk sinergi kegiatan mahasiswa.", "icon": "🏆", "tag": "Tahunan"},
        {"nama": "Malam Apresiasi Mahasiswa", "deskripsi": "Penghargaan bagi mahasiswa berprestasi akademik dan non-akademik setiap akhir semester.", "icon": "🌟", "tag": "Semester"},
        {"nama": "BEM Goes to School", "deskripsi": "Sosialisasi kampus ke SMA/SMK sekitar Bogor untuk meningkatkan kesadaran pendidikan tinggi.", "icon": "🏫", "tag": "Tahunan"},
        {"nama": "Olimpiade Mahasiswa Internal", "deskripsi": "Kompetisi lintas departemen dalam bidang IT, desain, dan soft skill untuk mahasiswa STMIK Tazkia.", "icon": "🎯", "tag": "Semester"}
    ]',
    '[
        {
            "id": "hubma", "nama": "Hubungan Mahasiswa", "singkatan": "HUBMA", "deskripsi": "Menjalin relasi eksternal BEM, memperkuat jejaring antar organisasi kampus, dan menjadi jembatan antara mahasiswa dengan pihak akademik.", "warna": "#1b4086", "warnaBg": "#e1e7ff", "icon": "🤝",
            "anggota": [
                {"name": "Rizky Pratama", "role": "Kepala Departemen", "initials": "RP", "ig": "@rizky_prtma", "wa": "6281111111111"},
                {"name": "Siti Aminah", "role": "Wakil Kepala", "initials": "SA", "ig": "@sitiaminah", "wa": "6281111111112"},
                {"name": "Fajar Hidayat", "role": "Staff Hubungan Eksternal", "initials": "FH", "ig": "@fajar_h", "wa": "6281111111113"},
                {"name": "Lina Marlina", "role": "Staff Hubungan Internal", "initials": "LM", "ig": "@lina.m", "wa": "6281111111114"}
            ],
            "proker": [
                {"nama": "Forum ORMAWA", "deskripsi": "Pertemuan rutin antar pimpinan organisasi mahasiswa kampus.", "tag": "Rutin"},
                {"nama": "Kunjungan Instansi", "deskripsi": "Kunjungan ke instansi pemerintah dan swasta untuk networking mahasiswa.", "tag": "Semesteran"},
                {"nama": "MoU Kolaborasi", "deskripsi": "Penyusunan nota kesepahaman bersama organisasi eksternal kampus.", "tag": "Tahunan"}
            ]
        },
        {
            "id": "ristek", "nama": "Riset & Teknologi", "singkatan": "RISTEK", "deskripsi": "Mewadahi inovasi teknologi mahasiswa, mengelola riset internal BEM, dan mengadakan kompetisi serta workshop IT untuk meningkatkan daya saing.", "warna": "#006684", "warnaBg": "#bce9ff", "icon": "💡",
            "anggota": [
                {"name": "Kevin Wijaya", "role": "Kepala Departemen", "initials": "KW", "ig": "@kevin.tech", "wa": "6282222222221"},
                {"name": "Nadia Safira", "role": "Staff Riset Data", "initials": "NS", "ig": "@nadiasf", "wa": "6282222222222"},
                {"name": "Ilham Akbar", "role": "Staff Pengembangan IT", "initials": "IA", "ig": "@ilham_code", "wa": "6282222222223"},
                {"name": "Putri Dewi", "role": "Staff Web & Desain", "initials": "PD", "ig": "@putridewi_dev", "wa": "6282222222224"},
                {"name": "Reza Maulana", "role": "Staff Workshop", "initials": "RM", "ig": "@reza.ml", "wa": "6282222222225"}
            ],
            "proker": [
                {"nama": "Workshop Coding & AI", "deskripsi": "Pelatihan pemrograman dan kecerdasan buatan untuk mahasiswa.", "tag": "Triwulan"},
                {"nama": "Hackathon STMIK Tazkia", "deskripsi": "Kompetisi pembuatan aplikasi dalam waktu 24 jam bagi mahasiswa.", "tag": "Tahunan"},
                {"nama": "Riset Data BEM", "deskripsi": "Penelitian internal terkait kebutuhan dan aspirasi mahasiswa.", "tag": "Rutin"},
                {"nama": "IT Talk", "deskripsi": "Seminar teknologi menghadirkan praktisi industri digital.", "tag": "Semester"}
            ]
        },
        {
            "id": "medibrand", "nama": "Media & Branding", "singkatan": "MEDIBRAND", "deskripsi": "Menjadi ujung tombak komunikasi digital BEM. Mengelola seluruh aset visual, konten media sosial, dan identitas brand BEM STMIK Tazkia.", "warna": "#f2791e", "warnaBg": "#ffdbca", "icon": "📣",
            "anggota": [
                {"name": "Aulia Rahman", "role": "Kepala Departemen", "initials": "AR", "ig": "@auliar_design", "wa": "6283333333331"},
                {"name": "Bagas Koro", "role": "Staff Videografi", "initials": "BK", "ig": "@bagaskoro.vid", "wa": "6283333333332"},
                {"name": "Maya Sari", "role": "Staff Desain Grafis", "initials": "MS", "ig": "@maya.creative", "wa": "6283333333333"},
                {"name": "Dani Putra", "role": "Staff Konten & Copywriting", "initials": "DP", "ig": "@dani.write", "wa": "6283333333334"}
            ],
            "proker": [
                {"nama": "Rebrand BEM Annual", "deskripsi": "Pembaruan identitas visual dan panduan brand BEM setiap tahun.", "tag": "Tahunan"},
                {"nama": "Social Media Campaign", "deskripsi": "Kampanye konten edukatif dan informatif di semua platform digital BEM.", "tag": "Rutin"},
                {"nama": "Newsletter BEM", "deskripsi": "Publikasi berkala tentang kegiatan dan prestasi mahasiswa.", "tag": "Bulanan"}
            ]
        }
    ]',
    true
);
