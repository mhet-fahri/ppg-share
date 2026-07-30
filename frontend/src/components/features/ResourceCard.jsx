import React from 'react';
import { Heart, MessageCircle, FileText, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const resourceTypeConfig = {
  video: { icon: Video, color: 'text-slate-600 bg-slate-100', label: 'Video' },
  quiz: { icon: HelpCircle, color: 'text-slate-600 bg-slate-100', label: 'Kuis' },
  document: { icon: FileText, color: 'text-slate-600 bg-slate-100', label: 'Dokumen' },
};

export const ResourceCard = ({ resource }) => {
  const { id, title, subject, education_level, resource_type, likes_count, comments_count, author_name, image_url } = resource;
  const config = resourceTypeConfig[resource_type] || resourceTypeConfig.document;
  const { icon: Icon, color } = config;

  return (
    <div className="bg-white border border-slate-200 hover:shadow-card-hover transition-all duration-300 group flex flex-col h-full rounded-2xl shadow-card cursor-pointer hover:-translate-y-1">
      <Link to={`/resource/${id}`} className="flex-1 flex flex-col">
        {/* Top Image Placeholder / Header */}
        <div className="h-32 flex flex-col items-start justify-between p-4 relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-slate-800">
            {image_url && (
              <img src={image_url} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
          <span className="relative z-10 px-2.5 py-1 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-wide rounded shadow-sm">
            {subject}
          </span>
          <div className="relative z-10 flex gap-2">
            <span className="px-2.5 py-1 bg-black/40 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm border border-white/20">
              {education_level}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Icon size={14} className="text-primary-600" />
            {config.label}
          </div>

          <h3 className="font-bold text-lg text-slate-900 line-clamp-3 leading-snug flex-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[9px]">
                {author_name.charAt(0).toUpperCase()}
              </div>
              <span className="truncate max-w-[100px] font-semibold">{author_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                <Heart size={14} /> {likes_count}
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <MessageCircle size={14} /> {comments_count}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
