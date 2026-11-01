import React, { useState } from 'react';
import { X, UploadCloud, Link as LinkIcon, FileText, Video, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { useAuthStore } from '../../store/useAuthStore';

export const UploadModal = ({ isOpen, onClose, onResourceUploaded }) => {
  const { user, isLoggedIn } = useAuthStore();
  const [activeType, setActiveType] = useState('document'); // document, video, quiz
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    resourceUrl: '',
    educationLevel: 'MI',
    subject: 'PAI',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      setErrorMsg('Anda harus masuk/login terlebih dahulu untuk mengunggah materi.');
      return;
    }

    if (!formData.title || !formData.resourceUrl) {
      setErrorMsg('Judul dan Tautan materi wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([
          {
            user_id: user.id,
            title: formData.title.trim(),
            resource_url: formData.resourceUrl.trim(),
            resource_type: activeType,
            education_level: formData.educationLevel,
            subject: formData.subject,
            description: formData.description.trim(),
          },
        ])
        .select(`
          *,
          users (
            id,
            full_name,
            university,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      if (onResourceUploaded) {
        onResourceUploaded(data);
      }

      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Gagal menyimpan materi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-20 rounded-t-3xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Bagikan Materi Baru</h2>
              <p className="text-sm text-slate-500 mt-1">Isi detail materi agar mudah ditemukan oleh rekan guru.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Body */}
            <div className="p-6 space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* 1. Tipe Materi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Tipe Materi</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveType('document')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      activeType === 'document'
                        ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText size={18} />
                    Dokumen / Modul
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveType('video')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      activeType === 'video'
                        ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Video size={18} />
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveType('quiz')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      activeType === 'quiz'
                        ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <HelpCircle size={18} />
                    Kuis / Lembar Kerja
                  </button>
                </div>
              </div>

              {/* 2. Informasi Materi */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Materi *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Modul Ajar Kurikulum Merdeka - Akidah Akhlak Bab 1"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tautan Materi (URL) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <LinkIcon size={18} />
                    </div>
                    <input 
                      type="url" 
                      name="resourceUrl"
                      value={formData.resourceUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://drive.google.com/... atau https://youtube.com/..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all text-sm"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Masukkan tautan Google Drive publik, YouTube, atau platform pembelajaran lainnya.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkatan *</label>
                    <select 
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white cursor-pointer text-sm"
                    >
                      <option value="RA">RA</option>
                      <option value="MI">MI</option>
                      <option value="MTs">MTs</option>
                      <option value="MA">MA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mata Pelajaran *</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white cursor-pointer text-sm"
                    >
                      <option value="PAI">PAI</option>
                      <option value="Akidah Akhlak">Akidah Akhlak</option>
                      <option value="SKI">SKI</option>
                      <option value="Al Quran Hadits">Al-Qur'an Hadits</option>
                      <option value="Fikih">Fikih</option>
                      <option value="B. Arab">Bahasa Arab</option>
                      <option value="Umum">Umum / Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Singkat</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Jelaskan isi dan sasaran capaian materi ini..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white resize-none text-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-6 flex justify-end gap-3 rounded-b-3xl z-20">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors text-sm"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-sm shadow-primary-600/20 flex items-center gap-2 text-sm"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                Upload Sekarang
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
