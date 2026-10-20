import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const AntiGamblingBanner: React.FC = () => {
  return (
    <div className="bg-amber-950/80 border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          <span>
            <strong>นโยบายเว็บไซต์:</strong> เว็บไซต์นี้จัดทำขึ้นเพื่อเผยแพร่ข้อมูลศิลปะและกีฬามวยไทย <strong>ไม่มีและไม่สนับสนุนการพนันทุกชนิด</strong> (This website does not support gambling)
          </span>
        </div>
        <span className="hidden sm:inline-block text-amber-400/80 text-xs shrink-0">
          ข้อมูลกีฬาแท้ 100% ปราศจากอัตราต่อรอง
        </span>
      </div>
    </div>
  );
};
