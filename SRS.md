# 📋 Software Requirements Specification (SRS)
## Nama Proyek: PPG ShareHub (Ruang Bagi PPG)
**Versi:** 1.0.0 | **Tanggal:** 3 Juli 2026 | **Status:** Draft

---

## 1. Pendahuluan
Dokumen **Software Requirements Specification (SRS)** ini mendeskripsikan spesifikasi kebutuhan perangkat lunak untuk aplikasi **PPG ShareHub**. Dokumen ini menjadi acuan utama bagi pengembang dalam memahami fitur spesifik, fungsionalitas sistem, serta batasan teknis (Non-Functional Requirements).

## 2. Kebutuhan Fungsional (Functional Requirements - FR)

Kebutuhan fungsional dijabarkan berdasarkan fitur yang berinteraksi langsung dengan pengguna.

### FR-01: Manajemen Pengguna & Autentikasi
*   **FR-01.1:** Sistem harus memungkinkan pengguna mendaftar (registrasi) akun. **Penting:** Sistem harus memvalidasi NIM (Nomor Induk Mahasiswa) saat pendaftaran. Hanya NIM yang terdaftar dalam *database/whitelist* Admin yang akan diberikan peran (role) sebagai **Alumni PPG**.
*   **FR-01.2:** Sistem harus dapat membedakan peran pengguna: Tamu (Guest), Alumni (Hanya dengan NIM Valid), dan Admin.
*   **FR-01.3:** Sistem harus mengarahkan Tamu yang mencoba melakukan aksi interaktif (seperti *Like*, Komentar, atau Unggah) ke halaman *Login*.
*   **FR-01.4:** Sistem harus memiliki halaman profil di mana pengguna dapat memperbarui data angkatan, asal universitas, dan melihat daftar materi yang pernah dibagikan.

### FR-02: Manajemen Materi (Sistem CRUED berbasis Link)
*   **FR-02.1 (Create - Restricted Upload):** Sistem HANYA mengizinkan pengguna terotentikasi dengan peran **Alumni PPG** (dan Admin) untuk menambah materi baru menggunakan tautan eksternal (contoh: Link G-Drive, YouTube, dll) beserta metadatanya.
*   **FR-02.2 (Read - Public Access):** Sistem harus memastikan bahwa seluruh materi yang telah diunggah dapat diakses secara **umum/publik**. Pemuatan Feed materi harus menggunakan sistem **Pagination / Infinite Scroll** agar aplikasi tidak melambat saat menangani data besar.
*   **FR-02.3 (Read - Preview & Fallback):** Sistem harus memvalidasi domain tautan eksternal (hanya G-Drive, YouTube, dsb.) dan menampilkan *preview/embed*. Jika tautan gagal dimuat (*broken embed* / akses terkunci), sistem harus menampilkan **Fallback UI** (tombol "Buka Dokumen di Tab Baru").
*   **FR-02.4 (Update):** Sistem harus mengizinkan pemilik materi dan Admin untuk mengubah metadata atau mengganti link referensi materi.
*   **FR-02.5 (Export/Download):** Sistem harus menyediakan tombol untuk menyalin link atau menuju ke tautan asli guna mengunduh materi.
*   **FR-02.6 (Delete - Soft Delete):** Sistem menerapkan **Soft-Delete**. Jika pengguna atau Admin menghapus materi, data hanya disembunyikan dari antarmuka web, namun rekam jejak (*log*) tetap tersimpan di database Supabase untuk kebutuhan audit.

### FR-03: Interaksi Sosial (Komunitas)
*   **FR-03.1:** Sistem harus memungkinkan pengguna memberi apresiasi (*Like*) pada materi. Satu pengguna hanya dapat memberi maksimal satu *like* pada satu materi (bersifat *toggle* / bisa dibatalkan).
*   **FR-03.2:** Sistem harus menyediakan kolom diskusi (Komentar) pada setiap halaman materi agar pengguna dapat saling berdiskusi.
*   **FR-03.3:** Sistem harus memiliki fitur *Bookmark* agar pengguna dapat menyimpan materi favorit ke dalam daftar "Tersimpan" milik pribadi.

