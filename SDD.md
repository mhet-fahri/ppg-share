# 📐 Software Design Document (SDD)
## Nama Proyek: PPG ShareHub (Ruang Bagi PPG)
**Versi:** 1.0.0 | **Tanggal:** 3 Juli 2026 | **Status:** Draft

---

## 1. Pendahuluan
Dokumen ini menguraikan arsitektur teknis, desain database, struktur komponen, dan alur integrasi sistem untuk proyek **PPG ShareHub**. Sistem ini dirancang sebagai aplikasi *Single Page Application* (SPA) dengan pendekatan *Serverless* Backend yang di-hosting secara gratis dengan performa tinggi.

## 2. Arsitektur Sistem (System Architecture)

### 2.1. High-Level Architecture
Sistem beroperasi dengan pola **BaaS (Backend as a Service)**, menghilangkan kebutuhan server tradisional (Node.js/Express) untuk menekan biaya operasional.
*   **Client (Frontend):** React.js (Vite), berjalan di browser pengguna.
*   **Hosting Frontend:** Cloudflare Pages (Menyajikan aset statis HTML/CSS/JS via CDN Global).
*   **Backend & Database:** Supabase (Menangani Autentikasi, Database PostgreSQL, dan Row Level Security).

### 2.2. Alur Data (Data Flow)
1. Pengguna membuka aplikasi -> Cloudflare Pages mengirimkan aset React (Vite).
2. Aplikasi React merender antarmuka pengguna (UI).
3. Jika pengguna melakukan aksi (misal: login, memuat *feed* materi):
   * Aplikasi menggunakan `supabase-js` SDK untuk memanggil API secara asinkron (REST/Real-time).
   * Supabase mengeksekusi *query* ke PostgreSQL dan mengembalikan respons JSON ke React.
4. React memperbarui *state* global (Zustand) dan merender ulang antarmuka komponen.

---

## 3. Desain Database (Database Schema - PostgreSQL)

Berikut adalah entitas utama (Tabel) yang akan dikelola di Supabase.

### 3.1. Tabel `whitelist_nim` (Referensi Validasi)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `nim` | String | Primary Key (Nomor Induk Mahasiswa valid) |
| `nama_mahasiswa` | String | Nama alumni (Opsional) |
| `is_claimed` | Boolean | Status apakah NIM ini sudah didaftarkan akun |

### 3.2. Tabel `users` (Extend dari `auth.users` Supabase)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (Relasi dari `auth.users.id`) |
| `role` | String | 'alumni', 'admin' |
| `nim` | String | Nomor Induk Mahasiswa (Unique, untuk validasi) |
| `full_name` | String | Nama lengkap pengguna |
| `university` | String | Universitas asal PPG |
| `batch_year` | Integer | Angkatan PPG (misal: 2025) |
| `created_at` | Timestamp | Waktu akun dibuat |

### 3.2. Tabel `resources` (Materi)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key -> `users.id` (Pembuat) |
| `title` | String | Judul materi |
| `description` | Text | Deskripsi materi |
| `resource_url` | String | Link Eksternal (G-Drive, YouTube, dll) |
| `resource_type`| String | 'document', 'video', 'quiz' |
| `subject` | String | Mata pelajaran (Matematika, dll) |
| `education_level`| String | Jenjang (SD/SMP/SMA/SMK) |
| `is_deleted` | Boolean | Flag Soft-Delete (Default: false) |
| `created_at` | Timestamp | Waktu unggah |

### 3.3. Tabel `comments`
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `resource_id` | UUID | Foreign Key -> `resources.id` |
| `user_id` | UUID | Foreign Key -> `users.id` (Penulis) |
| `content` | Text | Isi komentar |
| `created_at` | Timestamp | Waktu komentar dibuat |

### 3.4. Tabel `likes` (dan Bookmark)
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `resource_id` | UUID | Foreign Key -> `resources.id` |
| `user_id` | UUID | Foreign Key -> `users.id` |
*(Terdapat constraint UNIQUE gabungan `resource_id` dan `user_id` agar 1 user hanya bisa melakukan 1 like/bookmark per resource).*

---

## 4. Desain Antarmuka & Komponen (Frontend Structure)

Proyek akan menggunakan struktur folder standar React dengan Vite, yang diletakkan di dalam `/src`.

