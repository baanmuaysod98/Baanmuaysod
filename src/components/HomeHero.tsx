import React from 'react';
import { 
  Flame, 
  Calendar, 
  Tv, 
  ChevronRight, 
  Search, 
  Trophy, 
  Award, 
  Sparkles,
  MapPin,
  Clock,
  Newspaper
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';

export const HomeHero: React.FC = () => {
  const { 
    fights, 
    results, 
    fighters, 
    events, 
    news,
    setActiveTab, 
    setSelectedFighterId, 
    setSelectedNewsId,
    searchQuery, 
    setSearchQuery 
  } = useMuayThai();

  const liveFights = fights.filter(f => f.status === 'live');
  const todayUpcoming = fights.filter(f => f.status === 'upcoming');
  const mainEvent = fights.find(f => f.isMainEvent && f.status !== 'finished') || fights[0];
  const latestResultsPreview = results.slice(0, 4);
  const featuredFighters = fighters.slice(0, 4);
  const upcomingEventsPreview = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const latestNewsPreview = news.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Default search jumps to today's fights or fighters
    setActiveTab('today');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-slate-400 mb-3">
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                  <Flame className="w-4 h-4 text-amber-400" />
                  สังเวียนมวยไทยมาตรฐาน
                </span>
                <span aria-hidden="true">·</span>
                <span>ข้อมูลสดใหม่ประจำวัน</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">ปลอดการพนัน 100%</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight max-w-xl">
                ศูนย์ข้อมูลมวยไทย <br />
                <span className="bg-gradient-to-r from-amber-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                  และโปรแกรมมวยวันนี้
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                อัปเดตโปรแกรมคู่มวยราชดำเนิน ลุมพินี ช่อง 7 สี สยามอ้อมน้อย ผลการแข่งขันแบบเรียลไทม์ ทำเนียบยอดมวย และ 15 แม่ไม้มวยไทยโบราณ
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาชื่อนักมวย, ศึก, เวที หรือพิกัดน้ำหนัก..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-colors shrink-0 shadow-lg shadow-amber-500/20"
                >
                  ค้นหา
                </button>
              </form>

              {/* Status summary counters */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-white tabular-nums">
                    {fights.length}
                  </span>
                  <span>คู่ชกวันนี้</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-red-400 tabular-nums">
                    {liveFights.length}
                  </span>
                  <span>กำลังชกสด</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-amber-400 tabular-nums">
                    {fighters.length}
                  </span>
                  <span>ยอดมวยในระบบ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Highlight Card */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/hero_muay_thai_action_1791883705441.jpg"
              alt="ภาพบรรยากาศการชกมวยไทยบนเวทีมาตรฐาน"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Scrim overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-slate-900/30 lg:to-transparent" />

            {/* Floating Highlight Match Card */}
            {mainEvent && (
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    คู่เอกไฮไลต์วันนี้
                  </span>
                  <span className="font-mono text-slate-300">{mainEvent.time}</span>
                </div>

                <div className="grid grid-cols-5 items-center gap-2 text-center py-1">
                  <div className="col-span-2 text-left">
                    <span className="text-[11px] text-red-400 font-medium block">มุมแดง</span>
                    <button 
                      onClick={() => {
                        if (mainEvent.redFighter.id) setSelectedFighterId(mainEvent.redFighter.id);
                      }}
                      className="text-sm font-heading font-bold text-white hover:text-amber-400 transition-colors text-left truncate block w-full"
                    >
                      {mainEvent.redFighter.name}
                    </button>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {mainEvent.redFighter.camp}
                    </span>
                  </div>

                  <div className="col-span-1 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-500 font-heading">VS</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {mainEvent.weightClass.split(' ')[0]}
                    </span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="text-[11px] text-blue-400 font-medium block">มุมน้ำเงิน</span>
                    <button 
                      onClick={() => {
                        if (mainEvent.blueFighter.id) setSelectedFighterId(mainEvent.blueFighter.id);
                      }}
                      className="text-sm font-heading font-bold text-white hover:text-amber-400 transition-colors text-right truncate block w-full"
                    >
                      {mainEvent.blueFighter.name}
                    </button>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {mainEvent.blueFighter.camp}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    {mainEvent.venue} ({mainEvent.province})
                  </span>
                  <button
                    onClick={() => setActiveTab('today')}
                    className="text-amber-400 hover:text-amber-300 font-medium shrink-0 flex items-center gap-0.5 ml-2"
                  >
                    ดูคู่อื่นๆ <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 1: Today's Program Quick Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              โปรแกรมคู่ชกวันนี้
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              รวมทุกเวทีมาตรฐาน ราชดำเนิน ลุมพินี ช่อง 7 อ้อมน้อย และศึกภูมิภาค
            </p>
          </div>
          <button
            onClick={() => setActiveTab('today')}
            className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
          >
            ดูทั้งหมด ({fights.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fights.slice(0, 6).map((fight) => (
            <div
              key={fight.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {fight.time}
                </span>
                <div className="flex items-center gap-2">
                  {fight.status === 'live' ? (
                    <span className="text-red-400 font-medium text-xs">
                      กำลังชก ({fight.roundInfo || 'สด'})
                    </span>
                  ) : fight.status === 'finished' ? (
                    <span className="text-slate-400 text-xs">จบการแข่งขัน</span>
                  ) : (
                    <span className="text-slate-400 text-xs">รอชก</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs text-amber-400/90 font-medium block truncate">
                  {fight.eventName}
                </span>
                <span className="text-xs text-slate-500 block truncate">
                  {fight.venue} · {fight.province}
                </span>
              </div>

              {/* Fighter VS Box */}
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="grid grid-cols-5 items-center gap-1 text-xs">
                  <div className="col-span-2 text-left">
                    <span className="text-[10px] text-red-400 font-semibold block">แดง</span>
                    <button
                      onClick={() => fight.redFighter.id && setSelectedFighterId(fight.redFighter.id)}
                      className="font-medium text-white hover:text-amber-400 transition-colors truncate block w-full text-left"
                    >
                      {fight.redFighter.name}
                    </button>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {fight.redFighter.camp}
                    </span>
                  </div>

                  <div className="col-span-1 text-center font-bold text-slate-600 font-heading">
                    VS
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="text-[10px] text-blue-400 font-semibold block">น้ำเงิน</span>
                    <button
                      onClick={() => fight.blueFighter.id && setSelectedFighterId(fight.blueFighter.id)}
                      className="font-medium text-white hover:text-amber-400 transition-colors truncate block w-full text-right"
                    >
                      {fight.blueFighter.name}
                    </button>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {fight.blueFighter.camp}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                <span className="truncate">{fight.weightClass}</span>
                <span className="text-slate-300 font-medium flex items-center gap-1 shrink-0">
                  <Tv className="w-3 h-3 text-slate-400" />
                  {fight.broadcast.channel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Latest Results Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              ผลการแข่งขันล่าสุด
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              ผลมวยเมื่อวานและวันก่อนหน้า บันทึกผล ชนะคะแนน, น็อกเอาต์ (KO/TKO)
            </p>
          </div>
          <button
            onClick={() => setActiveTab('results')}
            className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
          >
            ดูประวัติทั้งหมด
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestResultsPreview.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="text-slate-300 font-medium">{result.eventName}</span>
                <div className="flex items-center gap-2">
                  <span>{result.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-medium">{result.resultTypeThai}</span>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center gap-2 py-2">
                {/* Red */}
                <div className={`col-span-5 ${result.winner === 'red' ? 'font-semibold text-white' : 'text-slate-400'}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-red-400">แดง:</span>
                    <button
                      onClick={() => result.redFighter.id && setSelectedFighterId(result.redFighter.id)}
                      className="text-sm hover:text-amber-400 transition-colors truncate text-left"
                    >
                      {result.redFighter.name}
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 block truncate">{result.redFighter.camp}</span>
                </div>

                {/* Score badge */}
                <div className="col-span-2 text-center text-xs text-slate-400">
                  {result.endingRound ? `ยก ${result.endingRound}` : 'ครบ 5 ยก'}
                </div>

                {/* Blue */}
                <div className={`col-span-5 text-right ${result.winner === 'blue' ? 'font-semibold text-white' : 'text-slate-400'}`}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => result.blueFighter.id && setSelectedFighterId(result.blueFighter.id)}
                      className="text-sm hover:text-amber-400 transition-colors truncate text-right"
                    >
                      {result.blueFighter.name}
                    </button>
                    <span className="text-[10px] text-blue-400">:น้ำเงิน</span>
                  </div>
                  <span className="text-xs text-slate-500 block truncate">{result.blueFighter.camp}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate">
                  ผู้ชนะ: <strong className="text-emerald-400 font-medium">{result.winnerName}</strong>
                </span>
                <span className="text-slate-500 text-[11px] truncate">{result.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Fighters Roster */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              ทำเนียบยอดมวยไทย
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              ประวัติ สถิติการชก และเกียรติประวัติแชมเปี้ยน
            </p>
          </div>
          <button
            onClick={() => setActiveTab('fighters')}
            className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
          >
            ดูนักมวยทั้งหมด ({fighters.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredFighters.map((fighter) => (
            <div
              key={fighter.id}
              onClick={() => setSelectedFighterId(fighter.id)}
              className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all p-4 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-slate-950">
                  <img
                    src={fighter.image}
                    alt={fighter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 text-xs">
                    <span className="text-amber-300 font-medium block truncate">
                      {fighter.nickname}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {fighter.name}
                </h3>
                <p className="text-xs text-slate-400 truncate">{fighter.camp}</p>
                <p className="text-xs text-slate-500 mt-1">{fighter.weightClass}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>
                  ชก <strong className="text-white">{fighter.record.wins + fighter.record.losses}</strong>
                </span>
                <span>
                  ชนะ <strong className="text-emerald-400">{fighter.record.wins}</strong> (KO {fighter.record.koWins})
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Major Events & 15 Mae Mai Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Major Events */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              ปฏิทินศึกใหญ่ที่จะถึง
            </h2>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-0.5"
            >
              ดูปฏิทินเต็ม <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingEventsPreview.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="text-amber-400 font-medium">{ev.eventTypeThai}</span>
                  <span className="font-mono text-slate-300">{ev.date} · {ev.time}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{ev.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {ev.venue} ({ev.province}) · {ev.broadcast}
                </p>
                {ev.mainFights[0] && (
                  <div className="mt-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg">
                    คู่เอก: <strong className="text-amber-300">{ev.mainFights[0].red}</strong> vs <strong className="text-blue-300">{ev.mainFights[0].blue}</strong> ({ev.mainFights[0].weight})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 15 Mae Mai Banner Callout */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="text-xs text-amber-400 font-semibold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              มรดกภูมิปัญญาทางวัฒนธรรม
            </div>
            <h3 className="text-2xl font-heading font-bold text-white leading-snug">
              15 ท่าแม่ไม้มวยไทยโบราณ
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ศึกษาศาสตร์และศิลป์การตั้งรับและเข้าทำฉบับดั้งเดิม ตั้งแต่สลับฟันปลา ปักษาแหวกรัง ชวาซัดหอก จระเข้ฟาดหาง จนถึงหักคอเอราวัณ พร้อมภาพและข้อควรระวัง
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setActiveTab('mae-mai')}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>เปิดดู 15 ท่าแม่ไม้มวยไทย</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 5: News Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-amber-500" />
              ข่าวสารและสาระมวยไทย
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              ข่าวประกบคู่ ผลชั่งน้ำหนัก เทคนิคการฝึกซ้อม และประวัติศาสตร์
            </p>
          </div>
          <button
            onClick={() => setActiveTab('news')}
            className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
          >
            อ่านข่าวทั้งหมด ({news.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestNewsPreview.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedNewsId(item.id)}
              className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="text-amber-400 font-medium">{item.categoryThai}</span>
                  <span className="font-mono text-slate-400">{item.date}</span>
                </div>
                <h3 className="font-heading font-semibold text-base text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate">{item.author}</span>
                <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform font-medium flex items-center">
                  อ่านต่อ <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
