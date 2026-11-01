import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Heart } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-[#071330] to-[#0A2863] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/2new-bg.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md"
            >
              Tentang Belajar Guru
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-sm"
            >
              Komunitas berbagi materi dan RPP terbaik oleh dan untuk guru Madrasah di bawah naungan PPG FITK UIN Jakarta.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Misi Kami</h2>
              <p className="text-lg text-[#666666] leading-relaxed">
                Meningkatkan kualitas pendidikan madrasah melalui kolaborasi dan akses mudah ke bahan ajar yang inovatif dan sesuai kurikulum terbaru.
              </p>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center gap-4 text-[#1A1A1A] font-medium">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-600">
                    <Target size={20} />
                  </div>
                  Menyediakan platform yang mudah digunakan.
                </li>
                <li className="flex items-center gap-4 text-[#1A1A1A] font-medium">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Users size={20} />
                  </div>
                  Membangun komunitas guru yang solid.
                </li>
                <li className="flex items-center gap-4 text-[#1A1A1A] font-medium">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <Heart size={20} />
                  </div>
                  Mendorong semangat berbagi kebaikan.
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/foto1.png" 
                  alt="Guru Berkolaborasi" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <Shield className="text-primary-600 w-12 h-12" />
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">Terverifikasi</h4>
                  <p className="text-sm text-[#666666]">Oleh Tim Ahli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
