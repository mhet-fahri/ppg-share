import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Video, HelpCircle, Download, Star, Users, Book, ArrowRight, MessageSquare, Quote, User } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockResources } from '../lib/mockData';
import { ResourceCard } from '../components/features/ResourceCard';

const CATEGORIES = [
  { id: 'all', label: 'Semua Mapel' },
  { id: 'PAI', label: 'PAI' },
  { id: 'Akidah Akhlak', label: 'Akidah Akhlak' },
  { id: 'SKI', label: 'SKI' },
  { id: 'Al Quran Hadits', label: 'Al Quran Hadits' },
  { id: 'B. Arab', label: 'B. Arab' },
];

const FEATURES = [
  { icon: Book, title: "Ribuan Materi", desc: "Akses perangkat pembelajaran lengkap dari berbagai jenjang dan mata pelajaran." },
  { icon: Users, title: "Dari Guru Profesional", desc: "Konten berkualitas yang disusun dan dibagikan langsung oleh para praktisi pendidikan." },
  { icon: Download, title: "Akses Kapan Saja", desc: "Unduh materi untuk penggunaan offline dan simpan untuk referensi mengajar Anda." }
];

const TESTIMONIALS = [
  { name: "Siti Rahayu", school: "MIN Jakarta", text: "Platform ini sangat membantu saya menemukan referensi RPP Kurikulum Merdeka yang tepat.", avatar: "https://images.unsplash.com/photo-1594608661623-aa0bd3a0c1ea?q=80&w=150&auto=format&fit=crop" },
  { name: "Ahmad Fauzi", school: "MTsN Jakarta", text: "Materi SKI dan Bahasa Arab di sini sangat lengkap. Memudahkan persiapan mengajar setiap minggu.", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" },
  { name: "Dewi Ananda", school: "MAN Jakarta", text: "Komunitas guru yang luar biasa. Saya banyak belajar dari materi-materi yang dibagikan rekan sejawat.", avatar: "https://images.unsplash.com/photo-1588075592446-265fd1e6e761?q=80&w=150&auto=format&fit=crop" }
];

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const urlSubject = searchParams.get('subject');

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [activeType, setActiveType] = useState('all');

  // Filter Logic
  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.subject.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = activeLevel === 'Semua' || resource.education_level === activeLevel;
      const matchesType = activeType === 'all' || resource.resource_type === activeType;

      const effectiveCategory = urlSubject || (activeCategory !== 'all' ? activeCategory : null);
      const matchesSubject = !effectiveCategory || resource.subject === effectiveCategory;

      return matchesSearch && matchesLevel && matchesType && matchesSubject;
    });
  }, [search, activeLevel, activeType, activeCategory, urlSubject]);

  return (
    <div className="flex flex-col w-full bg-white">

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('/2new-bg.png')] bg-cover bg-top"></div>
        {/* Gradient that is dark on the left for text readability, and transparent on the right so the teachers are visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071330]/80 via-[#0A2863]/50 to-transparent"></div>

        <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">

            {/* Content */}
            <div className="flex flex-col gap-6 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/20 backdrop-blur-md w-fit">
                <span className="text-accent font-semibold text-sm tracking-wide">🎓 Platform Alumni PPG FITK UIN Jakarta</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight drop-shadow-md text-white">
                Berkontribusi<br />Demi Pendidikan Berdampak.
              </h1>

              <p className="text-lg md:text-xl font-medium text-white/90 max-w-xl leading-relaxed drop-shadow-sm text-white">
                Akses berbagai perangkat pembelajaran yang dibagikan oleh guru profesional.
              </p>

              {/* Search Bar */}
              <div className="flex items-center w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden h-14 mt-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari materi pembelajaran..."
                  className="flex-1 px-5 py-3 bg-transparent outline-none text-[#1A1A1A] text-base placeholder:text-[#666666] font-medium"
                />
                <button className="px-6 h-full bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <Search size={24} />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20">
                <div>
                  <h4 className="text-3xl font-bold text-white drop-shadow">1000+</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">Materi</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white drop-shadow">500+</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">Guru</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white drop-shadow">50+</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">Sekolah</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KATEGORI MATERI SECTION */}
      <section className="py-[100px] bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="text-[40px] font-bold text-[#1A1A1A] mb-4">Jelajahi Materi Terbaik</h2>
            <p className="text-[#666666] text-lg">Pilih kategori mata pelajaran yang ingin Anda pelajari</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 justify-start md:justify-center hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-secondary text-[#666666] hover:bg-gray-200'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FILTER & CONTENT SECTION */}
      <section className="py-[100px] bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">

          {/* Sticky Filter Bar */}
          <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border border-gray-200 p-4 rounded-xl shadow-sm mb-10 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value)}
                className="bg-secondary border-none text-[#1A1A1A] text-sm font-semibold py-2 px-4 rounded-lg outline-none cursor-pointer"
              >
                <option value="Semua">Semua Tingkatan</option>
                <option value="RA">RA</option>
                <option value="MI">MI</option>
                <option value="MTs">MTs</option>
                <option value="MA">MA</option>
              </select>

              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="bg-secondary border-none text-[#1A1A1A] text-sm font-semibold py-2 px-4 rounded-lg outline-none cursor-pointer"
              >
                <option value="all">Semua Tipe</option>
                <option value="document">Dokumen</option>
                <option value="video">Video</option>
                <option value="quiz">Kuis</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#666666] hidden sm:block">Urutkan:</span>
              <select className="bg-transparent border-none text-primary-600 text-sm font-bold outline-none cursor-pointer">
                <option>Terbaru</option>
                <option>Terpopuler</option>
              </select>
            </div>
          </div>

          {/* Content Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, idx) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#666666]">
              <Search size={48} className="mb-4 opacity-50" />
              <p className="text-xl font-semibold text-[#1A1A1A]">Materi tidak ditemukan</p>
              <p>Coba ubah kata kunci atau filter Anda.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section className="py-[100px] bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    <Icon size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{feat.title}</h3>
                  <p className="text-[#666666] text-base leading-relaxed max-w-sm">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL SECTION */}
      <section className="py-[100px] bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <h2 className="text-[40px] font-bold text-[#1A1A1A] text-center mb-16">Apa Kata Mereka?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Quote size={40} className="text-primary-100 mb-6" />
                <p className="text-lg italic text-[#666666] mb-8 min-h-[80px]">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A]">{testi.name}</h4>
                    <p className="text-sm text-[#666666]">{testi.school}</p>
                    <div className="flex text-accent mt-1">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-[100px] bg-primary-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Berbagi Ilmu?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Bergabunglah dengan ribuan guru lainnya dan mulai berbagi materi pembelajaran Anda untuk memajukan pendidikan madrasah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
              Daftar Sekarang
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