### 4.1. Struktur Folder (Directory Tree)
```text
/src
 ├── /assets         (Gambar statis, ikon khusus)
 ├── /components
 │    ├── /ui        (Reusable atom: Button, Input, Modal, Card - Tailwind+Framer)
 │    ├── /layout    (Sidebar, Topbar, MainLayout)
 │    └── /features  (ResourceCard, CommentList, UploadModal)
 ├── /pages          (Halaman utama: Home, Profile, ResourceDetail)
 ├── /store          (Zustand stores: useAuthStore, useThemeStore)
 ├── /lib            (Konfigurasi eksternal: supabaseClient.js, utilitas format)
 ├── App.jsx         (Definisi Routes dengan React Router)
 └── index.css       (Tailwind directives)
```

### 4.2. Penjelasan State Management (Zustand)
Kita akan menggunakan file store tunggal untuk mengelola sesi otentikasi (`useAuthStore`).
*   `user`: objek informasi pengguna (termasuk *role* dan profil).
*   `session`: menyimpan token dari Supabase Auth.
*   `login()` & `logout()`: *actions* untuk memanipulasi status akses.

---

## 5. Implementasi Sistem CRUED (Resource Management)

Sistem CRUED (Create, Read, Update, Export, Delete) difokuskan pada pengolahan Link materi agar tidak membebani *storage* aplikasi.

1.  **Create:** Aplikasi akan menyediakan `<UploadModal />`. Pengguna memasukkan judul, deksripsi, dan **URL Link**.
2.  **Read:** Di halaman `<ResourceDetail />`, jika tautan adalah YouTube, aplikasi menggunakan `<iframe>` embed standar. Jika tautan adalah Google Drive / PDF, aplikasi menggunakan library embed dokumen atau iFrame bawaan agar isi dokumen terbaca langsung di layar browser (tanpa perlu membuka tab baru).
3.  **Update:** Pemilik materi dapat mengklik ikon edit (Lucide Icon) untuk membuka modal revisi (Hanya *owner* dan *admin* yang diizinkan mengedit metadata).
4.  **Export:** Terdapat `<Button>Ekspor/Salin Tautan</Button>` untuk menyalin URL asli, dan sebuah tombol untuk membuka tautan sumber secara utuh.
5.  **Delete:** Aksi penghapusan *resource* akan memunculkan *confirmation modal*. Sistem menggunakan **Soft-Delete** dengan cara mengubah kolom `is_deleted` menjadi `true` di Supabase (data asli tetap aman untuk keperluan audit).

---

## 6. Keamanan & Akses (Security Policy - Supabase RLS)

Keamanan basis data akan diserahkan pada fitur **Row Level Security (RLS)** bawaan PostgreSQL di Supabase.

1.  **Read Policy (Publik/Guest):** Semua orang (termasuk Tamu / Publik yang belum login) secara otomatis DAPAT mengakses dan membaca (`SELECT`) tabel `resources` secara bebas, dengan syarat `is_deleted = false`.
2.  **Insert Policy (Alumni-Only):** HANYA pengguna terotentikasi yang berstatus **Alumni PPG** (dan Admin) yang diizinkan menambah atau mengunggah (`INSERT`) data materi ke dalam tabel `resources`.
3.  **Update/Delete Policy (Owner):** Pengguna hanya DAPAT mengubah (`UPDATE`) baris data yang kolom `user_id`-nya cocok dengan ID mereka (`auth.uid()`) saat ini (termasuk melakukan aksi *Soft-Delete* dengan merubah nilai `is_deleted`).
4.  **Admin Policy:** Pengguna dengan `role = 'admin'` di tabel `users` memiliki hak akses penuh (bisa mengubah/menghapus *resource* atau komentar milik siapa saja).
5.  **Rate Limiting (Anti-Spam):** Menerapkan fungsi pembatasan di level database atau Edge Functions untuk membatasi frekuensi unggahan (misal: maksimal 5 materi/jam) guna mencegah bot *spam*.

---

## 7. Skema Integrasi Berkelanjutan (CI/CD)

Proses perilisan (Deployment) diotomatisasi sepenuhnya melalui **Cloudflare Pages**.
1. Developer melakukan `git push` ke *branch* `main` di GitHub.
2. Cloudflare Pages mendeteksi *commit* terbaru di repositori tersebut.
3. Cloudflare menjalankan perintah `npm run build` (Vite) secara otomatis.
4. Hasil *build* situs web statis dipublikasikan ke seluruh jaringan server global Cloudflare (waktu *deploy* < 2 menit).
