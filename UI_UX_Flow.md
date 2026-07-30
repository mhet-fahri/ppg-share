# 🗺️ UI/UX Flow & Wireframe Plan (V3 - Meta/Apple Style)

**Color Palette:**
- Primary: #1E88E5 (Professional Blue)
- Primary Dark: #1565C0
- Secondary: #F5F7FA (Light Gray Background)
- Accent: #FFD700 (Gold untuk highlights)
- Text Primary: #1A1A1A (Almost Black)
- Text Secondary: #666666 (Medium Gray)
- White: #FFFFFF
- Success: #43A047

**Typography:**
- Font Family: Inter atau Poppins (Sans-serif modern)
- Headline: Bold 700, ukuran 48-64px
- Subheadline: Semibold 600, ukuran 24-32px
- Body: Regular 400, ukuran 16px
- Small: Regular 400, ukuran 14px

**Design Principles:**
- Minimalis & Clean seperti Meta/Apple
- White space yang generous (padding 80-120px per section)
- Maximum content width: 1200px
- Border radius: 8-12px untuk buttons & cards
- Shadow: Subtle box-shadow (0 2px 8px rgba(0,0,0,0.08))
- Gradient: Subtle blue gradient untuk hero background

---

## STRUKTUR HALAMAN (HOME)

**1. NAVIGATION BAR (Sticky Top):**
- Logo: "ShareHub" di kiri (font bold, biru primary)
- Menu Center (maksimal 5 item):
  * Beranda
  * Mata Pelajaran (dropdown)
  * Tingkatan (MI/MTs/MA)
  * Tentang
- Right Side:
  * Search icon (magnifying glass)
  * Button "Masuk" (text link)
  * Button "Daftar" (primary button, biru, rounded)
- Height: 72px
- Background: Putih dengan subtle shadow saat scroll

**2. HERO SECTION (Full Width):**
- Background: Gradient biru lembut (#667eea ke #764ba2) dengan opacity 90%
- Overlay: Background image gedung modern dengan blur effect
- Layout: Two columns (60% text, 40% visual)
- Content Kiri:
  * Badge: "🎓 Platform Alumni PPG UIN Jakarta" (small text, gold)
  * Headline: "Tingkatkan Keterampilan. Majukan Karir Anda." (white, bold 64px)
  * Subheadline: "Akses ribuan perangkat pembelajaran yang dibagikan oleh guru profesional. Mulai jelajahi sekarang." (white, 18px, opacity 90%)
  * Search Bar: Large rounded input (height 56px, radius 12px)
    - Placeholder: "Cari materi pembelajaran..."
    - Button search di kanan (biru, icon only)
  * Stats Row (3 kolom): 
    - "1000+ Materi" 
    - "500+ Guru"
    - "50+ Sekolah"
- Content Kanan:
  * Ilustrasi 3 guru profesional (1 pria berpeci, 2 wanita berhijab)
  * Pose: Professional, tersenyum, memegang buku
  * Style: Modern illustration atau photo cutout dengan shadow
- Padding: 120px vertical
- Height: 90vh minimum

**3. KATEGORI MATERI SECTION:**
- Background: Putih
- Padding: 100px vertical
- Container: Centered, max-width 1200px
- Section Header:
  * Headline: "Jelajahi Materi Terbaik" (centered, 40px, bold)
  * Subtext: "Pilih kategori mata pelajaran yang ingin Anda pelajari" (centered, gray)
- Filter Tabs (Horizontal Scroll):
  * "Semua Mapel" (active, biru)
  * "PAI", "Akidah Akhlak", "SKI", "Al Quran Hadits", "B. Arab", "Lainnya"
- Grid Layout: 3 columns desktop, 2 tablet, 1 mobile
- Category Cards:
  * Background: Putih dengan border 1px #E0E0E0
  * Padding: 32px
  * Border radius: 12px
  * Icon di atas (ukuran 48px, warna biru)
  * Judul kategori (bold, 20px)
  * Jumlah materi (small, gray, contoh: "124 Materi")
  * Hover effect: Lift up dengan shadow

**4. FILTER & CONTENT SECTION:**
- Background: #F5F7FA (Light Gray)
- Padding: 100px vertical
- Filter Bar (Sticky):
  * Dropdown: "Semua Tingkatan" (MI, MTs, MA)
  * Dropdown: "Semua Tipe" (Dokumen, Video, Kuis)
  * Sort: "Terbaru" / "Terpopuler"
  * Search input kecil di kanan
- Content Grid:
  * Layout: Masonry atau Grid 3 columns
  * Material Cards:
    - Thumbnail image di atas (aspect ratio 16:9)
    - Badge tipe (Video/Dokumen/Kuis) di pojok kanan atas thumbnail
    - Judul materi (bold, 18px, 2 lines max)
    - Info: Nama guru + sekolah (small, gray)
    - Meta: Tanggal upload, jumlah download
    - Rating stars (jika ada)
    - Button "Unduh" atau "Lihat" (outline biru)

**5. FEATURES SECTION:**
- Background: Putih
- Padding: 100px vertical
- Layout: 3 kolom features
- Feature Cards:
  * Icon besar (64px, biru dengan background circle)
  * Judul (bold, 24px)
  * Deskripsi (gray, 16px, 3-4 kalimat)

**6. TESTIMONIAL SECTION:**
- Background: Gradient biru lembut
- Padding: 100px vertical
- Headline: "Apa Kata Mereka?" (centered, white)
- Testimonial Cards (Slider/Carousel):
  * Background: Putih, Padding: 40px, Border radius: 16px

**7. CTA SECTION:**
- Background: Primary Blue (#1E88E5)
- Padding: 100px vertical
- Layout: Centered
- Headline: "Siap Berbagi Ilmu?" (white, bold, 48px)
- Buttons Row: "Daftar Sekarang" & "Pelajari Lebih Lanjut"

**8. FOOTER:**
- Background: #1A1A1A (Dark)
- Padding: 80px vertical
- Layout: 4 columns

---

## INTERAKSI & ANIMASI
- Smooth scroll behavior
- Hover effects pada semua buttons (scale 1.02, transition 0.3s)
- Fade-in animation saat scroll untuk setiap section
- Loading skeleton untuk cards
- Dropdown menu dengan slide animation
- Search bar expand on focus

## RESPONSIVE DESIGN
- Mobile First Approach
- Breakpoints:
  * Mobile: < 640px (1 column)
  * Tablet: 640-1024px (2 columns)
  * Desktop: > 1024px (3-4 columns)
- Hamburger menu untuk mobile navigation
- Touch-friendly buttons (min height 44px)

## AKSESIBILITAS & PERFORMANCE
- WCAG 2.1 AA compliant, Color contrast ratio minimal 4.5:1
- Keyboard navigation support, Focus states yang jelas
- Lazy loading images, Optimized images (WebP format), Minified CSS/JS
- Fast loading < 3 detik

## INSPIRASI DESIGN & CATATAN
- Meta.com, Apple.com, Notion.so, Linear.app
- Hindari clutter dan informasi berlebihan
- Fokus pada 1 primary action per section
- Tone: Professional namun approachable, modern, trustworthy
