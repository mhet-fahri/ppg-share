# 🗺️ UI/UX Flow & Wireframe Plan
## Nama Proyek: PPG ShareHub (Ruang Bagi PPG)
**Versi:** 1.0.0 | **Tanggal:** 3 Juli 2026 | **Status:** Draft

---

## 1. Peta Situs (Sitemap)
Struktur navigasi hierarki halaman untuk PPG ShareHub:

```text
[ Beranda (Feed Utama) ]
 ├── [ Cari & Filter ]
 ├── [ Detail Materi & Komentar ]
 │
 ├── [ Login / Daftar (Input NIM) ]
 │
 ├── [ Profil Pengguna ] (Butuh Auth)
 │    ├── [ Materi Saya ]
 │    ├── [ Tersimpan (Bookmark) ]
 │    └── [ Pengaturan Profil ]
 │
 └── [ Dasbor Admin ] (Butuh Akses Admin)
      ├── [ Kelola Materi (Takedown) ]
      └── [ Kelola Pengguna ]
```

---

## 2. Alur Pengguna (User Journeys)

### 2.1. Alur Tamu (Guest Flow)
1. **Mendarat:** Pengguna anonim membuka URL dan mendarat di **Beranda (Feed)**.
2. **Eksplorasi:** Tamu menggunakan *search bar* dan laci *filter* untuk mencari referensi dokumen (misal: mencari "RPP Fisika SMA").
3. **Melihat Konten (Akses Publik):** Karena materi bersifat umum/publik, Tamu bebas mengklik kartu materi (*Card*) dan diarahkan ke **Halaman Detail Materi**.
4. **Hambatan Akses (Gate):** 
   - Tamu DAPAT melihat *preview/embed* dokumen dan membaca komentar orang lain secara bebas.
   - Jika Tamu mencoba mengklik tombol **Like**, menulis **Komentar**, atau menekan tombol **"Bagikan Materi" (Upload)**, sebuah Modal interupsi (pop-up) akan muncul: *"Hanya Alumni PPG terdaftar yang dapat membagikan materi dan berinteraksi. Silakan Login!"*.

### 2.2. Alur Alumni (User Flow) - Berbagi Materi
1. **Autentikasi & Gateway:** Alumni masuk menggunakan Google (OAuth) atau Email. Jika baru pertama kali *login*, mereka akan diarahkan secara paksa ke halaman **Onboarding Gateway** untuk memasukkan NIM. Jika NIM cocok dengan database *whitelist*, status berubah menjadi `alumni`. Jika tidak, mereka akan tetap menjadi `guest`.
2. **Aksi Berbagi:** Setelah validasi sukses, Alumni menekan *Floating Action Button (FAB)* bertanda (+) di sudut kanan bawah, atau menekan tombol **"Bagikan Materi"** di Header.
3. **Modal Form CRUED (Create):** Muncul layar sembulan (Modal).
   - Alumni menempelkan tautan sumber (*Paste URL* G-Drive / YouTube / Canva).
   - Alumni melengkapi metadata: Judul, Deskripsi, Mata Pelajaran (*Dropdown*), Jenjang (*Dropdown*).
4. **Submit:** Data divalidasi dan dikirim ke server.
5. **Umpan Balik (Feedback):** Muncul pesan *Toast/Snackbar* sukses ("Materi berhasil dibagikan!"). Materi baru langsung memicu rendering ulang dan muncul di posisi paling atas pada Feed Beranda.

### 2.3. Alur Alumni (User Flow) - Interaksi Sosial
1. **Menemukan:** Alumni berada di Halaman Detail Materi milik orang lain.
2. **Beri Apresiasi:** Alumni menekan ikon 'Hati/Jempol' (Like). Ikon menggunakan transisi *Framer Motion* yang halus untuk berubah warna menjadi terisi. Jumlah hitungan *like* bertambah +1.
3. **Diskusi:** Alumni menggulir ke bawah, mengetik tanggapan di kotak input komentar, lalu menekan ikon "Kirim". Komentar muncul secara instan di atas kotak input tersebut tanpa perlu me-*reload* halaman (*Optimistic UI Update*).

---

## 3. Rencana Tata Letak Layar (Screen Layout / Wireframe Logic)

### 3.1. Halaman Beranda (Home / Feed)
*   **Header (Topbar):** Logo (Kiri), *Search Bar* (Tengah), Tombol 'Bagikan' & Ikon Avatar (Kanan). Pada Mobile, Search Bar pindah ke bawah logo.
*   **Area Filter (Bawah Header):** Sekumpulan *Chips* berbentuk elips (Pills) yang bisa digeser horizontal (Swipeable pada Mobile). Berisi filter cepat (SD, SMP, SMA, SMK).
*   **Main Content (Grid):** Susunan tata letak *masonry* atau baris kartu materi (`<ResourceCard />`). 
    *   **Isi Kartu:** Judul, Lencana (Badge) Jenjang, Nama Pembuat, Ikon Jenis Dokumen, serta penghitung Likes dan Komentar.

### 3.2. Halaman Detail Materi (Resource Detail)
*   **Navigasi:** Tombol melayang kembali ke Beranda (`< Back`).
*   **Bagian Atas (Metadata):** Judul tebal, Avatar pengunggah (Bisa diklik menuju profil), Tanggal unggah, Lencana Tag.
*   **Bagian Tengah (Preview Area):** Area dominan berisi kontainer *Iframe/Embed Viewer* responsif. Jika tautan eksternal dibatasi (private) atau tidak diizinkan di-embed, area ini memunculkan **Fallback UI** (Pesan Error ramah + Tombol "Buka Dokumen di Tab Baru").
*   **Bagian Kanan/Melayang (Panel Aksi):** Kumpulan tombol vertikal atau horizontal di bawah *preview* (Tombol Like, Tombol Bookmark, Tombol Kunjungi Tautan Asli).
*   **Bagian Bawah:** Kolom komentar, tersusun secara hierarki linier.

### 3.3. Halaman Profil (My Profile)
*   **Kartu Profil Atas:** Foto Profil bundar, Nama, Asal Universitas, Angkatan PPG. Terdapat tombol "Edit Profil".
*   **Navigasi Tab:** 
    1. Tab **"Materi Saya"** (Menampilkan yang pernah diunggah).
    2. Tab **"Tersimpan"** (Materi orang lain yang di-*bookmark*).
*   **Manajemen (Update & Delete):** Pada Tab "Materi Saya", setiap kartu materi milik pengguna menampilkan Ikon Pensil (Ubah) dan Ikon Tempat Sampah merah (Hapus/Takedown).

---

## 4. Pedoman Pengalaman Antarmuka (Micro-Interactions)
1. **Indikator Pemuatan (Skeleton UI):** 
   - Selama aplikasi memanggil data dari Supabase, komponen akan menampilkan *Skeleton UI* (kotak abu-abu berkedip halus) alih-alih layar kosong putih (*blank screen*).
2. **Animasi Transisi Halaman:** 
   - Navigasi halaman antar-rute akan memudar perlahan (*fade-in* / *fade-out* singkat) untuk memberikan kesan modern ala aplikasi *Native*.
3. **Desain Ramah Sentuhan (Touch-Friendly):**
   - Pada antarmuka Mobile, semua elemen *call-to-action* dan interaksi (tombol, input, ikon Like) memiliki area sentuh minimal `44x44 pixel` agar jempol pengguna tidak salah klik (sesuai standar HIG).
