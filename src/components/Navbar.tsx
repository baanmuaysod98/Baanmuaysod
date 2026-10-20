import React from 'react';
import { 
  Flame, 
  Calendar, 
  Trophy, 
  Users, 
  Newspaper, 
  BookOpen, 
  Database,
  Home
} from 'lucide-react';
import { useMuayThai, AppTab } from '../context/MuayThaiContext';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useMuayThai();

  const navLinks: { tab: AppTab; label: string }[] = [
    { tab: 'home', label: 'หน้าแรก' },
    { tab: 'today', label: 'โปรแกรมวันนี้' },
    { tab: 'results', label: 'ผลมวยล่าสุด' },
    { tab: 'fighters', label: 'ทำเนียบนักมวย' },
    { tab: 'events', label: 'ปฏิทินศึกใหญ่' },
    { tab: 'news', label: 'ข่าวสาร' },
    { tab: 'mae-mai', label: '15 แม่ไม้มวยไทย' },
  ];

  return (
    <>
      {/* Desktop & Tablet Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-950/40">
              <Flame className="w-5 h-5 text-amber-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg md:text-xl text-white tracking-wider uppercase leading-none group-hover:text-amber-400 transition-colors">
                BAANMUAYSOD
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                บ้านมวยสด
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 font-medium ${
                  activeTab === item.tab
                    ? 'text-amber-400 border-amber-400 font-semibold'
                    : 'text-slate-300 border-transparent hover:text-white hover:border-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('cms')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'cms'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>จัดการข้อมูล (CMS)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb-zone ergonomic, <= 15% sticky height) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 safe-bottom">
        <div className="grid grid-cols-5 items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-1 min-h-[44px] ${
              activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 truncate">หน้าแรก</span>
          </button>

          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center justify-center py-1 min-h-[44px] ${
              activeTab === 'today' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 truncate">มวยวันนี้</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center justify-center py-1 min-h-[44px] ${
              activeTab === 'results' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 truncate">ผลมวย</span>
          </button>

          <button
            onClick={() => setActiveTab('fighters')}
            className={`flex flex-col items-center justify-center py-1 min-h-[44px] ${
              activeTab === 'fighters' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 truncate">นักมวย</span>
          </button>

          <button
            onClick={() => setActiveTab('mae-mai')}
            className={`flex flex-col items-center justify-center py-1 min-h-[44px] ${
              activeTab === 'mae-mai' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 truncate">15 แม่ไม้</span>
          </button>
        </div>
      </nav>
    </>
  );
};
