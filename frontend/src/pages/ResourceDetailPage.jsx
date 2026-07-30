import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockResources, mockComments } from '../lib/mockData';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, Bookmark, ExternalLink, MessageCircle,
  Send, AlertTriangle, FileText, Video, HelpCircle, User, Calendar
} from 'lucide-react';

const getEmbedUrl = (url, type) => {
  if (type === 'video') {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (url.includes('docs.google.com') || url.includes('drive.google.com')) {
    // Convert Google Drive/Docs link to embed
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
  return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const ResourceDetailPage = () => {
  const { id } = useParams();
  const { isLoggedIn, user, login } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState(
    mockComments.filter((c) => c.resource_id === id)
  );

  const resource = mockResources.find((r) => r.id === id);

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
  const likesTotal = resource.likes_count + (liked ? 1 : 0);

  const handleInteraction = (action) => {
    if (!isLoggedIn) {
      alert('Fitur ini hanya untuk Alumni PPG yang telah login.\n\n[Demo: Klik OK untuk simulasi login]');
      login();
      return;
    }
    action();
  };

  const handleSendComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      resource_id: id,
      user_name: user?.full_name || 'Alumni',
      content: comment,
      created_at: new Date().toISOString(),
    };
    setLocalComments((prev) => [newComment, ...prev]);
    setComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium w-fit">
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>

      {/* Metadata Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full">
              {resource.education_level}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
              {resource.subject}
            </span>
          </div>
          <ResourceIcon type={resource.resource_type} size={24} />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 leading-snug">{resource.title}</h1>
        <p className="text-slate-500 text-sm leading-relaxed">{resource.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
              {resource.author_name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{resource.author_name}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={11} /> {formatDate(resource.created_at)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleInteraction(() => setLiked(!liked))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                liked
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              <span>{likesTotal}</span>
            </button>
            <button
              onClick={() => handleInteraction(() => setBookmarked(!bookmarked))}
              className={`p-2 rounded-full border text-sm transition-all ${
                bookmarked
                  ? 'bg-primary-50 border-primary-300 text-primary-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
              }`}
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <a
              href={resource.resource_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary-400 hover:text-primary-600 transition-all bg-white"
            >
              <ExternalLink size={16} />
              Buka Asli
            </a>
          </div>
        </div>
      </div>

      {/* Embed / Preview Area */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <ResourceIcon type={resource.resource_type} />
          <span className="font-semibold text-slate-700">Pratinjau Materi</span>
        </div>

        {!embedError && embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: resource.resource_type === 'video' ? '56.25%' : '75%' }}>
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setEmbedError(true)}
            />
          </div>
        ) : (
          /* Fallback UI */
          <div className="flex flex-col items-center justify-center py-20 gap-5 bg-slate-50">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="text-amber-500" size={40} />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-700">Pratinjau tidak dapat dimuat</p>
              <p className="text-sm text-slate-500 mt-1 max-w-xs">
                Dokumen mungkin bersifat privat atau tidak mendukung tampilan di dalam web.
              </p>
            </div>
            <a
              href={resource.resource_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">
                <ExternalLink size={16} className="mr-2" />
                Buka Dokumen di Tab Baru
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Comment Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <MessageCircle size={20} className="text-primary-500" />
          Diskusi ({localComments.length})
        </h2>

        {/* Comment Input */}
        <div
          onClick={() => { if (!isLoggedIn) { alert('Login terlebih dahulu untuk berkomentar.\n\n[Demo: Klik OK untuk simulasi login]'); login(); } }}
          className="flex items-start gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
            <User size={16} className="text-slate-500" />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendComment(); }}
              placeholder={isLoggedIn ? 'Tulis komentar atau pertanyaan...' : 'Login untuk berkomentar...'}
              disabled={!isLoggedIn}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            />
            <button
              onClick={() => handleInteraction(handleSendComment)}
              disabled={!isLoggedIn || !comment.trim()}
              className="p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Comment List */}
        <div className="flex flex-col gap-4">
          {localComments.length > 0 ? (
            localComments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-sm">
                  {c.user_name.charAt(0)}
                </div>
                <div className="flex-1 bg-slate-50 rounded-2xl px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">{c.user_name}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{c.content}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{formatDate(c.created_at)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 text-sm py-6">Belum ada komentar. Jadilah yang pertama!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
