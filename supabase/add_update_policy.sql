-- Menambahkan kebijakan (policy) agar user bisa mengupdate karyanya sendiri
CREATE POLICY "Users can update their own karya"
ON public.karya
FOR UPDATE
USING (auth.uid() = user_id);
