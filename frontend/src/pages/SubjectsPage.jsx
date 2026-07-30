import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Book, BookMarked, PenTool, Layout, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUBJECTS = [
  { id: 'PAI', title: 'Pendidikan Agama Islam (PAI)', icon: Book, color: 'bg-emerald-50 text-emerald-600', count: 124 },
  { id: 'Akidah Akhlak', title: 'Akidah Akhlak', icon: BookMarked, color: 'bg-blue-50 text-blue-600', count: 86 },
  { id: 'SKI', title: 'Sejarah Kebudayaan Islam', icon: Layers, color: 'bg-amber-50 text-amber-600', count: 92 },
  { id: 'Al Quran Hadits', title: 'Al-Qur\'an Hadits', icon: BookOpen, color: 'bg-purple-50 text-purple-600', count: 115 },
  { id: 'Fikih', title: 'Fikih', icon: Layout, color: 'bg-rose-50 text-rose-600', count: 108 },
  { id: 'B. Arab', title: 'Bahasa Arab', icon: PenTool, color: 'bg-sky-50 text-sky-600', count: 156 }
];

export const SubjectsPage = () => {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#071330] to-[#0A2863] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/2new-bg.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md"
            >
              Mata Pelajaran
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-sm"
            >
              Eksplorasi berbagai perangkat pembelajaran berstandar tinggi yang disusun khusus untuk kurikulum Madrasah, mulai dari PAI hingga Bahasa Arab.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-secondary flex-1">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBJECTS.map((subject, idx) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={`/?subject=${encodeURIComponent(subject.id)}`}
                    className="block group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    
                    <div className={`w-16 h-16 rounded-2xl ${subject.color} flex items-center justify-center mb-6 relative z-10 shadow-inner`}>
                      <Icon size={32} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 relative z-10 group-hover:text-primary-600 transition-colors">
                      {subject.title}
                    </h3>
                    <p className="text-[#666666] font-medium relative z-10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {subject.count} Materi Tersedia
                    </p>
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
