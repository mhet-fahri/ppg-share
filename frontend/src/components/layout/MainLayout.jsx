import React, { useState } from 'react';
import { Topbar } from './Topbar';
import { UploadModal } from '../features/UploadModal';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const MainLayout = ({ children }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-secondary">


      <Topbar onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="flex-1 w-full">
        {children || <Outlet />}
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* V3 FOOTER */}
      <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Column 1 */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo-uin.png" alt="UIN Logo" className="w-8 h-8 object-contain" />
                <h3 className="text-2xl font-bold text-primary-500 tracking-tight">ShareHub</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Platform berbagi materi dan perangkat pembelajaran untuk komunitas alumni Pendidikan Profesi Guru (PPG) UIN Jakarta.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Platform</h4>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mata Pelajaran</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Peringkat Guru</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Komunitas</h4>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Forum Diskusi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Panduan Kontribusi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Grup Telegram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog & Artikel</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lisensi Konten</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} PPG ShareHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