### FR-04: Pencarian dan Filter
*   **FR-04.1:** Sistem harus menyediakan kolom pencarian teks dengan fitur **Full-Text Search (FTS)** agar toleran terhadap salah ketik (typo) dan lebih akurat.
*   **FR-04.2:** Sistem harus menyediakan alat untuk memfilter (menyaring) materi berdasarkan: Jenjang Pendidikan, Mata Pelajaran, dan Format Materi (Dokumen, Video, Kuis).

### FR-05: Dasbor Admin (Khusus Pengelola)
*   **FR-05.1:** Sistem harus memiliki batasan khusus di mana pengguna biasa (Alumni) tidak dapat mengakses dasbor Administrator.
*   **FR-05.2:** Admin dapat menghapus materi atau komentar apapun yang dianggap melanggar standar komunitas tanpa persetujuan pemilik aslinya.

---

## 3. Kebutuhan Non-Fungsional (Non-Functional Requirements - NFR)

### NFR-01: Performa dan Skalabilitas
*   **NFR-01.1:** Waktu muat awal aplikasi (*First Contentful Paint*) tidak boleh melebihi 2 detik pada koneksi standar, didukung oleh respons *edge network* CDN dari Cloudflare Pages.
*   **NFR-01.2:** Frontend harus mematuhi praktik SPA menggunakan Vite (React.js) agar navigasi halaman terasa instan tanpa me-muat ulang (*reload*) tab browser.

### NFR-02: Keamanan
*   **NFR-02.1:** Seluruh lalu lintas data harus menggunakan protokol HTTPS (TLS) secara otomatis.
*   **NFR-02.2:** Keamanan level tabel database sepenuhnya dikonfigurasi melalui *Row Level Security (RLS)* di Supabase, mencegah injeksi API ilegal langsung dari sisi klien.

### NFR-03: Ketersediaan Layanan (Availability)
*   **NFR-03.1:** Sistem mengandalkan infrastruktur pihak ketiga secara menyeluruh (*Serverless*). *Uptime* sistem secara otomatis mengikuti standar *Service Level Agreement (SLA)* tinggi dari infrastruktur Cloudflare Pages dan Supabase.

### NFR-04: Pengalaman Pengguna (Usability & UI/UX)
*   **NFR-04.1:** Seluruh antarmuka harus *Mobile-Responsive*. Desain harus dioptimalkan untuk perangkat layar sentuh kecil (*smartphone*), karena target pengguna (Guru PPG) dominan mengakses menggunakan HP.
*   **NFR-04.2:** Antarmuka (*UI*) dibentuk menggunakan utilitas Tailwind CSS v3 dengan mengikuti pola desain (*Design System*) yang bernuansa modern, rapi (*clean*), bersudut lengkung (`rounded-2xl`), dan memanfaatkan *soft-shadow*.

---

## 4. Asumsi & Batasan (Assumptions and Constraints)
1. **Penghematan Storage:** Mematuhi skema arsitektur gratis, platform secara sadar membatasi pengunggahan *file* fisik untuk mencegah kelebihan batas kapasitas (kuota *storage*). Aplikasi murni menjadi portal agregator berbasis tautan eksternal (URL).
2. **Ketergantungan Eksternal (API & Cloud):** Jika server Cloudflare atau Supabase mengalami kegagalan (*down*), maka fungsionalitas utama web (atau fitur login/database) juga akan terdampak sementara waktu.
3. **Pratinjau (Preview) Eksternal:** Aplikasi sangat bergantung pada pengaturan pembagian berkas (Share Settings) dari *platform cloud* pengguna (seperti G-Drive). Jika link Google Drive yang dikirim bersifat *Private / Restricted*, maka pratinjau (*embed frame*) akan menampilkan pesan penolakan akses (Akses ditolak oleh Google).
