import React from 'react';
import { 
  X, 
  Trophy, 
  Award, 
  MapPin, 
  Calendar, 
  Flame, 
  ArrowRight,
  TrendingUp,
  User
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';

export const FighterDetailModal: React.FC = () => {
  const { 
    selectedFighterId, 
    setSelectedFighterId, 
    fighters, 
    fights, 
    results, 
    setActiveTab 
  } = useMuayThai();

  if (!selectedFighterId) return null;

  const fighter = fighters.find(f => f.id === selectedFighterId);
  if (!fighter) return null;

  // Find related today's fights
  const relatedUpcomingFight = fights.find(
    f => f.redFighter.id === fighter.id || f.blueFighter.id === fighter.id ||
         f.redFighter.name.includes(fighter.name.split(' ')[0]) || 
         f.blueFighter.name.includes(fighter.name.split(' ')[0])
  );

  // Find related past results
  const relatedPastResults = results.filter(
    r => r.redFighter.id === fighter.id || r.blueFighter.id === fighter.id ||
         r.redFighter.name.includes(fighter.name.split(' ')[0]) ||
         r.blueFighter.name.includes(fighter.name.split(' ')[0])
  );

  const totalFights = fighter.record.wins + fighter.record.losses + fighter.record.draws;
  const winRate = totalFights > 0 ? Math.round((fighter.record.wins / totalFights) * 100) : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={() => setSelectedFighterId(null)}
    >
      <div 
        className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFighterId(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 p-6 sm:p-8 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Fighter Photo */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 shrink-0 shadow-xl">
              <img
                src={fighter.image}
                alt={fighter.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Fighter Info */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                {fighter.nickname}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {fighter.name}
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                สังกัด: {fighter.camp}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {fighter.hometown}
                </span>
                <span aria-hidden="true">·</span>
                <span>อายุ {fighter.age} ปี</span>
                <span aria-hidden="true">·</span>
                <span>ส่วนสูง {fighter.height}</span>
              </div>
            </div>
          </div>

          {/* Record Strip */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-lg sm:text-2xl font-heading font-bold text-white tabular-nums">
                {totalFights}
              </div>
              <div className="text-[11px] text-slate-400">ชกทั้งหมด</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="text-lg sm:text-2xl font-heading font-bold text-emerald-400 tabular-nums">
                {fighter.record.wins}
              </div>
              <div className="text-[11px] text-emerald-300/80">ชนะ ({fighter.record.koWins} KO)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/30">
              <div className="text-lg sm:text-2xl font-heading font-bold text-red-400 tabular-nums">
                {fighter.record.losses}
              </div>
              <div className="text-[11px] text-red-300/80">แพ้</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-lg sm:text-2xl font-heading font-bold text-amber-400 tabular-nums">
                {winRate}%
              </div>
              <div className="text-[11px] text-slate-400">อัตราการชนะ</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Style & Bio */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
              สไตล์และประวัติโดยย่อ
            </h3>
            <p className="text-xs text-amber-300 font-medium mb-1.5">
              เชิงมวย: {fighter.style}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {fighter.bio}
            </p>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              เกียรติประวัติและแชมเปี้ยน
            </h3>
            <ul className="space-y-1.5">
              {fighter.achievements.map((ach, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Today's Fight */}
          {relatedUpcomingFight && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  มีโปรแกรมชกวันนี้!
                </span>
                <span className="text-slate-300 font-mono">{relatedUpcomingFight.time}</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {relatedUpcomingFight.eventName}
              </p>
              <div className="text-xs text-slate-300">
                คู่ชก: <strong className="text-red-400">{relatedUpcomingFight.redFighter.name}</strong> vs <strong className="text-blue-400">{relatedUpcomingFight.blueFighter.name}</strong>
              </div>
              <button
                onClick={() => {
                  setSelectedFighterId(null);
                  setActiveTab('today');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 mt-1"
              >
                ดูรายละเอียดในโปรแกรมวันนี้ <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Fight History */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              สถิติการชกล่าสุด (Recent Fight History)
            </h3>
            <div className="space-y-2">
              {fighter.recentHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400">{item.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-white font-medium">พบ {item.opponent}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {item.event} ({item.venue})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-semibold ${
                      item.result === 'win' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {item.method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
          ข้อมูลสถิติได้รับการตรวจสอบและบันทึกโดยศูนย์ข้อมูล Baanmuaysod (บ้านมวยสด)
        </div>
      </div>
    </div>
  );
};
