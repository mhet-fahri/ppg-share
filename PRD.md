# 📄 Product Requirements Document (PRD)
## Nama Proyek: PPG ShareHub (Ruang Bagi PPG)
**Versi:** 1.0.0 | **Tanggal:** 3 Juli 2026 | **Status:** Draft

---

## 1. Ringkasan Eksekutif (Executive Summary)
**PPG ShareHub** adalah platform berbasis web yang dirancang khusus sebagai ekosistem kolaborasi bagi Alumni PPG (Pendidikan Profesi Guru) dan Pengelola PPG. Platform ini berfungsi sebagai repositori terpusat untuk berbagi, mendiskusikan, dan menilai perangkat pembelajaran (Dokumen, Kuis, Video, dll). Aplikasi ini mengutamakan pengalaman pengguna yang modern, bersih, dan profesional dengan pendekatan *mobile-first*.

## 2. Tujuan Produk (Product Objectives)
1. **Sentralisasi Aset:** Menyediakan tempat penyimpanan dan berbagi perangkat pembelajaran yang terstruktur.
2. **Kolaborasi & Apresiasi:** Memungkinkan interaksi melalui *likes*, komentar, dan *bookmark* untuk membangun komunitas yang saling mendukung.
3. **Aksesibilitas:** Memudahkan guru menemukan materi ajar berdasarkan mata pelajaran, jenjang, atau format file.

## 3. Target Pengguna & Peran (User Roles)
*   **Guest (Tamu / Umum):** Materi dapat diakses (dilihat dan dibaca) secara umum oleh siapa saja (publik), namun Tamu tidak dapat mengunggah atau berinteraksi (*like*/komentar).
*   **Alumni PPG (Guru):** Hanya pengguna berstatus Alumni PPG yang memiliki hak akses untuk mengunggah (upload) materi resource. Status alumni diverifikasi secara ketat menggunakan pencocokan **NIM (Nomor Induk Mahasiswa)** terhadap *whitelist database* yang dikelola oleh Admin saat pendaftaran. Mereka juga dapat mengunduh, memberi *like*, berkomentar, dan mengelola profil/unggahannya.
*   **Pengelola PPG (Admin/Dosen):** Memiliki hak akses penuh untuk memoderasi konten, men-*feature* (menyorot) resource terbaik, mengelola pengguna, dan melihat analitik platform.

## 4. Fitur Utama (Core Features)

### 4.1. Manajemen Resource (Perangkat Pembelajaran) - Sistem CRUED
Sistem manajemen materi menerapkan alur kerja **CRUED (Create, Read, Update, Export/Download, Delete)** untuk fleksibilitas maksimal:
*   **Create (Tambah):** Pengguna dapat membagikan materi dengan mudah. **Materi (Dokumen PDF/DOCX/PPT atau Video) dapat ditambahkan HANYA menggunakan Link (URL)** (seperti dari Google Drive, YouTube, OneDrive, atau platform *cloud* lainnya). Tidak perlu unggah file manual (menghemat kapasitas *storage*).
*   **Read (Tampil & Preview):** Aplikasi mampu secara pintar membaca Link tersebut dan langsung menampilkan *preview/embed* dokumen/video. Terdapat mekanisme **Validasi Domain** (hanya link terpercaya seperti G-Drive/YouTube) dan **Fallback UI** (tombol "Buka di Tab Baru") jika *embed* gagal dimuat karena batasan privasi.
*   **Update (Perbarui):** Pengguna dapat merevisi metadata materi atau memperbarui link tautan.
*   **Export (Unduh/Ekspor):** Pengguna dapat mengunduh dokumen secara langsung atau membagikan link materi ke luar platform.
*   **Delete (Hapus):** Pemilik materi dapat mencabut tautannya dari platform. Sistem menggunakan konsep **Soft-Delete** (hanya disembunyikan dari antarmuka) agar Admin tetap memiliki jejak audit (*audit trail*).
*   **Metadata Khusus:** Tiap materi dikategorikan menggunakan metadata Judul, Deskripsi, Mata Pelajaran, Jenjang (SD/SMP/SMA/SMK), Kelas, dan Tagar (*Tags*).

