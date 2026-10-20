import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertCircle,
  FileText,
  Flame,
  Trophy,
  Users,
  Calendar,
  Newspaper,
  Code
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { Fight, FightResult, FighterProfile, NewsArticle, MajorEvent } from '../types/muaythai';

type CmsSection = 'fights' | 'results' | 'fighters' | 'news' | 'events' | 'json';

export const CmsDataManagerModal: React.FC = () => {
  const {
    fights,
    results,
    fighters,
    news,
    events,
    addFight,
    deleteFight,
    addResult,
    deleteResult,
    addFighter,
    deleteFighter,
    addNews,
    deleteNews,
    addEvent,
    deleteEvent,
    resetToDefaultData,
    exportDataJSON,
    importDataJSON
  } = useMuayThai();

  const [activeSection, setActiveSection] = useState<CmsSection>('fights');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // New Fight Form State
  const [fightForm, setFightForm] = useState({
    time: '18:30 น.',
    eventName: 'ศึกเพชรยินดี',
    venue: 'เวทีมวยราชดำเนิน',
    province: 'กรุงเทพมหานคร',
    redName: '',
    redCamp: '',
    blueName: '',
    blueCamp: '',
    weightClass: '135 ปอนด์',
    channel: 'ทรูโฟร์ยู 24',
    status: 'upcoming' as const,
    isMainEvent: false
  });

  // New Result Form State
  const [resultForm, setResultForm] = useState({
    date: new Date().toISOString().split('T')[0],
    eventName: 'ศึก RWS Rajadamnern World Series',
    venue: 'เวทีมวยราชดำเนิน',
    province: 'กรุงเทพมหานคร',
    redName: '',
    redCamp: '',
    blueName: '',
    blueCamp: '',
    winner: 'red' as 'red' | 'blue' | 'draw',
    resultType: 'points' as const,
    resultTypeThai: 'ชนะคะแนน',
    endingRound: 5,
    weightClass: '135 ปอนด์',
    notes: ''
  });

  // New Fighter Form State
  const [fighterForm, setFighterForm] = useState({
    name: '',
    nickname: '',
    camp: '',
    age: 25,
    weightClass: '135 ปอนด์',
    height: '175 ซม.',
    hometown: 'กรุงเทพมหานคร',
    style: 'มวยฝีมือ',
    wins: 50,
    losses: 10,
    draws: 0,
    koWins: 15,
    bio: ''
  });

  // New News Form State
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'fight_announcements' as const,
    categoryThai: 'ประกาศประกบคู่มวย',
    date: new Date().toISOString().split('T')[0],
    author: 'ทีมข่าว Baanmuaysod',
    summary: '',
    content: ''
  });

  const showNotification = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3500);
  };

  const handleAddFightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fightForm.redName || !fightForm.blueName) {
      showNotification('กรุณาระบุชื่อนักมวยทั้งมุมแดงและน้ำเงิน', 'error');
      return;
    }
    const newFight: Fight = {
      id: `fight-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: fightForm.time,
      eventName: fightForm.eventName,
      venue: fightForm.venue,
      province: fightForm.province,
      redFighter: { name: fightForm.redName, camp: fightForm.redCamp },
      blueFighter: { name: fightForm.blueName, camp: fightForm.blueCamp },
      weightClass: fightForm.weightClass,
      broadcast: { channel: fightForm.channel, isLiveStream: true },
      status: fightForm.status,
      isMainEvent: fightForm.isMainEvent
    };
    addFight(newFight);
    setShowAddModal(false);
    showNotification('เพิ่มคู่ชกใหม่เรียบร้อยแล้ว', 'success');
  };

  const handleAddResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultForm.redName || !resultForm.blueName) {
      showNotification('กรุณาระบุชื่อนักมวยทั้งมุมแดงและน้ำเงิน', 'error');
      return;
    }
    const winnerName = resultForm.winner === 'red' 
      ? `${resultForm.redName} ${resultForm.redCamp}`
      : resultForm.winner === 'blue'
      ? `${resultForm.blueName} ${resultForm.blueCamp}`
      : 'เสมอกัน';

    const newResult: FightResult = {
      id: `res-${Date.now()}`,
      date: resultForm.date,
      eventName: resultForm.eventName,
      venue: resultForm.venue,
      province: resultForm.province,
      redFighter: { name: resultForm.redName, camp: resultForm.redCamp },
      blueFighter: { name: resultForm.blueName, camp: resultForm.blueCamp },
      winner: resultForm.winner,
      winnerName,
      resultType: resultForm.resultType,
      resultTypeThai: resultForm.resultTypeThai,
      endingRound: Number(resultForm.endingRound) || null,
      weightClass: resultForm.weightClass,
      notes: resultForm.notes
    };
    addResult(newResult);
    setShowAddModal(false);
    showNotification('เพิ่มผลการชกใหม่เรียบร้อยแล้ว', 'success');
  };

  const handleAddFighterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fighterForm.name || !fighterForm.camp) {
      showNotification('กรุณาระบุชื่อนักมวยและค่าย', 'error');
      return;
    }
    const newFighter: FighterProfile = {
      id: `fighter-${Date.now()}`,
      name: fighterForm.name,
      nickname: fighterForm.nickname || 'ยอดมวยไทย',
      camp: fighterForm.camp,
      age: Number(fighterForm.age) || 25,
      weightClass: fighterForm.weightClass,
      height: fighterForm.height,
      hometown: fighterForm.hometown,
      style: fighterForm.style,
      record: {
        wins: Number(fighterForm.wins) || 0,
        losses: Number(fighterForm.losses) || 0,
        draws: Number(fighterForm.draws) || 0,
        koWins: Number(fighterForm.koWins) || 0
      },
      image: '/src/assets/images/fighter_portrait_champion_1791883705635.jpg',
      bio: fighterForm.bio || `นักมวยไทยสังกัด ${fighterForm.camp} ยอดฝีมือแห่งวงการ`,
      achievements: ['นักมวยไทยดาวรุ่งยอดเยี่ยม'],
      recentHistory: []
    };
    addFighter(newFighter);
    setShowAddModal(false);
    showNotification('เพิ่มข้อมูลนักมวยเรียบร้อยแล้ว', 'success');
  };

  const handleAddNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) {
      showNotification('กรุณาระบุหัวข้อและสรุปข่าว', 'error');
      return;
    }
    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newsForm.title,
      category: newsForm.category,
      categoryThai: newsForm.categoryThai,
      date: newsForm.date,
      author: newsForm.author,
      summary: newsForm.summary,
      content: newsForm.content || newsForm.summary,
      image: '/src/assets/images/hero_muay_thai_action_1791883705441.jpg',
      tags: ['มวยไทย', 'ข่าวสาร']
    };
    addNews(newArticle);
    setShowAddModal(false);
    showNotification('เพิ่มบทความข่าวเรียบร้อยแล้ว', 'success');
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) {
      showNotification('กรุณาวางโค้ด JSON ที่ต้องการนำเข้า', 'error');
      return;
    }
    const ok = importDataJSON(jsonInput);
    if (ok) {
      showNotification('นำเข้าข้อมูล JSON สำเร็จเรียบร้อยแล้ว', 'success');
      setJsonInput('');
    } else {
      showNotification('รูปแบบ JSON ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* CMS Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2.5">
            <Database className="w-7 h-7 text-amber-500" />
            ระบบจัดการข้อมูลมวยไทย (CMS Data Manager)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            อัปเดตโปรแกรมชกประจำวัน บันทึกผลมวย เพิ่มประวัตินักมวย และจัดการบทความข่าวโดยตรงในเบราว์เซอร์ พร้อมส่งออก JSON
          </p>
        </div>

        {/* Action Button: Add Item */}
        <div className="flex items-center gap-3">
          {activeSection !== 'json' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มข้อมูล ({activeSection === 'fights' ? 'คู่ชก' : activeSection === 'results' ? 'ผลมวย' : activeSection === 'fighters' ? 'นักมวย' : activeSection === 'news' ? 'ข่าว' : 'ศึกใหญ่'})</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/40' 
            : 'bg-red-950/80 text-red-200 border border-red-500/40'
        }`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Section Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveSection('fights')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'fights'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>โปรแกรมวันนี้ ({fights.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('results')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'results'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>ผลมวยล่าสุด ({results.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('fighters')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'fighters'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>ทำเนียบนักมวย ({fighters.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('news')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'news'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>บทความข่าว ({news.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('events')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'events'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>ปฏิทินศึกใหญ่ ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('json')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            activeSection === 'json'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>จัดการ JSON / สำรองข้อมูล</span>
        </button>
      </div>

      {/* SECTION CONTENT */}

      {/* 1. FIGHTS LIST */}
      {activeSection === 'fights' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>รายการคู่ชกในระบบ ({fights.length} คู่)</span>
          </div>
          <div className="space-y-2">
            {fights.map((fight) => (
              <div
                key={fight.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-400 font-semibold">{fight.time}</span>
                    <span className="text-white font-medium truncate">{fight.eventName}</span>
                    <span className="text-slate-500">({fight.venue} · {fight.province})</span>
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-red-400">{fight.redFighter.name} ({fight.redFighter.camp})</strong> VS <strong className="text-blue-400">{fight.blueFighter.name} ({fight.blueFighter.camp})</strong> · {fight.weightClass}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm(`คุณต้องการลบคู่ชก "${fight.redFighter.name} vs ${fight.blueFighter.name}" หรือไม่?`)) {
                        deleteFight(fight.id);
                        showNotification('ลบคู่ชกเรียบร้อยแล้ว', 'success');
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="ลบรายการ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. RESULTS LIST */}
      {activeSection === 'results' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>บันทึกผลการชกในระบบ ({results.length} รายการ)</span>
          </div>
          <div className="space-y-2">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{res.date}</span>
                    <span className="text-white font-medium truncate">{res.eventName}</span>
                    <span className="text-amber-400 font-semibold">[{res.resultTypeThai}]</span>
                  </div>
                  <div className="text-slate-300">
                    {res.redFighter.name} vs {res.blueFighter.name} · ผู้ชนะ: <strong className="text-emerald-400">{res.winnerName}</strong> ({res.endingRound ? `ยก ${res.endingRound}` : 'ครบยก'})
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`คุณต้องการลบผลการชกนี้หรือไม่?`)) {
                      deleteResult(res.id);
                      showNotification('ลบผลการชกเรียบร้อยแล้ว', 'success');
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="ลบผลการชก"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FIGHTERS LIST */}
      {activeSection === 'fighters' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ทำเนียบนักมวยในระบบ ({fighters.length} ท่าน)</span>
          </div>
          <div className="space-y-2">
            {fighters.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{f.name}</span>
                    <span className="text-amber-400 font-medium">({f.nickname})</span>
                  </div>
                  <div className="text-slate-400">
                    ค่าย: {f.camp} · {f.weightClass} · สถิติ: ชนะ {f.record.wins} / แพ้ {f.record.losses} (KO {f.record.koWins})
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`คุณต้องการลบนักมวย "${f.name}" หรือไม่?`)) {
                      deleteFighter(f.id);
                      showNotification('ลบข้อมูลนักมวยเรียบร้อยแล้ว', 'success');
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="ลบข้อมูลนักมวย"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. NEWS LIST */}
      {activeSection === 'news' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>บทความข่าวในระบบ ({news.length} เรื่อง)</span>
          </div>
          <div className="space-y-2">
            {news.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-medium">[{n.categoryThai}]</span>
                    <span className="font-mono text-slate-400">{n.date}</span>
                    <span className="text-white font-semibold truncate">{n.title}</span>
                  </div>
                  <div className="text-slate-400 truncate max-w-xl">
                    {n.summary}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`คุณต้องการลบข่าว "${n.title}" หรือไม่?`)) {
                      deleteNews(n.id);
                      showNotification('ลบข่าวเรียบร้อยแล้ว', 'success');
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="ลบข่าว"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. EVENTS LIST */}
      {activeSection === 'events' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ปฏิทินศึกใหญ่ในระบบ ({events.length} รายการ)</span>
          </div>
          <div className="space-y-2">
            {events.map((e) => (
              <div
                key={e.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{e.date} {e.time}</span>
                    <span className="text-white font-semibold truncate">{e.title}</span>
                    <span className="text-amber-400">({e.eventTypeThai})</span>
                  </div>
                  <div className="text-slate-400">
                    สถานที่: {e.venue} ({e.province}) · {e.broadcast}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`คุณต้องการลบศึก "${e.title}" หรือไม่?`)) {
                      deleteEvent(e.id);
                      showNotification('ลบรายการศึกใหญ่เรียบร้อยแล้ว', 'success');
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                  title="ลบศึกใหญ่"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. JSON BACKUP & HEADLESS CMS INTEGRATION GUIDE */}
      {activeSection === 'json' && (
        <div className="space-y-6">
          {/* Export & Reset Tools */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-500" />
              การสำรองข้อมูล (JSON Backup & Export)
            </h2>
            <p className="text-xs text-slate-400">
              ดาวน์โหลดชุดข้อมูลมวยไทยทั้งหมด (โปรแกรมชก, ผลการแข่งขัน, สถิตินักมวย, ปฏิทินศึกใหญ่ และข่าวสาร) เป็นไฟล์ JSON เพื่อนำไปสำรองข้อมูล หรือย้ายไปยังฐานข้อมูลอื่น
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportDataJSON}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดไฟล์ JSON ทันที</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('คำเตือน: คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นชุดข้อมูลมาตรฐานภาษาไทยเริ่มต้นหรือไม่? ข้อมูลที่คุณเพิ่มใหม่จะถูกแทนที่')) {
                    resetToDefaultData();
                    showNotification('รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่ามาตรฐานแล้ว', 'success');
                  }
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/40 font-medium text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>รีเซ็ตกลับเป็นข้อมูลเริ่มต้น (Reset to Default)</span>
              </button>
            </div>
          </div>

          {/* Import JSON */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-500" />
              นำเข้าข้อมูลจากโค้ด JSON (Import JSON)
            </h2>
            <p className="text-xs text-slate-400">
              วางโค้ด JSON เพื่ออัปเดตหรือแทนที่ฐานข้อมูลมวยไทย:
            </p>
            <textarea
              rows={6}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="วางโค้ด JSON ที่นี่ (เช่น { fights: [...], results: [...], fighters: [...] })"
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleImportJson}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>นำเข้าข้อมูล (Import)</span>
            </button>
          </div>

          {/* Headless CMS & Database Architecture Blueprint */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-500" />
              สถาปัตยกรรมสำหรับเชื่อมต่อฐานข้อมูลภายนอก (Supabase / Firebase / Headless CMS)
            </h2>
            <p className="text-slate-400 leading-relaxed">
              โครงสร้างข้อมูลของ Baanmuaysod ถูกออกแบบมาในรูปแบบ Normalized Collection ที่ตรงกับ Table Schema ของ Relational DB (PostgreSQL / Supabase) และ Document Collection ของ Firebase Firestore หรือ Strapi Headless CMS:
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div>• <code>fights</code>: id, date, time, event_name, venue, province, red_fighter, blue_fighter, weight_class, broadcast, status</div>
              <div>• <code>results</code>: id, date, event_name, venue, red_fighter, blue_fighter, winner, result_type, ending_round, notes</div>
              <div>• <code>fighters</code>: id, name, nickname, camp, age, weight_class, record_wins, record_losses, record_kos, bio</div>
              <div>• <code>events</code>: id, title, date, venue, main_fights, broadcast, event_type</div>
              <div>• <code>news</code>: id, title, category, author, summary, content, tags, created_at</div>
            </div>
            <p className="text-slate-500">
              เมื่อต้องการเชื่อมต่อ สามารถสลับจาก <code>localStorage</code> ไปเรียก <code>fetch('/api/fights')</code> หรือ Supabase Client <code>supabase.from('fights').select()</code> ได้ทันทีโดยไม่ต้องแก้ไขหน้า UI
            </p>
          </div>
        </div>
      )}

      {/* CREATE MODAL POPUP */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative w-full max-w-xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-white">
                {activeSection === 'fights' && 'เพิ่มโปรแกรมคู่ชกใหม่'}
                {activeSection === 'results' && 'บันทึกผลการแข่งขันใหม่'}
                {activeSection === 'fighters' && 'เพิ่มประวัตินักมวยใหม่'}
                {activeSection === 'news' && 'เพิ่มบทความข่าวมวยไทยใหม่'}
                {activeSection === 'events' && 'เพิ่มโปรแกรมศึกใหญ่ใหม่'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕ ปิด
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[70vh] overflow-y-auto">
              {/* FIGHT FORM */}
              {activeSection === 'fights' && (
                <form onSubmit={handleAddFightSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">เวลาชก</label>
                      <input
                        type="text"
                        value={fightForm.time}
                        onChange={e => setFightForm({ ...fightForm, time: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="18:30 น."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">พิกัดน้ำหนัก</label>
                      <input
                        type="text"
                        value={fightForm.weightClass}
                        onChange={e => setFightForm({ ...fightForm, weightClass: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="135 ปอนด์"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">ชื่อรายการ / ศึก</label>
                      <input
                        type="text"
                        value={fightForm.eventName}
                        onChange={e => setFightForm({ ...fightForm, eventName: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="ศึกเพชรยินดี"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">สนามมวย / เวที</label>
                      <input
                        type="text"
                        value={fightForm.venue}
                        onChange={e => setFightForm({ ...fightForm, venue: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="เวทีมวยราชดำเนิน"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">จังหวัด</label>
                      <input
                        type="text"
                        value={fightForm.province}
                        onChange={e => setFightForm({ ...fightForm, province: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="กรุงเทพมหานคร"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">ช่องถ่ายทอดสด</label>
                      <input
                        type="text"
                        value={fightForm.channel}
                        onChange={e => setFightForm({ ...fightForm, channel: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="ทรูโฟร์ยู 24"
                        required
                      />
                    </div>
                  </div>

                  {/* Red Corner */}
                  <div className="p-3 bg-red-950/20 rounded-xl border border-red-500/30 space-y-2">
                    <span className="font-semibold text-red-400 block">ข้อมูลมุมแดง (Red)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ชื่อนักมวย (เช่น รถถัง)"
                        value={fightForm.redName}
                        onChange={e => setFightForm({ ...fightForm, redName: e.target.value })}
                        className="p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ค่ายมวย (เช่น จิตรเมืองนนท์)"
                        value={fightForm.redCamp}
                        onChange={e => setFightForm({ ...fightForm, redCamp: e.target.value })}
                        className="p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Blue Corner */}
                  <div className="p-3 bg-blue-950/20 rounded-xl border border-blue-500/30 space-y-2">
                    <span className="font-semibold text-blue-400 block">ข้อมูลมุมน้ำเงิน (Blue)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ชื่อนักมวย (เช่น ซุปเปอร์บอน)"
                        value={fightForm.blueName}
                        onChange={e => setFightForm({ ...fightForm, blueName: e.target.value })}
                        className="p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ค่ายมวย (เช่น สิงห์มาวิน)"
                        value={fightForm.blueCamp}
                        onChange={e => setFightForm({ ...fightForm, blueCamp: e.target.value })}
                        className="p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fightForm.isMainEvent}
                        onChange={e => setFightForm({ ...fightForm, isMainEvent: e.target.checked })}
                        className="rounded"
                      />
                      <span>กำหนดเป็นคู่เอก (Main Event)</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">สถานะ:</span>
                      <select
                        value={fightForm.status}
                        onChange={e => setFightForm({ ...fightForm, status: e.target.value as any })}
                        className="p-1 bg-slate-950 border border-slate-700 rounded text-slate-200"
                      >
                        <option value="upcoming">รอชก (Upcoming)</option>
                        <option value="live">กำลังชก (Live)</option>
                        <option value="finished">จบแล้ว (Finished)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
                  >
                    บันทึกคู่ชกลงโปรแกรม
                  </button>
                </form>
              )}

              {/* RESULT FORM */}
              {activeSection === 'results' && (
                <form onSubmit={handleAddResultSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">วันที่แข่งขัน</label>
                      <input
                        type="date"
                        value={resultForm.date}
                        onChange={e => setResultForm({ ...resultForm, date: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">พิกัดน้ำหนัก</label>
                      <input
                        type="text"
                        value={resultForm.weightClass}
                        onChange={e => setResultForm({ ...resultForm, weightClass: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">ชื่อรายการ / ศึก</label>
                      <input
                        type="text"
                        value={resultForm.eventName}
                        onChange={e => setResultForm({ ...resultForm, eventName: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">สนามมวย</label>
                      <input
                        type="text"
                        value={resultForm.venue}
                        onChange={e => setResultForm({ ...resultForm, venue: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Red and Blue */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 bg-red-950/20 border border-red-500/30 rounded-lg space-y-1.5">
                      <span className="font-semibold text-red-400">มุมแดง</span>
                      <input
                        type="text"
                        placeholder="ชื่อนักมวย"
                        value={resultForm.redName}
                        onChange={e => setResultForm({ ...resultForm, redName: e.target.value })}
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ค่ายมวย"
                        value={resultForm.redCamp}
                        onChange={e => setResultForm({ ...resultForm, redCamp: e.target.value })}
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-white"
                        required
                      />
                    </div>

                    <div className="p-2.5 bg-blue-950/20 border border-blue-500/30 rounded-lg space-y-1.5">
                      <span className="font-semibold text-blue-400">มุมน้ำเงิน</span>
                      <input
                        type="text"
                        placeholder="ชื่อนักมวย"
                        value={resultForm.blueName}
                        onChange={e => setResultForm({ ...resultForm, blueName: e.target.value })}
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ค่ายมวย"
                        value={resultForm.blueCamp}
                        onChange={e => setResultForm({ ...resultForm, blueCamp: e.target.value })}
                        className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Winner and type */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">ฝ่ายชนะ</label>
                      <select
                        value={resultForm.winner}
                        onChange={e => setResultForm({ ...resultForm, winner: e.target.value as any })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="red">มุมแดง ชนะ</option>
                        <option value="blue">มุมน้ำเงิน ชนะ</option>
                        <option value="draw">เสมอกัน (Draw)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">รูปแบบชัยชนะ</label>
                      <select
                        value={resultForm.resultType}
                        onChange={e => {
                          const val = e.target.value as any;
                          const thaiMap: Record<string, string> = {
                            points: 'ชนะคะแนน',
                            ko: 'ชนะน็อกเอาต์ (KO)',
                            tko: 'ชนะทีเคโอ (TKO)',
                            draw: 'เสมอกัน'
                          };
                          setResultForm({ 
                            ...resultForm, 
                            resultType: val,
                            resultTypeThai: thaiMap[val] || 'ชนะคะแนน'
                          });
                        }}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="points">ชนะคะแนน (Points)</option>
                        <option value="ko">ชนะน็อกเอาต์ (KO)</option>
                        <option value="tko">ชนะทีเคโอ (TKO)</option>
                        <option value="draw">เสมอกัน (Draw)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">ยกที่จบ</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={resultForm.endingRound}
                        onChange={e => setResultForm({ ...resultForm, endingRound: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">สรุปรูปเกม / โน้ต</label>
                    <input
                      type="text"
                      placeholder="สรุปอาวุธทีเด็ด เช่น สาดแข้งขวานับแปดในยกที่ 3"
                      value={resultForm.notes}
                      onChange={e => setResultForm({ ...resultForm, notes: e.target.value })}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
                  >
                    บันทึกผลการชก
                  </button>
                </form>
              )}

              {/* FIGHTER FORM */}
              {activeSection === 'fighters' && (
                <form onSubmit={handleAddFighterSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">ชื่อ-สกุล นักมวย</label>
                      <input
                        type="text"
                        placeholder="เช่น ตะวันฉาย"
                        value={fighterForm.name}
                        onChange={e => setFighterForm({ ...fighterForm, name: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">ฉายา</label>
                      <input
                        type="text"
                        placeholder="เช่น ซ้ายดารา"
                        value={fighterForm.nickname}
                        onChange={e => setFighterForm({ ...fighterForm, nickname: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">ค่ายมวย</label>
                      <input
                        type="text"
                        value={fighterForm.camp}
                        onChange={e => setFighterForm({ ...fighterForm, camp: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="พี.เค.แสนชัย"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">พิกัดน้ำหนัก</label>
                      <input
                        type="text"
                        value={fighterForm.weightClass}
                        onChange={e => setFighterForm({ ...fighterForm, weightClass: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        placeholder="155 ปอนด์"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">อายุ (ปี)</label>
                      <input
                        type="number"
                        value={fighterForm.age}
                        onChange={e => setFighterForm({ ...fighterForm, age: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">ชนะ</label>
                      <input
                        type="number"
                        value={fighterForm.wins}
                        onChange={e => setFighterForm({ ...fighterForm, wins: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">แพ้</label>
                      <input
                        type="number"
                        value={fighterForm.losses}
                        onChange={e => setFighterForm({ ...fighterForm, losses: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">เสมอ</label>
                      <input
                        type="number"
                        value={fighterForm.draws}
                        onChange={e => setFighterForm({ ...fighterForm, draws: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">ชนะ KO</label>
                      <input
                        type="number"
                        value={fighterForm.koWins}
                        onChange={e => setFighterForm({ ...fighterForm, koWins: Number(e.target.value) })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">เชิงมวยและประวัติสังเขป</label>
                    <textarea
                      rows={3}
                      value={fighterForm.bio}
                      onChange={e => setFighterForm({ ...fighterForm, bio: e.target.value })}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      placeholder="เขียนประวัติและเส้นทางมวย..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
                  >
                    บันทึกประวัตินักมวย
                  </button>
                </form>
              )}

              {/* NEWS FORM */}
              {activeSection === 'news' && (
                <form onSubmit={handleAddNewsSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">หัวข้อข่าว</label>
                    <input
                      type="text"
                      placeholder="เช่น ประกาศคู่มวยซูเปอร์ไฟต์..."
                      value={newsForm.title}
                      onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">หมวดหมู่</label>
                      <select
                        value={newsForm.category}
                        onChange={e => {
                          const val = e.target.value as any;
                          const nameMap: Record<string, string> = {
                            fight_announcements: 'ประกาศประกบคู่มวย',
                            fighter_news: 'ข่าวนักมวย',
                            weigh_in: 'ผลการชั่งน้ำหนัก',
                            techniques: 'เทคนิคมวยไทย',
                            culture_history: 'วัฒนธรรมและประวัติศาสตร์'
                          };
                          setNewsForm({
                            ...newsForm,
                            category: val,
                            categoryThai: nameMap[val] || 'ข่าวมวยไทย'
                          });
                        }}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="fight_announcements">ประกาศประกบคู่มวย</option>
                        <option value="fighter_news">ข่าวนักมวย</option>
                        <option value="weigh_in">ผลการชั่งน้ำหนัก</option>
                        <option value="techniques">เทคนิคมวยไทย</option>
                        <option value="culture_history">วัฒนธรรมและประวัติศาสตร์</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">วันที่</label>
                      <input
                        type="date"
                        value={newsForm.date}
                        onChange={e => setNewsForm({ ...newsForm, date: e.target.value })}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">สรุปย่อ (Short Summary)</label>
                    <textarea
                      rows={2}
                      value={newsForm.summary}
                      onChange={e => setNewsForm({ ...newsForm, summary: e.target.value })}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      placeholder="สรุปสั้น 1-2 ประโยค..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">เนื้อหาข่าวฉบับเต็ม</label>
                    <textarea
                      rows={5}
                      value={newsForm.content}
                      onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      placeholder="พิมพ์เนื้อหาข่าว..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors"
                  >
                    เผยแพร่บทความข่าว
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
