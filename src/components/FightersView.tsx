import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Trophy, 
  MapPin, 
  Sparkles, 
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';

export const FightersView: React.FC = () => {
  const { fighters, setSelectedFighterId } = useMuayThai();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCamp, setSelectedCamp] = useState<string>('all');
  const [selectedWeight, setSelectedWeight] = useState<string>('all');

  const camps = useMemo(() => {
    return Array.from(new Set(fighters.map(f => f.camp))).filter(Boolean);
  }, [fighters]);

  const filteredFighters = useMemo(() => {
    return fighters.filter(f => {
      if (selectedCamp !== 'all' && f.camp !== selectedCamp) return false;
      if (selectedWeight !== 'all' && !f.weightClass.includes(selectedWeight)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = f.name.toLowerCase().includes(q) || f.nickname.toLowerCase().includes(q);
        const matchesCamp = f.camp.toLowerCase().includes(q);
        const matchesHometown = f.hometown.toLowerCase().includes(q);
        const matchesStyle = f.style.toLowerCase().includes(q);
        if (!matchesName && !matchesCamp && !matchesHometown && !matchesStyle) return false;
      }
      return true;
    });
  }, [fighters, selectedCamp, selectedWeight, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCamp('all');
    setSelectedWeight('all');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-500" />
            ทำเนียบยอดมวยไทย (Fighter Profiles)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            รวมประวัติ สถิติการชก สังกัดค่ายมวย ฉายา และเกียรติประวัติแชมเปี้ยนระดับประเทศและระดับโลก
          </p>
        </div>

        <div className="text-xs text-slate-400">
          นักมวยในระบบ: <strong className="text-white">{fighters.length}</strong> ท่าน
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อนักมวย, ฉายา, ค่าย หรือจังหวัดบ้านเกิด..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCamp}
              onChange={(e) => setSelectedCamp(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกค่ายมวย</option>
              {camps.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3 flex items-center gap-2">
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกพิกัดน้ำหนัก</option>
              <option value="124">แบนตัมเวต (124-126)</option>
              <option value="135">ฟลาย/ไลต์เวต (135)</option>
              <option value="145">แบนตัมเวต (145)</option>
              <option value="154">ซูเปอร์เวลเตอร์ (154-155)</option>
            </select>

            {(searchQuery || selectedCamp !== 'all' || selectedWeight !== 'all') && (
              <button
                onClick={resetFilters}
                className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg shrink-0"
                title="ล้างตัวกรอง"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fighters Grid */}
      {filteredFighters.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-base font-medium text-slate-300">ไม่พบข้อมูลนักมวยตามเงื่อนไขที่ระบุ</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-lg"
          >
            แสดงนักมวยทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFighters.map((fighter) => {
            const totalFights = fighter.record.wins + fighter.record.losses + fighter.record.draws;
            return (
              <div
                key={fighter.id}
                onClick={() => setSelectedFighterId(fighter.id)}
                className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all p-5 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-amber-950/10"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={fighter.image}
                      alt={fighter.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-semibold truncate">
                        {fighter.nickname}
                      </span>
                      <span className="text-slate-300 font-mono text-[11px]">
                        อายุ {fighter.age} ปี
                      </span>
                    </div>
                  </div>

                  <h2 className="font-heading font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                    {fighter.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                    {fighter.camp}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{fighter.hometown}</span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    เชิงชก: {fighter.style}
                  </p>
                </div>

                {/* Record strip */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 bg-slate-950/60 rounded-lg">
                    <div>
                      <span className="text-[10px] text-slate-400 block">สถิติ</span>
                      <span className="font-mono font-bold text-white tabular-nums">{totalFights} ไฟต์</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">ชนะ</span>
                      <span className="font-mono font-bold text-emerald-400 tabular-nums">{fighter.record.wins}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">น็อก (KO)</span>
                      <span className="font-mono font-bold text-amber-400 tabular-nums">{fighter.record.koWins}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-amber-400 font-medium">
                    <span>เปิดดูสถิติและประวัติเต็ม</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
