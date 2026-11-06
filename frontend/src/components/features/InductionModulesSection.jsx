import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ExternalLink, 
  Eye, 
  Download, 
  X, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const OFFICIAL_INDUCTION_MODULES = [
  {
    id: 'modul-akidah-akhlak',
    title: 'Modul Induksi Akidah Akhlak',
    subject: 'Akidah Akhlak',
    level: 'Semua Jenjang',
    badge: 'Akidah Akhlak',
    accentColor: 'from-amber-500/20 to-orange-500/10 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    description: 'Pedoman pendalaman materi esensial akidah akhlak, konsep ketuhanan, adab islami, serta pendekatan pedagogik guru madrasah.',
    fileId: '1HfTWixmE6XwLmrd7qC7S-qvEsr3GtFIX',
    viewUrl: 'https://drive.google.com/file/d/1HfTWixmE6XwLmrd7qC7S-qvEsr3GtFIX/view?usp=sharing',
  },
  {
    id: 'modul-fikih',
    title: 'Modul Induksi Fikih',
    subject: 'Fikih',
    level: 'Semua Jenjang',
    badge: 'Fikih',
    accentColor: 'from-emerald-500/20 to-teal-500/10 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    description: 'Kajian komprehensif fikih ibadah, muamalah, ushul fikih, serta strategi kontekstualisasi fiqih masa kini dalam pembelajaran.',
    fileId: '1uNwA7saUYqcOfu9GJ4I13AzwAPh66RnU',
    viewUrl: 'https://drive.google.com/file/d/1uNwA7saUYqcOfu9GJ4I13AzwAPh66RnU/view?usp=sharing',
  },
  {
    id: 'modul-gkmi',
    title: 'Modul Induksi GKMI',
    subject: 'GKMI',
    level: 'Madrasah Ibtidaiyah',
    badge: 'Guru Kelas MI',
    accentColor: 'from-blue-500/20 to-indigo-500/10 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-100 text-blue-700',
    description: 'Modul profesional & pedagogik terpadu khusus Guru Kelas MI mencakup literasi, numerasi, sains tematik, dan karakter siswa dasar.',
    fileId: '1WWyDQz3zrEQmdAnrXliNdjwrluJaVAuT',
    viewUrl: 'https://drive.google.com/file/d/1WWyDQz3zrEQmdAnrXliNdjwrluJaVAuT/view?usp=sharing',
  },
  {
    id: 'modul-gkra',
    title: 'Modul Induksi GKRA',
    subject: 'GKRA',
    level: 'Raudhatul Athfal',
    badge: 'Guru Kelas RA',
    accentColor: 'from-pink-500/20 to-rose-500/10 text-pink-700 border-pink-200',
    iconBg: 'bg-pink-100 text-pink-700',
    description: 'Pendekatan pembelajaran anak usia dini berbasis bermain bermakna, stimulasi motorik, akhlak dini, dan asesmen tumbuh kembang RA.',
    fileId: '1D7S_3-sdBJhx_f3XpIxFg31p8lKdF_58',
    viewUrl: 'https://drive.google.com/file/d/1D7S_3-sdBJhx_f3XpIxFg31p8lKdF_58/view?usp=sharing',
  },
  {
    id: 'modul-pai',
    title: 'Modul Induksi PAI',
    subject: 'PAI',
    level: 'SD / SMP / SMA / SMK',
    badge: 'PAI Terpadu',
    accentColor: 'from-cyan-500/20 to-sky-500/10 text-cyan-700 border-cyan-200',
    iconBg: 'bg-cyan-100 text-cyan-700',
    description: 'Penguatan kompetensi guru Pendidikan Agama Islam lintas satuan pendidikan dasar & menengah berstandar kurikulum nasional.',
    fileId: '1cy-r9BbOibQdbY8FBuWv-hPPjAo3nnzU',
    viewUrl: 'https://drive.google.com/file/d/1cy-r9BbOibQdbY8FBuWv-hPPjAo3nnzU/view?usp=sharing',
  },
  {
    id: 'modul-quran-hadist',
    title: "Modul Induksi Qur'an Hadist",
    subject: "Al Quran Hadits",
    level: 'Semua Jenjang',
    badge: "Qur'an Hadits",
    accentColor: 'from-teal-500/20 to-emerald-500/10 text-teal-700 border-teal-200',
    iconBg: 'bg-teal-100 text-teal-700',
    description: 'Kaidah ilmu tajwid, ulumul Qur\'an, takhrij hadits dasar, serta metodologi pembelajaran tadabbur ayat di madrasah.',
    fileId: '1M8NtghI7BsP9gUvXgXqFhZqeT7o6hk-q',
    viewUrl: 'https://drive.google.com/file/d/1M8NtghI7BsP9gUvXgXqFhZqeT7o6hk-q/view?usp=sharing',
  },
  {
    id: 'modul-sjt',
    title: 'Modul Induksi SJT (Situational Judgement Test)',
    subject: 'SJT',
    level: 'Uji Kompetensi Guru',
    badge: 'Studi Kasus & SJT',
    accentColor: 'from-violet-500/20 to-purple-500/10 text-violet-700 border-violet-200',
    iconBg: 'bg-violet-100 text-violet-700',
    description: 'Bedah soal & skenario kasus pengambilan keputusan etis, dilema moralitas kelas, relasi wali murid, dan kepemimpinan guru.',
    fileId: '1KbrCK8RQ8ii9ALx9iQWq9VwOJ7SlbZO1',
    viewUrl: 'https://drive.google.com/file/d/1KbrCK8RQ8ii9ALx9iQWq9VwOJ7SlbZO1/view?usp=sharing',
  },
  {
    id: 'modul-ski',
    title: 'Modul Induksi SKI',
    subject: 'SKI',
    level: 'Semua Jenjang',
    badge: 'Sejarah Kebudayaan Islam',
    accentColor: 'from-amber-600/20 to-yellow-500/10 text-amber-800 border-amber-300',
    iconBg: 'bg-yellow-100 text-amber-800',
    description: 'Substansi kronik sejarah Islam klasik hingga perkembangan Islam di Nusantara, dipadukan teknik pengajaran naratif inspiratif.',
    fileId: '1YhsZkYp8PiI3vYmB9JtU_-U_rIbgB1ZK',
    viewUrl: 'https://drive.google.com/file/d/1YhsZkYp8PiI3vYmB9JtU_-U_rIbgB1ZK/view?usp=sharing',
  },
];

