import React from 'react';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-20 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors shadow-sm">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="text-xl font-bold text-white leading-none">PPG ShareHub</span>
                <p className="text-xs text-primary-400 font-semibold uppercase tracking-widest leading-none mt-1">UIN Jakarta</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-sm">
              Platform kolaborasi dan berbagi perangkat pembelajaran untuk para Alumni Pendidikan Profesi Guru (PPG) Universitas Islam Negeri Syarif Hidayatullah Jakarta.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-2">Tautan Cepat</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Panduan Penggunaan</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">Kebijakan Privasi</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-2">Kontak Kami</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Jl. Ir H. Juanda No.95, Ciputat, Kota Tangerang Selatan, Banten 15412</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <a href="mailto:info.ppg@uinjkt.ac.id" className="hover:text-primary-400 transition-colors">info.ppg@uinjkt.ac.id</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span>(021) 7401925</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} PPG ShareHub UIN Jakarta. Hak Cipta Dilindungi.</p>
          <p>
            Dibuat dengan <span className="text-red-500 mx-1">❤</span> untuk Pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
