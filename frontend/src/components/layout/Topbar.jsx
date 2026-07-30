import React, { useState } from 'react';
import { Search, User, BookOpen, ChevronDown, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthModal } from '../features/AuthModal';

export const Topbar = ({ onUploadClick }) => {
  const { user, isLoggedIn } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // 'login' or 'register'

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo-uin.png" alt="UIN Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
            <span className="font-bold text-2xl text-primary-600 tracking-tight">PPG ShareHub</span>
          </Link>

          {/* Centered Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[15px] font-medium text-[#666666] hover:text-primary-600 transition-colors">Beranda</Link>
            <Link to="/subjects" className="text-[15px] font-medium text-[#666666] hover:text-primary-600 transition-colors">Mata Pelajaran</Link>
            <Link to="/levels" className="text-[15px] font-medium text-[#666666] hover:text-primary-600 transition-colors">Tingkatan</Link>
            <Link to="/about" className="text-[15px] font-medium text-[#666666] hover:text-primary-600 transition-colors">Tentang</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="text-[#666666] hover:text-primary-600 transition-colors">
              <Search size={20} />
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-xl transition-colors">
                  <span className="text-sm font-semibold text-[#1A1A1A] hidden sm:block">{user?.full_name?.split(' ')[0]}</span>
                  <User size={18} className="text-[#666666]" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openAuth('login')}
                  className="hidden sm:block text-[15px] font-medium text-[#1A1A1A] hover:text-primary-600 transition-colors"
                >
                  Masuk
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="px-6 py-2.5 bg-primary-600 text-white text-[15px] font-semibold rounded-xl hover:bg-primary-700 transition-all hover:scale-105 shadow-sm"
                >
                  Daftar
                </button>
              </div>
            )}
            <button className="md:hidden text-[#666666]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </header>
  );
};
