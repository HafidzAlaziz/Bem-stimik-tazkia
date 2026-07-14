-- 1. Create a new storage bucket named 'public_images'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public_images', 'public_images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to view files (SELECT)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'public_images');

-- 3. Allow authenticated users to upload files (INSERT)
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'public_images' 
  AND auth.role() = 'authenticated'
);

-- 4. Allow authenticated users to delete/update files (UPDATE, DELETE)
CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'public_images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'public_images' 
  AND auth.role() = 'authenticated'
);
