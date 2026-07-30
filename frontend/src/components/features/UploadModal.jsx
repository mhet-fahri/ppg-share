import React, { useState } from 'react';
import { X, UploadCloud, Link as LinkIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadModal = ({ isOpen, onClose }) => {
  const [activeType, setActiveType] = useState('document'); // document, video, link

  if (!isOpen) return null;

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
              <p className="text-sm text-slate-500 mt-1">Isi detail materi agar mudah ditemukan oleh guru lain.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8">
            {/* 1. Tipe Materi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tipe Materi</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveType('document')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeType === 'document' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-slate-200 hover:border-primary-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <FileText size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Dokumen/PDF</span>
                </button>
                <button
                  onClick={() => setActiveType('video')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeType === 'video' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-slate-200 hover:border-primary-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <UploadCloud size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Video</span>
                </button>
                <button
                  onClick={() => setActiveType('link')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeType === 'link' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-slate-200 hover:border-primary-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <LinkIcon size={24} className="mb-2" />
                  <span className="font-semibold text-sm">Tautan Web</span>
                </button>
              </div>
            </div>

            {/* 2. Upload / Input Area */}
            {activeType === 'document' || activeType === 'video' ? (
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 hover:border-primary-300 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} className="text-primary-500" />
                </div>
                <h3 className="font-bold text-slate-700 mb-1">Klik untuk memilih file</h3>
                <p className="text-sm text-slate-500">atau tarik dan lepas file di sini</p>
                <p className="text-xs text-slate-400 mt-4">Maks. ukuran 50MB (PDF, DOCX, MP4)</p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tautan URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                />
              </div>
            )}

            {/* 3. Detail Info */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Materi *</label>
                <input 
                  type="text" 
                  placeholder="Contoh: RPP Akidah Akhlak Kelas 10"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkatan *</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white cursor-pointer appearance-none">
                    <option value="">Pilih Tingkatan</option>
                    <option value="RA">RA</option>
                    <option value="MI">MI</option>
                    <option value="MTs">MTs</option>
                    <option value="MA">MA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mata Pelajaran *</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white cursor-pointer appearance-none">
                    <option value="">Pilih Mapel</option>
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
                  rows="3"
                  placeholder="Jelaskan isi materi secara singkat..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-slate-50 focus:bg-white resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-6 flex justify-end gap-3 rounded-b-3xl z-20">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-transform hover:scale-105 shadow-sm shadow-primary-600/20"
            >
              Upload Sekarang
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