### 4.2. Interaksi Sosial & Komunitas
*   **Like/Upvote:** Memberikan apresiasi pada resource yang bermanfaat.
*   **Komentar:** Diskusi threaded (bertingkat) untuk tanya jawab atau revisi materi.
*   **Bookmark/Save:** Menyimpan resource ke dalam koleksi pribadi.

### 4.3. Pencarian & Filter (Discovery)
*   Pencarian berbasis teks menggunakan kapabilitas **Full-Text Search (FTS)** PostgreSQL untuk toleransi ketikan dan akurasi tinggi.
*   Filter berdasarkan: Kategori File, Mata Pelajaran, Jenjang, Tanggal Upload, dan Paling Populer.
*   **Menu Navigasi Per-Mapel:** Terdapat menu horizontal sekunder di bawah *header* utama untuk memfilter materi secara cepat berdasarkan mata pelajaran spesifik Kemenag (PAI, Akidah Akhlak, SKI, Al Quran Hadits, B. Arab, GKMI, GKRA).

### 4.4. Dashboard & Profil
*   **Feed Beranda:** Menampilkan resource terbaru dan *trending*. Menggunakan **Pagination / Infinite Scroll** untuk menjaga performa web saat memuat ribuan data.
*   **Profil Pengguna:** Menampilkan info alumni (Angkatan PPG, Universitas, Sekolah saat ini) dan daftar resource yang pernah diunggah.

---

## 5. Spesifikasi Teknis (Technical Stack & Arsitektur Gratis)

### 5.1. Arsitektur Frontend (Gratis & Performa Tinggi)
*   **Framework:** React.js dengan Vite (Wajib menggunakan ekstensi **`.jsx`**, BUKAN `.tsx`). Vite memastikan *build* yang cepat.
*   **Styling:** Tailwind CSS **v3** (Menggunakan konfigurasi `tailwind.config.js`).
*   **Animasi:** Framer Motion (Untuk transisi halaman, *hover effects*, modal, dan *skeleton loading*).
*   **Ikon:** Lucide React.
*   **State Management & Routing:** Zustand (untuk state) dan React Router DOM v6.
*   **Hosting Frontend:** **Cloudflare Pages**. Menyediakan *Free Tier* (gratis) selamanya untuk proyek skala kecil-menengah, performa sangat cepat dengan CDN global, dan memiliki integrasi CI/CD otomatis.

### 5.2. Arsitektur Backend, Database & Storage (BaaS Gratis)
*   **Backend as a Service (BaaS):** **Supabase**. Merupakan alternatif gratis terbaik yang tangguh. *Free tier* dari Supabase sangat mencukupi untuk MVP platform edukasi.
*   **Database:** **PostgreSQL** (Bawaan Supabase). Sangat tangguh untuk menangani relasi data terstruktur (misal: relasi user, resource, komentar, dan bookmark).
*   **Authentication:** **Supabase Auth**. Pengelolaan login/register gratis yang aman, mendukung verifikasi email maupun OAuth.
*   **File Storage:** **Supabase Storage**. Digunakan untuk menyimpan file (PDF, PPT, Gambar) secara terpusat di satu platform yang sama dengan database.
*   **Security:** Menggunakan fitur *Row Level Security (RLS)* bawaan Supabase untuk memastikan hanya pengguna/pemilik data berwenang yang dapat mengubah atau menghapus resource.

### 5.3. Skema Integrasi CI/CD (Workflow)
1. **Source Code (Repo):** Disimpan di **GitHub** (Gratis untuk *private/public repository*).
2. **Auto-Deployment:** Setiap *push* kode (commit) ke *branch* utama di GitHub, **Cloudflare Pages** akan secara otomatis mem-*build* dan merilis pembaruan web tanpa setup server manual.
3. **Komunikasi Data (Client to Server):** Frontend React memanggil data langsung menggunakan **Supabase-js SDK** (Serverless). Tidak perlu *hosting* Node.js / Express.js terpisah, sehingga menekan biaya hingga Rp0.

