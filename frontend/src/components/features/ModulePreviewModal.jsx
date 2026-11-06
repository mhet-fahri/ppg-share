import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';

export const ModulePreviewModal = ({ module, isOpen, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !module) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window (Max rounded-2xl) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden border border-slate-200 z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
                <FileText size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base text-slate-900 truncate">
                  {module.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                    {module.subject}
                  </span>
                  <span>•</span>
                  <span>{module.level}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={module.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Download size={14} />
                <span>Unduh Dokumen</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Tutup Pratinjau"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body Viewer */}
          <div className="flex-1 bg-slate-100 relative">
            <iframe
              src={`https://drive.google.com/file/d/${module.fileId}/preview`}
              title={module.title}
              className="w-full h-full border-0"
              allow="autoplay"
            />
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Dokumen resmi terverifikasi LPTK FITK UIN Syarif Hidayatullah Jakarta</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={module.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-semibold inline-flex items-center gap-1"
              >
                Buka di Google Drive
                <ExternalLink size={12} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
