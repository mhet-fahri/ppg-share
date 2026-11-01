import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Users, Download, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
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
  { icon: Download, title: "Akses Kapan Saja", desc: "Unduh materi untuk referensi mengajar dan pengembangan profesi Anda." }
];

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const urlSubject = searchParams.get('subject');

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('Semua');
  const [activeType, setActiveType] = useState('all');

  const [dbResources, setDbResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data langsung dari database Supabase
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('resources')
          .select(`
            *,
            users (
              id,
              full_name,
              university,
              avatar_url
            ),
            likes (id),
            comments (id)
          `)
          .eq('is_deleted', false)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formatted = data.map((item) => ({
            ...item,
            likes_count: item.likes?.length || 0,
            comments_count: item.comments?.length || 0,
          }));
          setDbResources(formatted);
        } else {
          setDbResources([]);
        }
      } catch (err) {
        console.error('Error fetching resources:', err);
        setDbResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter Logic
  const filteredResources = useMemo(() => {
    return dbResources.filter((resource) => {
      const matchesSearch =
        resource.title?.toLowerCase().includes(search.toLowerCase()) ||
        resource.subject?.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = activeLevel === 'Semua' || resource.education_level === activeLevel;
      const matchesType = activeType === 'all' || resource.resource_type === activeType;

      const effectiveCategory = urlSubject || (activeCategory !== 'all' ? activeCategory : null);
      const matchesSubject = !effectiveCategory || resource.subject === effectiveCategory;

      return matchesSearch && matchesLevel && matchesType && matchesSubject;
    });
  }, [dbResources, search, activeLevel, activeType, activeCategory, urlSubject]);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('/2new-bg.png')] bg-cover bg-top"></div>
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
                  <h4 className="text-3xl font-bold text-white drop-shadow">{dbResources.length}</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">Materi Tersedia</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white drop-shadow">PPG</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">Alumni Guru</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white drop-shadow">FITK</h4>
                  <p className="text-white/90 text-sm font-medium mt-1 drop-shadow">UIN Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORI MATERI SECTION */}
      <section className="py-[100px] bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="text-[40px] font-bold text-[#1A1A1A] mb-4">Jelajahi Materi Terbaik</h2>
            <p className="text-[#666666] text-lg">Pilih kategori mata pelajaran yang ingin Anda pelajari</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 justify-start md:justify-center hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
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

      {/* FILTER & CONTENT SECTION */}
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#666666]">
              <Loader2 size={36} className="animate-spin text-primary-600 mb-2" />
              <p>Memuat materi pembelajaran...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, idx) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#666666]">
              <Search size={48} className="mb-4 opacity-50" />
              <p className="text-xl font-semibold text-[#1A1A1A]">Belum ada materi pembelajaran</p>
              <p className="text-sm mt-1">Jadilah yang pertama membagikan materi perangkat pembelajaran!</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
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
    </div>
  );
};
