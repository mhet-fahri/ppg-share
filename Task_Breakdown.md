# 📋 Task Breakdown & Development Phases
## Nama Proyek: PPG ShareHub (Ruang Bagi PPG)
**Versi:** 1.0.0 | **Tanggal:** 3 Juli 2026 | **Status:** Draft

---

Dokumen ini memecah spesifikasi PRD, SDD, dan SRS menjadi tugas-tugas pengembangan (*development tasks*) yang terstruktur. Sesuai prioritas, **Frontend akan dibangun lebih dulu menggunakan data simulasi (Mock Data)** agar tampilan antarmuka (UI/UX) dapat ditinjau lebih awal, barulah dilanjutkan dengan menyiapkan dan menghubungkan logika *Backend*.

## Fase 1: Inisialisasi Proyek & Lingkungan (Environment Setup)
**Fokus:** Menyiapkan kerangka dasar proyek secara teknis.
*   [x] **1.1. Setup Frontend:** Inisialisasi proyek React menggunakan Vite (`npm create vite@latest`). Pilih JavaScript (Wajib `.jsx`, BUKAN TypeScript).
*   [x] **1.2. Konfigurasi Tailwind CSS:** Instal dan konfigurasi Tailwind CSS v3 beserta berkas `tailwind.config.js`.
*   [x] **1.3. Instalasi Dependensi Inti:** Instal React Router DOM v6, Zustand (State Management), Framer Motion (Animasi), dan Lucide React (Ikon).
*   [x] **1.4. Struktur Direktori:** Membuat struktur folder utama di `/src` (`/components`, `/pages`, `/store`, `/lib`, `/assets`).
*   [x] **1.5. Setup GitHub:** Inisialisasi Git *repository*, buat *initial commit*, dan hubungkan ke repositori GitHub jarak jauh (*remote*).

## Fase 2: Pembuatan Komponen UI Global (UI Primitives)
**Fokus:** Membangun *reusable components* secara visual berdasarkan pedoman desain.
*   [x] **2.1. Komponen Layout:** Bangun UI dasar `<MainLayout />`, `<Topbar />` (Navigasi Atas), dan kerangka halaman.
*   [x] **2.2. Komponen Atom:** Buat komponen UI standar yang statis/interaktif secara visual seperti `<Button />`, `<Input />`, dan `<Card />`.
*   [x] **2.3. Kartu Materi (Resource Card):** Bangun tata letak UI `<ResourceCard />` yang menampilkan judul materi, label (jenjang/mapel), penghitung *likes*, dan avatar.
*   [x] **2.4. Modal & Umpan Balik:** Siapkan kerangka UI visual untuk `<UploadModal />` dan komponen notifikasi *Toast* yang dianimasikan dengan Framer Motion.

## Fase 3: Integrasi Halaman Frontend dengan Data Simulasi (Mock Data)
**Fokus:** Membangun antarmuka halaman secara utuh menggunakan *dummy data* (data palsu dalam bentuk JSON/Array) agar antarmuka dapat dilihat secara penuh.
*   [x] **3.1. Halaman Beranda (Feed):** Rangkai UI Halaman Beranda. Tampilkan daftar `<ResourceCard />` yang di-isi dengan *Mock Data* JSON.
*   [x] **3.2. Filter & Pencarian Simulasi:** Buat UI *Filter Chips* dan *Search Bar*. Simulasikan logika penyaringan/pencarian langsung pada *Mock Data*.
*   [x] **3.3. Halaman Detail & Fallback UI:** Rangkai UI halaman detail, sisipkan *iframe* dokumen *dummy*, dan buat **Fallback UI** statis (Tombol "Buka di Tab Baru") jika *embed* diblokir. Susun UI daftar komentar.
*   [x] **3.4. Halaman Profil (UI):** Bangun UI Halaman Profil beserta transisi *Tab* (Materi Saya / Tersimpan).
*   [x] **3.5. Peninjauan Visual (UI Review):** Meninjau aplikasi yang sudah "tampak jadi" di browser untuk memastikan kenyamanan pengguna (UX) dan responsivitas Mobile.

## Fase 4: Konfigurasi Backend (Supabase)
**Fokus:** Setelah UI disetujui, siapkan arsitektur data yang sesungguhnya di Backend.
*   [ ] **4.1. Buat Proyek Supabase:** Buat proyek baru di *dashboard* Supabase.
*   [ ] **4.2. Eksekusi Skema Database:** Buat tabel `users`, `resources`, `comments`, dan `likes` melalui Supabase SQL Editor.
*   [ ] **4.3. Konfigurasi Row Level Security (RLS):** 
    * Set RLS `resources` agar Publik (Guest) bisa membaca (`SELECT`).
    * Set RLS `resources` agar HANYA pengguna berstatus `role = 'alumni'` yang bisa menambah (`INSERT`).
    * Set RLS agar Pemilik Materi bisa mengubah dan menghapus (`UPDATE`/`DELETE`).
*   [ ] **4.4. Integrasi SDK:** Instal `@supabase/supabase-js`, buat file `/lib/supabaseClient.js`, lalu amankan kredensial ke `.env`.
*   [ ] **4.5. Setup Autentikasi & Whitelist NIM:** Aktifkan Email/Password *Provider* di panel Auth Supabase. Buat mekanisme validasi/pencocokan tabel `whitelist_nim` agar hanya NIM valid yang bisa mendapat peran `alumni`.

## Fase 5: Integrasi Logika Fitur Aktual (Frontend to Backend)
**Fokus:** Mengganti *Mock Data* statis dengan data asli dari API Supabase.
*   [ ] **5.1. Modul Autentikasi (Zustand):** Hubungkan form Login UI dengan API otentikasi Supabase. Kelola *state login* secara global.
*   [ ] **5.2. Aksi "Create" & "Upload":** Hubungkan UI `<UploadModal />` dengan Supabase agar URL dan metadata benar-benar tersimpan ke database.
*   [ ] **5.3. Tarik Data (Pagination & FTS):** Hapus *Mock Data*. Tarik data dari Supabase menggunakan sistem *Pagination / Infinite Scroll* dan terapkan **Full-Text Search (FTS)** pada fungsi pencarian.
*   [ ] **5.4. Logika Komunitas (Like/Komentar):** Sambungkan fungsi klik tombol Like dan *submit* Komentar di UI dengan fungsi `INSERT`/`DELETE` ke tabel Supabase.
*   [ ] **5.5. Manajemen Profil & Soft-Delete:** Aktifkan fungsi edit. Untuk fungsi Takedown (hapus materi), pastikan memicu fungsi **Soft-Delete** (mengubah status `is_deleted = true`) alih-alih menghapus data permanen.

## Fase 6: Pengujian (Testing) & Deployment (Cloudflare)
**Fokus:** Pengujian akhir logika dan merilis situs.
*   [ ] **6.1. Uji Coba Role (Guest vs Alumni):** Verifikasi bahwa UI *Auth Modal* langsung mencegah eksekusi ketika Tamu mencoba berinteraksi.
*   [ ] **6.2. Deployment Cloudflare Pages:** Hubungkan repositori GitHub ke Cloudflare Pages, atur *Environment Variables*, dan rilis web secara global.
