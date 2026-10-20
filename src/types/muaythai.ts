export type FightStatus = 'upcoming' | 'live' | 'finished';

export interface FighterBrief {
  id?: string;
  name: string;
  camp: string;
  weight?: string;
}

export interface Fight {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g., "18:15 น."
  eventName: string; // e.g., "ศึกเพชรยินดี", "ศึก RWS"
  venue: string; // e.g., "เวทีมวยราชดำเนิน"
  province: string; // e.g., "กรุงเทพมหานคร"
  redFighter: FighterBrief;
  blueFighter: FighterBrief;
  weightClass: string; // e.g., "135 ปอนด์ (ไลต์เวต)"
  broadcast: {
    channel: string; // e.g., "ทรูโฟร์ยู 24", "ช่อง 7HD"
    url?: string;
    isLiveStream?: boolean;
  };
  status: FightStatus;
  isMainEvent?: boolean;
  roundInfo?: string; // e.g., "ยกที่ 3 จาก 5"
}

export type ResultType = 'points' | 'ko' | 'tko' | 'draw' | 'no_contest';

export interface FightResult {
  id: string;
  date: string; // YYYY-MM-DD
  eventName: string;
  venue: string;
  province: string;
  redFighter: FighterBrief;
  blueFighter: FighterBrief;
  winner: 'red' | 'blue' | 'draw' | 'no_contest';
  winnerName: string;
  resultType: ResultType;
  resultTypeThai: string; // "ชนะคะแนน", "ชนะน็อกเอาต์ (KO)", "ชนะทีเคโอ (TKO)", "เสมอ", "ไม่มีการตัดสิน"
  endingRound: number | null; // e.g. 3
  weightClass: string;
  notes?: string;
}

export interface FighterHistoryItem {
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw' | 'no_contest';
  method: string; // e.g. "ชนะคะแนน", "ชนะ KO ยก 2"
  event: string;
  venue: string;
}

export interface FighterProfile {
  id: string;
  name: string; // e.g. "รถถัง จิตรเมืองนนท์"
  nickname: string; // e.g. "ดิไอรอนแมน (The Iron Man)"
  camp: string; // e.g. "ค่ายจิตรเมืองนนท์"
  age: number;
  weightClass: string; // e.g. "ฟลายเวต (135 ปอนด์)"
  height: string; // e.g. "168 ซม."
  hometown: string; // e.g. "พัทลุง"
  style: string; // e.g. "มวยบู๊ บ้าบิ่น เดินหน้าดุดัน"
  record: {
    wins: number;
    losses: number;
    draws: number;
    koWins: number;
  };
  image: string;
  bio: string;
  achievements: string[];
  recentHistory: FighterHistoryItem[];
}

export type EventStatus = 'upcoming' | 'completed';
export type EventCategory = 'championship' | 'weekly_major' | 'special_tournament';

export interface MajorEventFightCard {
  red: string;
  blue: string;
  weight: string;
  titleFight?: string; // e.g. "ชิงเข็มขัดแชมเปี้ยนรุ่น 135 ปอนด์"
}

export interface MajorEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  province: string;
  status: EventStatus;
  eventType: EventCategory;
  eventTypeThai: string;
  mainFights: MajorEventFightCard[];
  broadcast: string;
  description: string;
  image?: string;
}

export type NewsCategory = 
  | 'fight_announcements' 
  | 'fighter_news' 
  | 'weigh_in' 
  | 'techniques' 
  | 'culture_history';

export interface NewsArticle {
  id: string;
  title: string;
  category: NewsCategory;
  categoryThai: string;
  date: string; // YYYY-MM-DD
  author: string;
  summary: string;
  content: string;
  image?: string;
  tags: string[];
}

export interface MaeMaiTechnique {
  id: number;
  nameThai: string;
  nameEnglish: string;
  meaning: string;
  purpose: string;
  description: string;
  counterAgainst: string;
  targetArea: string;
  executionSteps: string[];
  safetyWarning: string;
  image?: string;
}
