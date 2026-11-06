import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  BookMarked,
  Layers,
  ArrowRight,
  Shield,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Scale,
  School,
  Baby,
  Scroll,
  FileQuestion,
  Landmark
} from 'lucide-react';
import { InductionModuleCard } from './InductionModuleCard';
import { ModulePreviewModal } from './ModulePreviewModal';

export const OFFICIAL_INDUCTION_MODULES = [
  {
    id: 'modul-akidah-akhlak',
    title: 'Modul Induksi Akidah Akhlak',
    subject: 'Akidah Akhlak',
    level: 'Semua Jenjang',
    category: 'keagamaan',
    description: 'Pendalaman materi ketauhidan, pembinaan akhlak mulia, serta studi kasus moralitas peserta didik madrasah.',
    fileId: '1HfTWixmE6XwLmrd7qC7S-qvEsr3GtFIX',
    viewUrl: 'https://drive.google.com/file/d/1HfTWixmE6XwLmrd7qC7S-qvEsr3GtFIX/view?usp=sharing',
    icon: HeartHandshake,
    theme: {
      accent: 'amber',
      iconBox: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white border-amber-200/80',
      pill: 'bg-amber-50/80 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      hoverBorder: 'hover:border-amber-300',
      topGlow: 'from-amber-500/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-fikih',
    title: 'Modul Induksi Fikih',
    subject: 'Fikih',
    level: 'Semua Jenjang',
    category: 'keagamaan',
    description: 'Kajian komprehensif fikih ibadah, muamalah, ushul fikih, dan strategi pedagogik pembelajaran hukum Islam kontekstual.',
    fileId: '1uNwA7saUYqcOfu9GJ4I13AzwAPh66RnU',
    viewUrl: 'https://drive.google.com/file/d/1uNwA7saUYqcOfu9GJ4I13AzwAPh66RnU/view?usp=sharing',
    icon: Scale,
    theme: {
      accent: 'emerald',
      iconBox: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white border-emerald-200/80',
      pill: 'bg-emerald-50/80 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-300',
      topGlow: 'from-emerald-500/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-gkmi',
    title: 'Modul Induksi Guru Kelas MI',
    subject: 'GKMI',
    level: 'Madrasah Ibtidaiyah',
    category: 'guru-kelas',
    description: 'Penguatan kompetensi pedagogik & materi terpadu tematik (literasi, numerasi, sains) Guru Kelas Madrasah Ibtidaiyah.',
    fileId: '1WWyDQz3zrEQmdAnrXliNdjwrluJaVAuT',
    viewUrl: 'https://drive.google.com/file/d/1WWyDQz3zrEQmdAnrXliNdjwrluJaVAuT/view?usp=sharing',
    icon: School,
    theme: {
      accent: 'blue',
      iconBox: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white border-blue-200/80',
      pill: 'bg-blue-50/80 text-blue-700 border-blue-200',
      dot: 'bg-blue-600',
      hoverBorder: 'hover:border-blue-300',
      topGlow: 'from-blue-600/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-gkra',
    title: 'Modul Induksi Guru Kelas RA',
    subject: 'GKRA',
    level: 'Raudhatul Athfal',
    category: 'guru-kelas',
    description: 'Pedoman stimulasi holistik usia dini, konsep bermain bermakna, pembiasaan islami, dan asesmen tumbuh kembang RA.',
    fileId: '1D7S_3-sdBJhx_f3XpIxFg31p8lKdF_58',
    viewUrl: 'https://drive.google.com/file/d/1D7S_3-sdBJhx_f3XpIxFg31p8lKdF_58/view?usp=sharing',
    icon: Baby,
    theme: {
      accent: 'rose',
      iconBox: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white border-rose-200/80',
      pill: 'bg-rose-50/80 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      hoverBorder: 'hover:border-rose-300',
      topGlow: 'from-rose-500/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-pai',
    title: 'Modul Induksi PAI Terpadu',
    subject: 'PAI',
    level: 'SD / SMP / SMA / SMK',
    category: 'umum',
    description: 'Penguatan profesional & pedagogik guru Pendidikan Agama Islam pada sekolah formal dasar dan menengah berstandar nasional.',
    fileId: '1cy-r9BbOibQdbY8FBuWv-hPPjAo3nnzU',
    viewUrl: 'https://drive.google.com/file/d/1cy-r9BbOibQdbY8FBuWv-hPPjAo3nnzU/view?usp=sharing',
    icon: BookOpen,
    theme: {
      accent: 'cyan',
      iconBox: 'bg-cyan-50 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white border-cyan-200/80',
      pill: 'bg-cyan-50/80 text-cyan-800 border-cyan-200',
      dot: 'bg-cyan-600',
      hoverBorder: 'hover:border-cyan-300',
      topGlow: 'from-cyan-600/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-quran-hadist',
    title: "Modul Induksi Al-Qur'an Hadits",
    subject: "Al Quran Hadits",
    level: 'Semua Jenjang',
    category: 'keagamaan',
    description: "Kaidah ulumul Qur'an, ilmu tajwid, kaidah matan & sanad hadits, serta pendekatan pembelajaran tadabbur ayat suci.",
    fileId: '1M8NtghI7BsP9gUvXgXqFhZqeT7o6hk-q',
    viewUrl: 'https://drive.google.com/file/d/1M8NtghI7BsP9gUvXgXqFhZqeT7o6hk-q/view?usp=sharing',
    icon: Scroll,
    theme: {
      accent: 'teal',
      iconBox: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white border-teal-200/80',
      pill: 'bg-teal-50/80 text-teal-700 border-teal-200',
      dot: 'bg-teal-600',
      hoverBorder: 'hover:border-teal-300',
      topGlow: 'from-teal-600/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-sjt',
    title: 'Modul Induksi SJT (Situational Judgement Test)',
    subject: 'SJT',
    level: 'Uji Kompetensi Guru',
    category: 'kompetensi',
    description: 'Bedah skenario kasus pengambilan keputusan etis, etika profesi guru, manajemen kelas, dan simulasi soal UKPPPG.',
    fileId: '1KbrCK8RQ8ii9ALx9iQWq9VwOJ7SlbZO1',
    viewUrl: 'https://drive.google.com/file/d/1KbrCK8RQ8ii9ALx9iQWq9VwOJ7SlbZO1/view?usp=sharing',
    icon: FileQuestion,
    theme: {
      accent: 'violet',
      iconBox: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white border-violet-200/80',
      pill: 'bg-violet-50/80 text-violet-700 border-violet-200',
      dot: 'bg-violet-600',
      hoverBorder: 'hover:border-violet-300',
      topGlow: 'from-violet-600/20 via-transparent to-transparent',
    }
  },
  {
    id: 'modul-ski',
    title: 'Modul Induksi Sejarah Kebudayaan Islam',
    subject: 'SKI',
    level: 'Semua Jenjang',
    category: 'keagamaan',
    description: 'Kronologi peradaban Islam klasik, masa keemasan daulah, hingga dakwah Walisongo dengan strategi naratif inspiratif.',
    fileId: '1YhsZkYp8PiI3vYmB9JtU_-U_rIbgB1ZK',
    viewUrl: 'https://drive.google.com/file/d/1YhsZkYp8PiI3vYmB9JtU_-U_rIbgB1ZK/view?usp=sharing',
    icon: Landmark,
    theme: {
      accent: 'orange',
      iconBox: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white border-orange-200/80',
      pill: 'bg-orange-50/80 text-orange-700 border-orange-200',
      dot: 'bg-orange-500',
      hoverBorder: 'hover:border-orange-300',
      topGlow: 'from-orange-500/20 via-transparent to-transparent',
    }
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Semua Modul (8)' },
  { id: 'keagamaan', label: 'Mapel Keagamaan' },
  { id: 'guru-kelas', label: 'Guru Kelas (MI & RA)' },
  { id: 'kompetensi', label: 'SJT & Uji Soal' },
  { id: 'umum', label: 'PAI' },
];

export const InductionModulesSection = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = OFFICIAL_INDUCTION_MODULES.filter((item) => {
    const matchCategory = activeTab === 'all' || item.category === activeTab;
    const matchSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="modul-induksi" className="py-20 bg-secondary/60 border-y border-slate-200 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1240px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary-800 text-xs font-semibold mb-3 border border-slate-200 shadow-xs">
              <GraduationCap size={15} className="text-primary-600" />
              <span>Program Penguatan & Persiapan UKPPPG</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Modul Induksi Resmi Alumni PPG
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl leading-relaxed">
              Bahan belajar terkurasi 8 rumpun studi untuk persiapan Uji Pengetahuan (UP), studi kasus SJT, dan referensi mengajar para guru profesional.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xs self-start md:self-auto shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>8 Dokumen Terverifikasi LPTK</span>
          </div>
        </div>

        {/* Filter Tab & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi modul..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Modules Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModules.map((item) => (
            <InductionModuleCard
              key={item.id}
              module={item}
              onPreview={(mod) => setSelectedModule(mod)}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 my-4 shadow-xs">
            <BookMarked size={36} className="mx-auto text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-800">Modul tidak ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
              <BookMarked size={24} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Punya Bahan Uji Soal atau Modul Mandiri?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Berkontribusilah dengan membagikan perangkat pembelajaran Anda kepada rekan guru dan alumni PPG lainnya di seluruh Indonesia.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedModule(OFFICIAL_INDUCTION_MODULES[0])}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm shrink-0 active:scale-[0.98]"
          >
            <span>Mulai Baca Modul Pertama</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>

      {/* Reusable PDF Preview Modal */}
      <ModulePreviewModal
        module={selectedModule}
        isOpen={Boolean(selectedModule)}
        onClose={() => setSelectedModule(null)}
      />
    </section>
  );
};