---

## 6. Pedoman UI/UX (Design System V3 - Meta/Apple Style)

### 6.1. Gaya Desain (Design Style)
*   **Vibe:** Minimalis & Clean seperti Meta/Apple, Professional, Modern.
*   **Space & Layout:** White space yang generous (padding 80-120px), maximum width 1200px.
*   **Typography:** Inter atau Poppins. Headline Bold 700 (48-64px), Body Regular 16px.
*   **Border Radius:** 8-12px untuk buttons & cards.
*   **Shadow:** Subtle box-shadow (0 2px 8px rgba(0,0,0,0.08)).
*   **Warna:**
    *   *Primary:* Professional Blue (`#1E88E5`).
    *   *Accent:* Gold (`#FFD700`).
    *   *Background:* Light Gray (`#F5F7FA`) dan White (`#FFFFFF`).
    *   *Text:* Almost Black (`#1A1A1A`) dan Medium Gray (`#666666`).

### 6.2. Struktur Halaman (8 Sections)
Sesuai rancangan V3, halaman beranda terdiri dari 8 seksi:
1. Navigation Bar (Sticky, Putih)
2. Hero Section (Gradient biru lembut, overlay background gedung, layout 2 kolom)
3. Kategori Materi (Filter horizontal, Grid cards)
4. Filter & Content (Sticky filter, Masonry/Grid 3 columns cards)
5. Features Section (3 kolom icon+text)
6. Testimonial Section (Slider/Carousel)
7. CTA Section (Primary Blue background)
8. Footer (Dark background, 4 columns)

---

## 7. Contoh Implementasi Kode (Proof of Concept)
Berikut adalah contoh implementasi komponen `<ResourceCard />` yang mematuhi semua aturan teknis (React JSX, Tailwind v3, Framer Motion, Lucide, rounded-2xl).

## 8. User Flow (Alur Pengguna)
1. **Onboarding:** User mendaftar -> **Sistem memverifikasi NIM (Nomor Induk Mahasiswa)** apakah terdaftar di *database whitelist* PPG -> Lengkapi Profil.
2. **Discover:** User masuk ke Beranda -> Melihat *Feed* resource -> Menggunakan *Filter Bar* untuk mencari materi spesifik.
3. **Engage:** User klik *ResourceCard* -> Masuk ke halaman Detail -> Melihat *Preview* -> Memberi *Like* dan menulis *Komentar*.
4. **Contribute:** User klik tombol "Bagikan Resource" (Floating Action Button / Topbar) -> *Upload Modal* muncul -> Isi metadata -> Upload File -> Publish.

## 9. Kriteria Kesuksesan (Success Metrics)
*   **Adopsi:** Minimal 70% alumni PPG angkatan terakhir mendaftar dalam 3 bulan pertama.
*   **Keterlibatan (Engagement):** Rata-rata 3 *likes* atau komentar per resource yang diunggah.
*   **Retensi Konten:** Minimal 50 resource baru diunggah setiap minggunya.

## 10. Rencana Pengembangan Selanjutnya (Future Enhancements - Out of Scope for MVP)
*   **AI Summary:** Menggunakan AI untuk membuat ringkasan otomatis dari dokumen PDF yang diunggah.
*   **Kolaborasi Real-time:** Fitur mengedit dokumen bersama secara *real-time* (seperti Google Docs).
*   **Sertifikat Kontributor:** Memberikan *badge* atau sertifikat digital bagi guru yang paling aktif berbagi resource berkualitas.
*   **Integrasi LMS:** API untuk langsung mengekspor resource ke platform LMS sekolah (Moodle, Canvas, dll).
