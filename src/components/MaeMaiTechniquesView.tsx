import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  CheckCircle, 
  Target, 
  Sparkles, 
  ChevronRight, 
  X,
  Crosshair
} from 'lucide-react';
import { useMuayThai } from '../context/MuayThaiContext';
import { MaeMaiTechnique } from '../types/muaythai';

export const MaeMaiTechniquesView: React.FC = () => {
  const { maeMai } = useMuayThai();
  const [selectedTech, setSelectedTech] = useState<MaeMaiTechnique | null>(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Culture Heritage Banner */}
      <div className="relative rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-4 z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>ศาสตร์และศิลป์การต่อสู้ประจำชาติไทย</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
              15 ท่าแม่ไม้มวยไทยโบราณ <br />
              <span className="text-amber-400">Mae Mai Muay Thai 15 Core Techniques</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              แม่ไม้มวยไทยคือแบบฉบับท่ากลการต่อสู้ขั้นพื้นฐานที่สืบทอดกันมาแต่โบราณ ถือเป็นรากฐานสำคัญในการป้องกันตัว หลบหลีก และสวนกลับด้วยหมัด เท้า เข่า ศอก อย่างแม่นยำและเปี่ยมด้วยพลศาสตร์
            </p>

            {/* Mandatory Safety Warning Banner */}
            <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-semibold mb-0.5">
                  คำเตือนด้านความปลอดภัย (Safety Warning):
                </strong>
                ท่าแม่ไม้มวยไทยเป็นศิลปะการต่อสู้ขั้นสูงที่มีพลังทำลายล้าง ผู้สนใจควรฝึกฝนภายใต้การดูแลและคำแนะนำของครูมวยหรือผู้ฝึกสอนที่ผ่านการรับรองเท่านั้น ห้ามนำไปใช้เล่นอย่างประมาท
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[320px]">
            <img
              src="/src/assets/images/muay_thai_mae_mai_training_1791883705434.jpg"
              alt="การสาธิตท่าแม่ไม้มวยไทยโบราณ"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Grid of 15 Techniques */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            รวม 15 ท่ากลแม่ไม้มวยไทยฉบับสมบูรณ์
          </h2>
          <span className="text-xs text-slate-400">คลิกที่การ์ดเพื่อดูรายละเอียดกลยุทธ์และการเข้าทำ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {maeMai.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all p-5 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-amber-950/20"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-heading font-bold text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/20">
                    ท่าที่ {tech.id}
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">
                    แก้ทาง: {tech.counterAgainst.split(' ')[0]}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                  {tech.nameThai}
                </h3>
                <p className="text-xs text-slate-400 font-mono italic">
                  {tech.nameEnglish}
                </p>

                <div className="mt-3 text-xs text-slate-300 space-y-1.5">
                  <p>
                    <strong className="text-slate-400">ความหมาย:</strong> {tech.meaning}
                  </p>
                  <p>
                    <strong className="text-slate-400">วัตถุประสงค์:</strong> {tech.purpose}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span className="flex items-center gap-1 text-slate-400 group-hover:text-amber-300 transition-colors">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  เป้าหมาย: {tech.targetArea}
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Technique Detailed Modal */}
      {selectedTech && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedTech(null)}
        >
          <div
            className="relative w-full max-w-2xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700"
              aria-label="ปิดกล่องข้อมูล"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 sm:p-7 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <span>แม่ไม้มวยไทย ท่าที่ {selectedTech.id} จาก 15 ท่า</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {selectedTech.nameThai}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-mono italic mt-0.5">
                {selectedTech.nameEnglish}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7 space-y-5 max-h-[60vh] overflow-y-auto text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">ความหมายของชื่อท่า</span>
                  <span className="text-white font-medium">{selectedTech.meaning}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">ใช้แก้ทางอาวุธ</span>
                  <span className="text-amber-400 font-medium">{selectedTech.counterAgainst}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-amber-400" />
                  เป้าหมายจุดกระทบและวัตถุประสงค์
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedTech.purpose} — โดยมีจุดปะทะหลักที่ <strong>{selectedTech.targetArea}</strong>
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  คำอธิบายการเข้าทำ (Tactical Strategy)
                </h3>
                <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  {selectedTech.description}
                </p>
              </div>

              {/* Execution Steps */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ขั้นตอนการฝึกและปฏิบัติ (Step-by-Step)
                </h3>
                <ol className="space-y-2">
                  {selectedTech.executionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Safety warning */}
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedTech.safetyWarning}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
