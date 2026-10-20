import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Calendar, 
  MapPin, 
  RotateCcw, 
  Award,
  Filter
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { ResultType } from '../types/muaythai';

export const ResultsView: React.FC = () => {
  const { results, setSelectedFighterId } = useMuayThai();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [venueFilter, setVenueFilter] = useState<string>('all');

  const venues = useMemo(() => {
    return Array.from(new Set(results.map(r => r.venue))).filter(Boolean);
  }, [results]);

  const filteredResults = useMemo(() => {
    return results.filter(res => {
      // Date filter
      if (selectedDate && res.date !== selectedDate) return false;
      // Venue filter
      if (venueFilter !== 'all' && res.venue !== venueFilter) return false;
      // Result Type filter
      if (typeFilter !== 'all') {
        if (typeFilter === 'ko_tko' && res.resultType !== 'ko' && res.resultType !== 'tko') return false;
        if (typeFilter === 'points' && res.resultType !== 'points') return false;
        if (typeFilter === 'draw' && res.resultType !== 'draw') return false;
      }
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesFighter = 
          res.redFighter.name.toLowerCase().includes(q) ||
          res.redFighter.camp.toLowerCase().includes(q) ||
          res.blueFighter.name.toLowerCase().includes(q) ||
          res.blueFighter.camp.toLowerCase().includes(q) ||
          res.winnerName.toLowerCase().includes(q);
        const matchesEvent = res.eventName.toLowerCase().includes(q);
        const matchesVenue = res.venue.toLowerCase().includes(q) || res.province.toLowerCase().includes(q);
        const matchesDate = res.date.includes(q);
        if (!matchesFighter && !matchesEvent && !matchesVenue && !matchesDate) return false;
      }
      return true;
    });
  }, [results, searchQuery, selectedDate, typeFilter, venueFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDate('');
    setTypeFilter('all');
    setVenueFilter('all');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-amber-500" />
            ผลการแข่งขันล่าสุด (Latest Results & Archive)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            คลังข้อมูลผลมวยย้อนหลัง บันทึกผล ชนะคะแนน, น็อกเอาต์ (KO/TKO), ยกที่จบการแข่งขัน และสรุปรูปเกม
          </p>
        </div>

        <div className="text-xs text-slate-400">
          ผลการแข่งขันทั้งหมด: <strong className="text-white">{results.length}</strong> แมตช์
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        {/* Row 1: Search & Date picker */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อนักมวย, ศึก, เวที หรือวันที่ (YYYY-MM-DD)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="md:col-span-4 relative flex items-center gap-2">
            <div className="relative flex-1">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
            {(searchQuery || selectedDate || typeFilter !== 'all' || venueFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Filter Tabs & Venue Select */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
          {/* Segmented type buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                typeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ทุกผลการชก
            </button>
            <button
              onClick={() => setTypeFilter('ko_tko')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                typeFilter === 'ko_tko'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ชนะน็อกเอาต์ (KO/TKO)
            </button>
            <button
              onClick={() => setTypeFilter('points')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                typeFilter === 'points'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ชนะคะแนน (Points)
            </button>
            <button
              onClick={() => setTypeFilter('draw')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                typeFilter === 'draw'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              เสมอกัน (Draw)
            </button>
          </div>

          {/* Venue selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 shrink-0">เวทีมวย:</span>
            <select
              value={venueFilter}
              onChange={(e) => setVenueFilter(e.target.value)}
              className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกเวที</option>
              {venues.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-base font-medium text-slate-300">ไม่พบผลการแข่งขันตามเงื่อนไขที่เลือก</p>
          <p className="text-xs mt-1">ลองเปลี่ยนวันที่ หรือค้นหาด้วยชื่อนักมวยอื่น</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-lg"
          >
            แสดงผลมวยทั้งหมด
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const isRedWinner = result.winner === 'red';
            const isBlueWinner = result.winner === 'blue';
            const isDraw = result.winner === 'draw' || result.resultType === 'draw';

            return (
              <div
                key={result.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-white">
                      {result.eventName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {result.venue} ({result.province})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-300">{result.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400 font-medium">{result.weightClass}</span>
                  </div>
                </div>

                {/* Matchup & Winner Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-2">
                  {/* Red Fighter */}
                  <div className={`md:col-span-4 p-3 rounded-xl border ${
                    isRedWinner 
                      ? 'bg-red-950/30 border-red-500/40' 
                      : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-red-400 font-semibold uppercase">
                        มุมแดง {isRedWinner && '🏆 ชนะ'}
                      </span>
                    </div>
                    <button
                      onClick={() => result.redFighter.id && setSelectedFighterId(result.redFighter.id)}
                      className={`font-heading font-bold text-base truncate block w-full text-left transition-colors ${
                        isRedWinner ? 'text-white hover:text-amber-400' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {result.redFighter.name}
                    </button>
                    <span className="text-xs text-slate-400 block truncate">
                      {result.redFighter.camp}
                    </span>
                  </div>

                  {/* Center Result Verdict */}
                  <div className="md:col-span-4 text-center px-2 flex flex-col items-center justify-center space-y-1">
                    <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {result.resultTypeThai}
                    </div>

                    <div className="text-xs font-mono text-slate-400">
                      {result.endingRound 
                        ? `จบในยกที่ ${result.endingRound}` 
                        : 'ครบกำหนด 5 ยก'}
                    </div>

                    <div className="text-[11px] text-emerald-400 font-medium">
                      ผู้ชนะ: {result.winnerName}
                    </div>
                  </div>

                  {/* Blue Fighter */}
                  <div className={`md:col-span-4 p-3 rounded-xl border ${
                    isBlueWinner 
                      ? 'bg-blue-950/30 border-blue-500/40' 
                      : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-blue-400 font-semibold uppercase">
                        มุมน้ำเงิน {isBlueWinner && '🏆 ชนะ'}
                      </span>
                    </div>
                    <button
                      onClick={() => result.blueFighter.id && setSelectedFighterId(result.blueFighter.id)}
                      className={`font-heading font-bold text-base truncate block w-full text-left transition-colors ${
                        isBlueWinner ? 'text-white hover:text-amber-400' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {result.blueFighter.name}
                    </button>
                    <span className="text-xs text-slate-400 block truncate">
                      {result.blueFighter.camp}
                    </span>
                  </div>
                </div>

                {/* Match notes */}
                {result.notes && (
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-amber-400 font-medium mr-1.5">สรุปรูปเกม:</span>
                    {result.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
