-- Membuat tabel log untuk melacak "Likes"
CREATE TABLE IF NOT EXISTS public.karya_likes_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    karya_id UUID NOT NULL REFERENCES public.karya(id) ON DELETE CASCADE,
    device_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(karya_id, device_id)
);

-- Index untuk mempercepat pencarian (karya_id + device_id)
CREATE INDEX IF NOT EXISTS idx_karya_likes_log ON public.karya_likes_log(karya_id, device_id);

-- Fungsi RPC untuk Toggle Like (Suka / Batal Suka)
CREATE OR REPLACE FUNCTION public.toggle_karya_like(p_karya_id UUID, p_device_id TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    existing_like UUID;
BEGIN
    -- Cek apakah device ini sudah melike karya ini
    SELECT id INTO existing_like 
    FROM public.karya_likes_log 
    WHERE karya_id = p_karya_id AND device_id = p_device_id;

    IF existing_like IS NOT NULL THEN
        -- Batal Suka (Unlike)
        DELETE FROM public.karya_likes_log WHERE id = existing_like;
        
        -- Kurangi counter likes
        UPDATE public.karya 
        SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) 
        WHERE id = p_karya_id;
        
        RETURN false; -- Status baru: Tidak di-like
    ELSE
        -- Suka (Like)
        INSERT INTO public.karya_likes_log (karya_id, device_id) 
        VALUES (p_karya_id, p_device_id);
        
        -- Tambah counter likes
        UPDATE public.karya 
        SET likes = COALESCE(likes, 0) + 1 
        WHERE id = p_karya_id;
        
        RETURN true; -- Status baru: Di-like
    END IF;
END;
$$;
