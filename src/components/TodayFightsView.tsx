import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Search, 
  Filter, 
  Clock, 
  Tv, 
  MapPin, 
  ExternalLink, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { FightStatus } from '../types/muaythai';

export const TodayFightsView: React.FC = () => {
  const { fights, setSelectedFighterId, searchQuery, setSearchQuery } = useMuayThai();

  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Compute unique filter options
  const provinces = useMemo(() => {
    return Array.from(new Set(fights.map(f => f.province))).filter(Boolean);
  }, [fights]);

  const venues = useMemo(() => {
    return Array.from(new Set(fights.map(f => f.venue))).filter(Boolean);
  }, [fights]);

  const channels = useMemo(() => {
    return Array.from(new Set(fights.map(f => f.broadcast.channel))).filter(Boolean);
  }, [fights]);

  // Filtering logic
  const filteredFights = useMemo(() => {
    return fights.filter(fight => {
      // Province filter
      if (selectedProvince !== 'all' && fight.province !== selectedProvince) return false;
      // Venue filter
      if (selectedVenue !== 'all' && fight.venue !== selectedVenue) return false;
      // Channel filter
      if (selectedChannel !== 'all' && fight.broadcast.channel !== selectedChannel) return false;
      // Status filter
      if (selectedStatus !== 'all' && fight.status !== selectedStatus) return false;
      // Weight class filter
      if (selectedWeight !== 'all') {
        const wt = fight.weightClass;
        if (selectedWeight === 'under-120' && !wt.match(/11[0-9]|120/)) return false;
        if (selectedWeight === '121-130' && !wt.match(/12[1-9]|130/)) return false;
        if (selectedWeight === '131-140' && !wt.match(/13[1-9]|140/)) return false;
        if (selectedWeight === 'over-140' && !wt.match(/14[1-9]|15[0-9]|16[0-9]/)) return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesRed = fight.redFighter.name.toLowerCase().includes(q) || fight.redFighter.camp.toLowerCase().includes(q);
        const matchesBlue = fight.blueFighter.name.toLowerCase().includes(q) || fight.blueFighter.camp.toLowerCase().includes(q);
        const matchesEvent = fight.eventName.toLowerCase().includes(q);
        const matchesVenue = fight.venue.toLowerCase().includes(q) || fight.province.toLowerCase().includes(q);
        const matchesWeight = fight.weightClass.toLowerCase().includes(q);
        if (!matchesRed && !matchesBlue && !matchesEvent && !matchesVenue && !matchesWeight) return false;
      }
      return true;
    });
  }, [fights, selectedProvince, selectedVenue, selectedChannel, selectedStatus, selectedWeight, searchQuery]);

  const resetFilters = () => {
    setSelectedProvince('all');
    setSelectedVenue('all');
    setSelectedWeight('all');
    setSelectedChannel('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const getStatusBadge = (status: FightStatus, roundInfo?: string) => {
    switch (status) {
      case 'live':
        return (
          <span className="text-red-400 font-semibold text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            กำลังชก {roundInfo ? `(${roundInfo})` : '(สด)'}
          </span>
        );
      case 'finished':
        return <span className="text-slate-400 text-xs">จบการแข่งขันแล้ว</span>;
      default:
        return <span className="text-amber-400 text-xs font-medium">รอการแข่งขัน</span>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Flame className="w-7 h-7 text-amber-500" />
            โปรแกรมมวยวันนี้ (Today's Fight Program)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            โปรแกรมการแข่งขันมวยไทยประจำวัน อัปเดตเวลาชก เวที พิกัดน้ำหนัก และช่องถ่ายทอดสด
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>พบ {filteredFights.length} คู่ชก</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300">ประจำวันที่ 13 ตุลาคม 2569</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        {/* Search row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อนักมวย, ค่ายมวย, ศึก หรือเวที..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          {(selectedProvince !== 'all' || selectedVenue !== 'all' || selectedWeight !== 'all' || selectedChannel !== 'all' || selectedStatus !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Province */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">จังหวัด</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกจังหวัด</option>
              {provinces.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Stadium/Venue */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">สนามมวย / เวที</label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกเวที</option>
              {venues.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Weight class */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">พิกัดน้ำหนัก</label>
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกพิกัด</option>
              <option value="under-120">ไม่เกิน 120 ปอนด์ (ฟลาย/แบนตัม)</option>
              <option value="121-130">121 - 130 ปอนด์ (เฟเธอร์/ซูเปอร์เฟเธอร์)</option>
              <option value="131-140">131 - 140 ปอนด์ (ไลต์เวต)</option>
              <option value="over-140">141 ปอนด์ขึ้นไป (เวลเตอร์/มิดเดิล)</option>
            </select>
          </div>

          {/* Channel */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">ช่องถ่ายทอดสด</label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกช่องถ่ายทอด</option>
              {channels.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">สถานะคู่ชก</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="live">กำลังชก (Live)</option>
              <option value="upcoming">รอชก (Upcoming)</option>
              <option value="finished">จบแล้ว (Finished)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fight Cards Grid */}
      {filteredFights.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-base font-medium text-slate-300">ไม่พบคู่ชกที่ตรงกับเงื่อนไขการค้นหา</p>
          <p className="text-xs mt-1">ลองเปลี่ยนเงื่อนไขตัวกรอง หรือกดปุ่ม "ล้างตัวกรอง"</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-lg transition-colors"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFights.map((fight) => (
            <div
              key={fight.id}
              className={`rounded-2xl bg-slate-900 border transition-all p-5 flex flex-col justify-between space-y-4 ${
                fight.isMainEvent
                  ? 'border-amber-500/50 shadow-lg shadow-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Header of Card */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-mono font-medium text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    {fight.time}
                  </span>
                  {fight.isMainEvent && (
                    <span className="text-amber-400 font-semibold text-xs flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      คู่เอกนำรายการ
                    </span>
                  )}
                </div>

                <div>
                  {getStatusBadge(fight.status, fight.roundInfo)}
                </div>
              </div>

              {/* Event & Venue Info */}
              <div>
                <h3 className="font-heading font-bold text-base text-white tracking-tight">
                  {fight.eventName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{fight.venue}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{fight.province}</span>
                </div>
              </div>

              {/* Matchup Center Arena */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="grid grid-cols-11 items-center gap-2">
                  {/* Red Corner */}
                  <div className="col-span-5 text-left">
                    <span className="text-[11px] font-semibold text-red-400 block mb-0.5">
                      มุมแดง (Red)
                    </span>
                    <button
                      onClick={() => fight.redFighter.id && setSelectedFighterId(fight.redFighter.id)}
                      className="font-heading font-bold text-base text-white hover:text-amber-400 transition-colors block text-left truncate w-full"
                    >
                      {fight.redFighter.name}
                    </button>
                    <span className="text-xs text-slate-400 block truncate">
                      {fight.redFighter.camp}
                    </span>
                    {fight.redFighter.weight && (
                      <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                        {fight.redFighter.weight}
                      </span>
                    )}
                  </div>

                  {/* VS divider */}
                  <div className="col-span-1 text-center flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-600 font-heading">
                      VS
                    </span>
                  </div>

                  {/* Blue Corner */}
                  <div className="col-span-5 text-right">
                    <span className="text-[11px] font-semibold text-blue-400 block mb-0.5">
                      มุมน้ำเงิน (Blue)
                    </span>
                    <button
                      onClick={() => fight.blueFighter.id && setSelectedFighterId(fight.blueFighter.id)}
                      className="font-heading font-bold text-base text-white hover:text-amber-400 transition-colors block text-right truncate w-full"
                    >
                      {fight.blueFighter.name}
                    </button>
                    <span className="text-xs text-slate-400 block truncate">
                      {fight.blueFighter.camp}
                    </span>
                    {fight.blueFighter.weight && (
                      <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                        {fight.blueFighter.weight}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Broadcast */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  พิกัด: <strong className="text-slate-200">{fight.weightClass}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-amber-400" />
                    {fight.broadcast.channel}
                  </span>
                  {fight.broadcast.url && (
                    <a
                      href={fight.broadcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-0.5 ml-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      ถ่ายทอดสด
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
