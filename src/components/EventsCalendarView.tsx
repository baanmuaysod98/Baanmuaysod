import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Tv, 
  Trophy, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Filter,
  RotateCcw
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { EventStatus } from '../types/muaythai';

export const EventsCalendarView: React.FC = () => {
  const { events } = useMuayThai();

  const [statusTab, setStatusTab] = useState<EventStatus>('upcoming');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const provinces = useMemo(() => {
    return Array.from(new Set(events.map(e => e.province))).filter(Boolean);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (e.status !== statusTab) return false;
      if (selectedProvince !== 'all' && e.province !== selectedProvince) return false;
      if (selectedType !== 'all' && e.eventType !== selectedType) return false;
      if (selectedMonth !== 'all') {
        const monthNum = e.date.split('-')[1]; // YYYY-MM-DD
        if (selectedMonth === '10' && monthNum !== '10') return false;
        if (selectedMonth === '11' && monthNum !== '11') return false;
        if (selectedMonth === '12' && monthNum !== '12') return false;
      }
      return true;
    });
  }, [events, statusTab, selectedMonth, selectedProvince, selectedType]);

  const resetFilters = () => {
    setSelectedMonth('all');
    setSelectedProvince('all');
    setSelectedType('all');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-amber-500" />
            ปฏิทินศึกใหญ่ (Major Events Calendar)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            โปรแกรมการแข่งขันมหกรรมมวยไทยไฟต์ใหญ่ ศึกชิงแชมป์เวทีมาตรฐาน และทัวร์นาเมนต์พิเศษทั่วประเทศ
          </p>
        </div>

        {/* Tab switch Upcoming vs Completed */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm">
          <button
            onClick={() => setStatusTab('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusTab === 'upcoming'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            รายการที่จะถึง (Upcoming)
          </button>
          <button
            onClick={() => setStatusTab('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusTab === 'completed'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            แข่งขันเสร็จสิ้น (Completed)
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Month */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">เดือน:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกเดือน</option>
              <option value="10">ตุลาคม 2026</option>
              <option value="11">พฤศจิกายน 2026</option>
              <option value="12">ธันวาคม 2026</option>
            </select>
          </div>

          {/* Province */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">จังหวัด:</span>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกจังหวัด</option>
              {provinces.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">ประเภทรายการ:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">ทุกประเภท</option>
              <option value="championship">ศึกชิงแชมป์เปี้ยน (Championship)</option>
              <option value="special_tournament">มวยรอบ/ทัวร์นาเมนต์พิเศษ</option>
              <option value="weekly_major">ศึกใหญ่ประจำสัปดาห์</option>
            </select>
          </div>
        </div>

        {(selectedMonth !== 'all' || selectedProvince !== 'all' || selectedType !== 'all') && (
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            ล้างตัวกรอง
          </button>
        )}
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-base font-medium text-slate-300">ไม่พบรายการแข่งขันตามเงื่อนไขที่เลือก</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium rounded-lg"
          >
            แสดงรายการทั้งหมด
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Event Visual Backdrop */}
                {ev.image && (
                  <div className="lg:col-span-4 relative min-h-[200px] lg:min-h-full">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
                  </div>
                )}

                {/* Event Details */}
                <div className={`${ev.image ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 sm:p-7 space-y-4`}>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-semibold">{ev.eventTypeThai}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {ev.venue} ({ev.province})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/20">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.date} · {ev.time}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                    {ev.title}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {ev.description}
                  </p>

                  {/* Main Fights Showcase */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      คู่เอกและคู่มวยเด่นในรายการ
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ev.mainFights.map((fight, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                        >
                          {fight.titleFight && (
                            <span className="text-[10px] text-amber-400 font-semibold block truncate">
                              ★ {fight.titleFight}
                            </span>
                          )}
                          <div className="flex items-center justify-between text-white font-medium">
                            <span className="text-red-400 truncate">{fight.red}</span>
                            <span className="text-slate-500 font-bold px-1 text-[10px]">VS</span>
                            <span className="text-blue-400 truncate">{fight.blue}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            พิกัด {fight.weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Broadcast info bar */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Tv className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>การถ่ายทอดสด: <strong className="text-slate-200">{ev.broadcast}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