export const InductionModulesSection = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const openPreview = (module) => {
    setSelectedModule(module);
  };

  const closePreview = () => {
    setSelectedModule(null);
  };

  return (
    <section id="modul-induksi" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1240px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-3">
              <Sparkles size={14} className="text-primary-600" />
              <span>Bahan Belajar Resmi Alumni PPG</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Modul Induksi & Pendalaman Materi PPG
            </h2>
            <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
              Koleksi modul resmi 8 bidang studi untuk bekal persiapan Uji Kompetensi Peserta PPG (UKPPPG), Situational Judgement Test (SJT), serta pengayaan perangkat mengajar mandiri.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-medium">
              <CheckCircle2 size={16} />
              <span>Akses Bebas Semua Guru & Alumni</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFICIAL_INDUCTION_MODULES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-primary-400 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-inner ${item.iconBg}`}>
                    <FileText size={24} />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${item.accentColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
                  <GraduationCap size={14} className="text-slate-400" />
                  <span>{item.level}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openPreview(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
                  title="Baca langsung di website"
                >
                  <Eye size={14} />
                  <span>Baca PDF</span>
                </button>
                <a
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-500 hover:text-primary-700 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center"
                  title="Buka di Google Drive / Unduh"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Info */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start md:items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md hidden sm:flex">
              <BookOpen size={28} className="text-accent" />
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold">Siap Mengikuti Uji Pengetahuan (UP) & UKPPPG?</h4>
              <p className="text-white/80 text-sm mt-1">
                Gunakan modul ini sebagai bahan diskusi MGMP atau kelompok belajar alumni guru. Semua dokumen tersimpan di cloud siap unduh kapan saja.
              </p>
            </div>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1HfTWixmE6XwLmrd7qC7S-qvEsr3GtFIX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              // Open first doc if folder direct link is not public
              e.preventDefault();
              openPreview(OFFICIAL_INDUCTION_MODULES[0]);
            }}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-accent text-slate-950 font-semibold text-sm hover:bg-yellow-400 transition-colors shadow-md flex items-center gap-2"
          >
            <Eye size={16} />
            Mulai Belajar Sekarang
          </a>
        </div>
      </div>

      {/* PDF PREVIEW MODAL */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-primary-600 rounded-lg shrink-0">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-white truncate">
                      {selectedModule.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      Mapel: {selectedModule.subject} • {selectedModule.level}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={selectedModule.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Buka di Drive</span>
                  </a>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Tutup Preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body / Embedded PDF Viewer */}
              <div className="flex-1 bg-slate-100 relative">
                <iframe
                  src={`https://drive.google.com/file/d/${selectedModule.fileId}/preview`}
                  title={selectedModule.title}
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Preview interaktif terhubung langsung ke Google Drive Cloud Storage.</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedModule.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    Unduh file lengkap (.pdf)
                    <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={closePreview}
                    className="px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 font-medium text-slate-800 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

