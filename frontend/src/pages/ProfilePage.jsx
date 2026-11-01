import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabaseClient';
import { ResourceCard } from '../components/features/ResourceCard';
import { UploadModal } from '../components/features/UploadModal';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { User, BookOpen, Bookmark, GraduationCap, Building2, LogOut, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TABS = ['Materi Saya', 'Tersimpan'];

export const ProfilePage = () => {
  const { isLoggedIn, user, profile, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Materi Saya');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [myResources, setMyResources] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      // 1. Ambil materi yang diupload sendiri
      const { data: myData, error: myError } = await supabase
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
        .eq('user_id', user.id)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (myError) throw myError;

      const formattedMy = (myData || []).map((item) => ({
        ...item,
        likes_count: item.likes?.length || 0,
        comments_count: item.comments?.length || 0,
      }));
      setMyResources(formattedMy);

      // 2. Ambil materi yang disukai / disimpan
      const { data: likedData, error: likedError } = await supabase
        .from('likes')
        .select(`
          resource_id,
          resources:resource_id (
            *,
            users (
              id,
              full_name,
              university,
              avatar_url
            ),
            likes (id),
            comments (id)
          )
        `)
        .eq('user_id', user.id);

      if (likedError) throw likedError;

      const formattedLiked = (likedData || [])
        .map((l) => l.resources)
        .filter((r) => r && !r.is_deleted)
        .map((item) => ({
          ...item,
          likes_count: item.likes?.length || 0,
          comments_count: item.comments?.length || 0,
        }));

      setBookmarkedResources(formattedLiked);
    } catch (err) {
      console.error('Error fetching profile resources:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchUserData();
    }
  }, [isLoggedIn, user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
          <User size={48} className="text-slate-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Anda belum masuk</h2>
          <p className="text-slate-500 mt-1 text-sm">Silakan masuk untuk mengakses halaman profil dan materi Anda.</p>
        </div>
        <Link to="/" className="text-sm font-semibold text-primary-600 hover:underline">
          ← Kembali ke Beranda untuk Masuk
        </Link>
      </div>
    );
  }

  const fullName = profile?.full_name || user?.user_metadata?.full_name || 'Alumni PPG';
  const university = profile?.university || user?.user_metadata?.university || 'UIN Syarif Hidayatullah Jakarta';
  const batchYear = profile?.batch_year || user?.user_metadata?.batch_year || '2025';
  const nim = profile?.nim || user?.user_metadata?.nim || '-';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-5xl mx-auto px-4 py-8"
    >
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-[#0052D4] via-[#4364F7] to-[#6FB1FC] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-4xl font-black text-white shadow-xl flex-shrink-0">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Alumni PPG</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-white">{fullName}</h1>
              <p className="text-blue-100 font-medium text-sm">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Keluar Akun"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-rose-500/80 transition-all text-sm font-semibold text-white shadow-sm"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium">
            <Building2 size={16} className="text-blue-200" />
            <span>{university}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium">
            <GraduationCap size={16} className="text-blue-200" />
            <span>Angkatan {batchYear}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm font-medium">
            <span>NIM: {nim}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'Materi Saya' ? `Materi Saya (${myResources.length})` : `Tersimpan (${bookmarkedResources.length})`}
            </button>
          ))}
        </div>

        <Button 
          variant="primary" 
          onClick={() => setIsUploadModalOpen(true)}
          className="rounded-xl shadow-md shadow-primary-600/20"
        >
          Bagikan Materi Baru
        </Button>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary-600" />
        </div>
      ) : activeTab === 'Materi Saya' ? (
        myResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Belum ada materi yang dibagikan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Bagikan modul, video, atau lembar kerja pertama Anda untuk rekan guru alumni lainnya.
            </p>
          </div>
        )
      ) : (
        bookmarkedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Bookmark size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Belum ada materi tersimpan</h3>
            <p className="text-sm text-slate-500 mt-1">
              Klik ikon suka/like pada materi di beranda untuk menyimpannya di sini.
            </p>
          </div>
        )
      )}

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onResourceUploaded={fetchUserData}
      />
    </motion.div>
  );
};
