-- ==============================================================================
-- PPG SHAREHUB (Ruang Bagi PPG) - INITIAL DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL: whitelist_nim
-- Digunakan untuk memverifikasi apakah NIM pendaftar merupakan alumni sah.
CREATE TABLE IF NOT EXISTS public.whitelist_nim (
    nim TEXT PRIMARY KEY,
    nama_mahasiswa TEXT,
    is_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL: users (Profil publik yang terikat ke auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'alumni' CHECK (role IN ('alumni', 'admin')),
    nim TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    university TEXT DEFAULT 'UIN Syarif Hidayatullah Jakarta',
    batch_year INTEGER DEFAULT 2025,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL: resources (Materi pembelajaran yang dibagikan)
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resource_url TEXT NOT NULL,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('document', 'video', 'quiz', 'other')),
    subject TEXT NOT NULL,
    education_level TEXT NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL: comments (Komentar pada materi)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABEL: likes (Apresiasi dan bookmark)
CREATE TABLE IF NOT EXISTS public.likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_resource_like UNIQUE (user_id, resource_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS di setiap tabel
ALTER TABLE public.whitelist_nim ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- RLS: whitelist_nim
-- Publik/Guest hanya boleh membaca NIM untuk validasi saat register
CREATE POLICY "Allow public read access to whitelist_nim"
ON public.whitelist_nim FOR SELECT
TO anon, authenticated
USING (true);

-- ------------------------------------------------------------------------------
-- RLS: users
-- Siapa saja bisa melihat data profil alumni
CREATE POLICY "Allow public read access to users"
ON public.users FOR SELECT
TO anon, authenticated
USING (true);

-- Pemilik akun dapat memperbarui profilnya sendiri
CREATE POLICY "Allow users to update their own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- RLS: resources
-- Siapapun (termasuk tamu) bisa melihat materi yang tidak di-soft-delete
CREATE POLICY "Allow public read access to non-deleted resources"
ON public.resources FOR SELECT
TO anon, authenticated
USING (is_deleted = false);

-- Hanya user terautentikasi (alumni/admin) yang dapat mengunggah materi
CREATE POLICY "Allow authenticated users to insert resources"
ON public.resources FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Pemilik materi dapat mengupdate materi miliknya
CREATE POLICY "Allow owners to update their resources"
ON public.resources FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- RLS: comments
-- Siapapun bisa membaca komentar
CREATE POLICY "Allow public read access to comments"
ON public.comments FOR SELECT
TO anon, authenticated
USING (true);

-- User terautentikasi bisa mengirim komentar
CREATE POLICY "Allow authenticated users to post comments"
ON public.comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Pemilik komentar bisa menghapus komentarnya
CREATE POLICY "Allow owners to delete their comments"
ON public.comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- RLS: likes
-- Siapapun bisa membaca likes
CREATE POLICY "Allow public read access to likes"
ON public.likes FOR SELECT
TO anon, authenticated
USING (true);

-- User terautentikasi bisa memberikan like
CREATE POLICY "Allow authenticated users to add like"
ON public.likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- User bisa mencabut like miliknya
CREATE POLICY "Allow authenticated users to remove like"
ON public.likes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC USER SYNC (Trigger from auth.users to public.users)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    input_nim TEXT;
    input_fullname TEXT;
    input_university TEXT;
    input_batch INTEGER;
BEGIN
    input_nim := NEW.raw_user_meta_data->>'nim';
    input_fullname := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Alumni PPG');
    input_university := COALESCE(NEW.raw_user_meta_data->>'university', 'UIN Syarif Hidayatullah Jakarta');
    input_batch := COALESCE((NEW.raw_user_meta_data->>'batch_year')::INTEGER, 2025);

    -- Simpan profil ke public.users
    INSERT INTO public.users (id, nim, full_name, university, batch_year, role)
    VALUES (NEW.id, COALESCE(input_nim, NEW.id::text), input_fullname, input_university, input_batch, 'alumni')
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        university = EXCLUDED.university,
        batch_year = EXCLUDED.batch_year;

    -- Update status claimed pada whitelist_nim jika ada
    IF input_nim IS NOT NULL THEN
        UPDATE public.whitelist_nim SET is_claimed = TRUE WHERE nim = input_nim;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger setelah user melakukan Sign Up di auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- SEED DATA AWAL (NIM untuk pengujian validasi)
-- ==============================================================================
INSERT INTO public.whitelist_nim (nim, nama_mahasiswa, is_claimed)
VALUES 
    ('1122001', 'Ahmad Fadillah', false),
    ('1122002', 'Siti Nurhaliza', false),
    ('1122003', 'Budi Santoso', false),
    ('1122004', 'Fahri Ramadhan', false),
    ('1122005', 'Dewi Sartika', false)
ON CONFLICT (nim) DO NOTHING;

