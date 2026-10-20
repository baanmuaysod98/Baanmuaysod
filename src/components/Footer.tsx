import React from 'react';
import { Flame, ShieldAlert, Award, Heart } from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useMuayThai();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16">
      {/* Policy banner inside footer */}
      <div className="bg-amber-950/40 border-b border-amber-500/20 py-4 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-amber-300 font-medium text-xs sm:text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>นโยบายเว็บไซต์:</strong> เว็บไซต์นี้ไม่มีและไม่สนับสนุนการพนันทุกชนิด (This website does not support gambling)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white">
              <Flame className="w-4 h-4 text-amber-200" />
            </div>
            <span className="font-heading font-bold text-base text-white tracking-wider uppercase">
              BAANMUAYSOD (บ้านมวยสด)
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            BAANMUAYSOD ศูนย์กลางข้อมูลสารสนเทศศิลปะและกีฬามวยไทยแห่งชาติ รายงานโปรแกรมการแข่งขัน ผลมวย สถิตินักมวย และแม่ไม้มวยไทยโบราณ เพื่อการอนุรักษ์และส่งเสริมกีฬาประจำชาติ
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-white text-sm">เมนูหลัก</h3>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                หน้าแรก
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('today')} className="hover:text-amber-400 transition-colors">
                โปรแกรมมวยวันนี้
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('results')} className="hover:text-amber-400 transition-colors">
                ผลการแข่งขันล่าสุด
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('fighters')} className="hover:text-amber-400 transition-colors">
                ทำเนียบยอดมวยไทย
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('events')} className="hover:text-amber-400 transition-colors">
                ปฏิทินศึกใหญ่
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Education & Heritage */}
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-white text-sm">สาระและมรดกวัฒนธรรม</h3>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => setActiveTab('mae-mai')} className="hover:text-amber-400 transition-colors">
                15 ท่าแม่ไม้มวยไทย
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('news')} className="hover:text-amber-400 transition-colors">
                บทความและประวัติศาสตร์
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('cms')} className="hover:text-amber-400 transition-colors">
                จัดการข้อมูล (CMS / Backup)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Recognized Stadiums */}
        <div className="space-y-2">
          <h3 className="font-heading font-semibold text-white text-sm">เวทีมวยมาตรฐานในไทย</h3>
          <p className="text-slate-400 leading-relaxed text-xs">
            เวทีมวยราชดำเนิน · เวทีมวยลุมพินี · เวทีมวยช่อง 7 สี · เวทีมวยสยามอ้อมน้อย · เวทีนานาชาติรังสิต · พัทยาบ็อกซิ่งเวิลด์
          </p>
          <div className="pt-2 text-slate-500 text-[11px]">
            ขับเคลื่อนด้วยระบบข้อมูลที่ยืดหยุ่น รองรับการเชื่อมต่อ REST API, Supabase และ Firebase
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 px-4 text-center text-slate-500 text-xs">
        <p>© 2026 Baanmuaysod (บ้านมวยสด) · สงวนลิขสิทธิ์ทุกประการ · ปราศจากการพนันและสิ่งผิดกฎหมายทุกรูปแบบ</p>
      </div>
    </footer>
  );
};
