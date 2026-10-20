import React from 'react';
import { X, Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';

export const NewsDetailModal: React.FC = () => {
  const { selectedNewsId, setSelectedNewsId, news } = useMuayThai();

  if (!selectedNewsId) return null;

  const article = news.find(n => n.id === selectedNewsId);
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={() => setSelectedNewsId(null)}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedNewsId(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700"
          aria-label="ปิดบทความ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image if present */}
        {article.image && (
          <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">{article.categoryThai}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {article.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              {article.author}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
            {article.title}
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-amber-200/90 leading-relaxed font-medium">
            {article.summary}
          </div>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400">แท็ก:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="pt-3">
            <button
              onClick={() => setSelectedNewsId(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              กลับสู่รายการข่าว
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
