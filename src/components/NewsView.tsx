import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Tag, 
  ChevronRight, 
  User,
  RotateCcw
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { NewsCategory } from '../types/muaythai';

export const NewsView: React.FC = () => {
  const { news, setSelectedNewsId } = useMuayThai();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'fight_announcements', label: 'ประกาศประกบคู่มวย' },
    { id: 'fighter_news', label: 'ข่าวนักมวย' },
    { id: 'weigh_in', label: 'ผลการชั่งน้ำหนัก' },
    { id: 'techniques', label: 'เทคนิคมวยไทย' },
    { id: 'culture_history', label: 'วัฒนธรรมและประวัติศาสตร์' }
  ];

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesContent = item.content.toLowerCase().includes(q);
        const matchesTags = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesContent && !matchesTags) return false;
      }
      return true;
    });
  }, [news, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Newspaper className="w-7 h-7 text-amber-500" />
            ข่าวสารและสาระมวยไทย (News & Articles)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            เกาะติดทุกความเคลื่อนไหวในวงการมวยไทย ประกาศประกบคู่มวย ผลชั่งน้ำหนัก เทคนิควิชา และมรดกประวัติศาสตร์
          </p>
        </div>

        <div className="text-xs text-slate-400">
          บทความทั้งหมด: <strong className="text-white">{news.length}</strong> เรื่อง
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาหัวข้อข่าว, นักมวย หรือเนื้อหาบทความ..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              ล้าง
            </button>
          )}
        </div>
      </div>

      {/* News Cards Grid */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-base font-medium text-slate-300">ไม่พบบทความข่าวตามเงื่อนไขที่ค้นหา</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-lg"
          >
            แสดงข่าวทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNewsId(item.id)}
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-amber-950/10"
            >
              <div>
                {/* Image */}
                {item.image && (
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-3">
                      <span className="text-xs font-semibold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                        {item.categoryThai}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      {item.author}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 truncate">
                    {item.tags?.[0] && (
                      <span className="text-[11px] text-slate-400">#{item.tags[0]}</span>
                    )}
                  </div>

                  <span className="text-amber-400 font-medium group-hover:translate-x-1 transition-transform flex items-center">
                    อ่านฉบับเต็ม <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
