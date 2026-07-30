import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const LEVELS = [
  { id: 'RA', title: 'Raudhatul Athfal (RA)', icon: Smile, color: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-100', desc: 'Materi bermain dan belajar untuk siswa setingkat TK.' },
  { id: 'MI', title: 'Madrasah Ibtidaiyah (MI)', icon: BookOpen, color: 'bg-green-50 text-green-600', border: 'border-green-100', desc: 'Materi dasar untuk siswa setingkat SD.' },
  { id: 'MTs', title: 'Madrasah Tsanawiyah (MTs)', icon: School, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', desc: 'Materi lanjutan untuk siswa setingkat SMP.' },
  { id: 'MA', title: 'Madrasah Aliyah (MA)', icon: GraduationCap, color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', desc: 'Materi mendalam untuk siswa setingkat SMA.' }
];

export const LevelsPage = () => {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#071330] to-[#0A2863] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/2new-bg.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md"
            >
              Tingkatan Madrasah
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-sm"
            >
              Temukan materi spesifik untuk setiap jenjang pendidikan di Madrasah.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-secondary flex-1">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEVELS.map((level, idx) => {
              const Icon = level.icon;
              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={`/?level=${encodeURIComponent(level.id)}`}
                    className={`flex flex-col items-center text-center p-10 bg-white rounded-3xl border-2 ${level.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                  >
                    <div className={`w-24 h-24 rounded-full ${level.color} flex items-center justify-center mb-6 shadow-inner`}>
                      <Icon size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{level.title}</h3>
                    <p className="text-[#666666] leading-relaxed mb-6">{level.desc}</p>
                    <span className="mt-auto px-6 py-2.5 bg-gray-50 text-primary-600 font-bold rounded-full text-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      Lihat Materi
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
