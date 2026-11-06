import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Layers } from 'lucide-react';

export const InductionModuleCard = ({ module, onPreview }) => {
  const { title, subject, level, description, viewUrl, icon: IconComponent, theme } = module;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group bg-white rounded-2xl border border-slate-200/90 ${theme.hoverBorder} shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden relative`}
    >
      {/* Dynamic Ambient Top Border Glow on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.topGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Top Header: Distinct Iconic Badge + Subject Pill */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Distinct Colored Icon with Smooth Micro-Interaction */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xs ${theme.iconBox}`}>
            {IconComponent && (
              <IconComponent 
                size={22} 
                className="transition-transform duration-300 group-hover:scale-110" 
              />
            )}
          </div>

          {/* Subject Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${theme.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
            {subject}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-slate-900 group-hover:text-primary-600 transition-colors leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Target Level */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-3">
          <Layers size={13} className="text-slate-400 shrink-0" />
          <span className="truncate">{level}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3 flex-1">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPreview(module)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-all duration-200 shadow-xs active:scale-[0.98]"
        >
          <BookOpen size={14} />
          <span>Buka Modul</span>
        </button>
        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl text-slate-500 hover:text-primary-700 hover:bg-white border border-slate-200 transition-colors flex items-center justify-center shrink-0"
          title="Buka Dokumen di Google Drive"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
};
