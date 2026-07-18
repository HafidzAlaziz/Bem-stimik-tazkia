-- Membuat tabel log untuk melacak penonton karya
CREATE TABLE IF NOT EXISTS public.karya_views_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    karya_id UUID NOT NULL REFERENCES public.karya(id) ON DELETE CASCADE,
    device_id TEXT NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk mempercepat pencarian (karya_id + device_id)
CREATE INDEX IF NOT EXISTS idx_karya_views_log ON public.karya_views_log(karya_id, device_id);

-- Fungsi RPC Anti-Spam: Hanya menambah views jika device ini belum melihat dalam 24 jam terakhir
CREATE OR REPLACE FUNCTION public.increment_karya_view(p_karya_id UUID, p_device_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    last_view TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Cek kapan terakhir kali device_id ini melihat karya_id ini
    SELECT viewed_at INTO last_view 
    FROM public.karya_views_log 
    WHERE karya_id = p_karya_id AND device_id = p_device_id 
    ORDER BY viewed_at DESC 
    LIMIT 1;

    -- Jika belum pernah melihat, ATAU terakhir melihat sudah lebih dari 24 jam yang lalu
    IF last_view IS NULL OR last_view < NOW() - INTERVAL '24 hours' THEN
        -- 1. Catat di tabel log
        INSERT INTO public.karya_views_log (karya_id, device_id) 
        VALUES (p_karya_id, p_device_id);
        
        -- 2. Tambahkan counter views di tabel utama
        UPDATE public.karya 
        SET views = COALESCE(views, 0) + 1 
        WHERE id = p_karya_id;
    END IF;
END;
$$;
