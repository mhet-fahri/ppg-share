import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft, Heart, Bookmark, ExternalLink, MessageCircle,
  Send, AlertTriangle, FileText, Video, HelpCircle, User, Calendar, Loader2
} from 'lucide-react';

const getEmbedUrl = (url, type) => {
  if (!url) return null;
  if (type === 'video') {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (url.includes('docs.google.com') || url.includes('drive.google.com')) {
    return url.replace('/view', '/preview').replace('/edit', '/preview');
  }
  if (url.startsWith('/') && (url.endsWith('.pdf') || url.endsWith('.html'))) {
    return url;
  }
  return null;
};

const ResourceIcon = ({ type, size = 20 }) => {
  if (type === 'video') return <Video size={size} className="text-red-500" />;
  if (type === 'quiz') return <HelpCircle size={size} className="text-amber-500" />;
  return <FileText size={size} className="text-primary-500" />;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const ResourceDetailPage = () => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuthStore();
  const [resource, setResource] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Fetch detail resource, comments, & status like
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch resource
        const { data: resData, error: resError } = await supabase
          .from('resources')
          .select(`
            *,
            users (
              id,
              full_name,
              university,
              avatar_url,
              batch_year
            )
          `)
          .eq('id', id)
          .single();

        if (resError) throw resError;
        setResource(resData);

        // 2. Fetch comments
        const { data: comData } = await supabase
          .from('comments')
          .select(`
            *,
            users (
              id,
              full_name,
              avatar_url
            )
          `)
          .eq('resource_id', id)
          .order('created_at', { ascending: true });

        setComments(comData || []);

        // 3. Fetch likes count & check if user liked
        const { data: likesData } = await supabase
          .from('likes')
          .select('id, user_id')
          .eq('resource_id', id);

        const totalLikes = likesData?.length || 0;
        setLikeCount(totalLikes);

        if (user && likesData) {
          const userLiked = likesData.some((l) => l.user_id === user.id);
          setLiked(userLiked);
        }
      } catch (err) {
        console.error('Error fetching resource detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id, user]);

  const handleToggleLike = async () => {
    if (!isLoggedIn || !user) {
      alert('Silakan masuk terlebih dahulu untuk menyukai materi ini.');
      return;
    }

    try {
      if (liked) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('resource_id', id)
          .eq('user_id', user.id);

        setLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // Like
        await supabase
          .from('likes')
          .insert([{ resource_id: id, user_id: user.id }]);

        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!isLoggedIn || !user) {
      alert('Silakan masuk terlebih dahulu untuk memberi komentar.');
      return;
    }

    try {
      setIsSubmittingComment(true);
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            resource_id: id,
            user_id: user.id,
            content: commentText.trim(),
          },
        ])
        .select(`
          *,
          users (
            id,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setComments((prev) => [...prev, data]);
      setCommentText('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Gagal mengirim komentar.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-500">
        <Loader2 size={36} className="animate-spin text-primary-600 mb-2" />
        <p>Memuat materi...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
        <AlertTriangle size={56} strokeWidth={1} />
        <p className="text-xl font-semibold">Materi tidak ditemukan</p>
        <Link to="/" className="text-primary-600 hover:underline">← Kembali ke Beranda</Link>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(resource.resource_url, resource.resource_type);
  const authorName = resource.users?.full_name || 'Alumni PPG';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Tombol Kembali */}
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold mb-6 transition-colors">
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Header Materi */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 font-bold text-xs rounded-lg uppercase tracking-wide">
              {resource.subject}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg uppercase tracking-wide">
              {resource.education_level}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
            {resource.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-900">{authorName}</p>
                <p className="text-xs text-slate-400">{resource.users?.university || 'PPG UIN Jakarta'}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar size={14} />
                {formatDate(resource.created_at)}
              </div>
              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  liked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Heart size={16} className={liked ? 'fill-rose-600 text-rose-600' : ''} />
                {likeCount} Suka
              </button>
            </div>
          </div>
        </div>

        {/* Preview / Embed Box */}
        <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ResourceIcon type={resource.resource_type} />
            Pratinjau Materi
          </h3>

          {embedUrl ? (
            <div className="w-full aspect-video bg-black/5 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                src={embedUrl}
                title={resource.title}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 flex flex-col items-center">
              <p className="text-slate-600 mb-4 text-sm">Pratinjau langsung tidak tersedia untuk format tautan ini.</p>
              <a
                href={resource.resource_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-transform hover:scale-105"
              >
                <ExternalLink size={16} />
                Buka Materi di Tab Baru
              </a>
            </div>
          )}

          {embedUrl && (
            <div className="mt-4 flex justify-end">
              <a
                href={resource.resource_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline"
              >
                <ExternalLink size={14} />
                Buka Tautan Sumber Asli
              </a>
            </div>
          )}
        </div>

        {/* Deskripsi */}
        {resource.description && (
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2">Deskripsi Materi</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {resource.description}
            </p>
          </div>
        )}

        {/* Komentar Section */}
        <div className="p-6 md:p-8">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <MessageCircle size={18} />
            Diskusi & Komentar ({comments.length})
          </h3>

          {/* Form Kirim Komentar */}
          <form onSubmit={handleSendComment} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isLoggedIn ? "Tulis tanggapan atau pertanyaan..." : "Masuk untuk ikut berdiskusi..."}
                disabled={!isLoggedIn}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white text-sm"
              />
              <button
                type="submit"
                disabled={!isLoggedIn || isSubmittingComment || !commentText.trim()}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm"
              >
                {isSubmittingComment ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Kirim
              </button>
            </div>
          </form>

          {/* Daftar Komentar */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs flex-shrink-0">
                    {(c.users?.full_name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">{c.users?.full_name || 'Alumni PPG'}</span>
                      <span className="text-xs text-slate-400">{formatDate(c.created_at)}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{c.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm py-4">Belum ada komentar untuk materi ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
