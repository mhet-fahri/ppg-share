import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { mockResources } from '../lib/mockData';
import { ResourceCard } from '../components/features/ResourceCard';
import { UploadModal } from '../components/features/UploadModal';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { User, BookOpen, Bookmark, Settings, GraduationCap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = ['Materi Saya', 'Tersimpan'];

export const ProfilePage = () => {
  const { isLoggedIn, user, login, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Materi Saya');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter materi milik user yang login
  const myResources = mockResources.filter(
    (r) => r.author_id === (user?.id || 'user-1')
  );

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
          <User size={48} className="text-slate-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Anda belum login</h2>
          <p className="text-slate-500 mt-1 text-sm">Silakan login untuk mengakses halaman profil Anda.</p>
        </div>
        <Button variant="primary" onClick={login}>
          Login sebagai Alumni (Demo)
        </Button>
        <Link to="/" className="text-sm text-slate-500 hover:text-primary-600">← Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-4xl mx-auto"
    >
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
        <div className="opacity-5 absolute right-4 bottom-4 pointer-events-none">
          <GraduationCap size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-4xl font-black text-white shadow-xl flex-shrink-0">
              {user.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Alumni PPG</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-white">{user.full_name}</h1>
              <p className="text-blue-100 font-medium">{user.email}</p>
            </div>
          </div>
          <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all shadow-sm group">
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-black/20 transition-colors cursor-default">
            <Building2 size={16} className="text-blue-200" />
            <span>{user.university}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-black/20 transition-colors cursor-default">
            <GraduationCap size={16} className="text-blue-200" />
            <span>Angkatan {user.batch_year}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-black/20 transition-colors cursor-default">
            <User size={16} className="text-blue-200" />
            <span>NIM: {user.nim}</span>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-3 px-4 md:px-6 max-w-2xl">
          <div className="text-center flex-1">
            <p className="text-2xl font-black">{myResources.length}</p>
            <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider mt-0.5">Materi</p>
          </div>
          <div className="w-px bg-white/20 h-8" />
          <div className="text-center flex-1">
            <p className="text-2xl font-black">{myResources.reduce((acc, r) => acc + r.likes_count, 0)}</p>
            <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider mt-0.5">Likes</p>
          </div>
          <div className="w-px bg-white/20 h-8" />
          <div className="text-center flex-1">
            <p className="text-2xl font-black">{myResources.reduce((acc, r) => acc + r.comments_count, 0)}</p>
            <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider mt-0.5">Komentar</p>
          </div>
        </div>
      </div>

      {/* Controls: Tabs & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'Materi Saya' ? <BookOpen size={16} /> : <Bookmark size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Upload Button */}
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm shadow-primary-600/30 w-full sm:w-auto group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Upload Materi
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'Materi Saya' && (
        <div>
          {myResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myResources.map((resource, idx) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="relative group"
                >
                  <ResourceCard resource={resource} />
                  {/* Edit / Delete overlay actions */}
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors text-xs font-semibold">
                      Edit
                    </button>
                    <button className="p-1.5 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-50 text-red-500 transition-colors text-xs font-semibold">
                      Hapus
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <BookOpen size={48} strokeWidth={1} className="mx-auto mb-3" />
              <p>Belum ada materi yang dibagikan.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Tersimpan' && (
        <div className="text-center py-20 text-slate-400">
          <Bookmark size={48} strokeWidth={1} className="mx-auto mb-3" />
          <p>Belum ada materi yang disimpan.</p>
          <Link to="/" className="mt-3 text-sm text-primary-600 hover:underline block">
            Jelajahi materi di Beranda →
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="border-t border-slate-100 pt-4 flex justify-end">
        <Button variant="ghost" onClick={logout} className="text-red-500 hover:bg-red-50">
          Keluar (Logout)
        </Button>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </motion.div>
  );
};
