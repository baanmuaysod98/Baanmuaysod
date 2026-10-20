import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Fight,
  FightResult,
  FighterProfile,
  MajorEvent,
  NewsArticle,
  MaeMaiTechnique
} from '../types/muaythai';
import {
  INITIAL_FIGHTS,
  INITIAL_RESULTS,
  INITIAL_FIGHTERS,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  MAE_MAI_TECHNIQUES
} from '../data/initialData';

export type AppTab = 'home' | 'today' | 'results' | 'fighters' | 'events' | 'news' | 'mae-mai' | 'cms';

interface MuayThaiContextType {
  fights: Fight[];
  results: FightResult[];
  fighters: FighterProfile[];
  events: MajorEvent[];
  news: NewsArticle[];
  maeMai: MaeMaiTechnique[];
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedFighterId: string | null;
  setSelectedFighterId: (id: string | null) => void;
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // CMS & data operations
  addFight: (fight: Fight) => void;
  updateFight: (fight: Fight) => void;
  deleteFight: (id: string) => void;

  addResult: (result: FightResult) => void;
  updateResult: (result: FightResult) => void;
  deleteResult: (id: string) => void;

  addFighter: (fighter: FighterProfile) => void;
  updateFighter: (fighter: FighterProfile) => void;
  deleteFighter: (id: string) => void;

  addEvent: (event: MajorEvent) => void;
  updateEvent: (event: MajorEvent) => void;
  deleteEvent: (id: string) => void;

  addNews: (news: NewsArticle) => void;
  updateNews: (news: NewsArticle) => void;
  deleteNews: (id: string) => void;

  resetToDefaultData: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
}

const MuayThaiContext = createContext<MuayThaiContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FIGHTS: 'muaythai_fights_v1',
  RESULTS: 'muaythai_results_v1',
  FIGHTERS: 'muaythai_fighters_v1',
  EVENTS: 'muaythai_events_v1',
  NEWS: 'muaythai_news_v1',
};

function getTabFromPathname(): AppTab {
  const path = window.location.pathname.replace(/^\/+/, '');
  if (path === 'today') return 'today';
  if (path === 'results') return 'results';
  if (path === 'fighters') return 'fighters';
  if (path === 'events') return 'events';
  if (path === 'news') return 'news';
  if (path === 'mae-mai' || path === 'maemai') return 'mae-mai';
  if (path === 'cms' || path === 'admin') return 'cms';
  return 'home';
}

export const MuayThaiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fights, setFights] = useState<Fight[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FIGHTS);
      return saved ? JSON.parse(saved) : INITIAL_FIGHTS;
    } catch {
      return INITIAL_FIGHTS;
    }
  });

  const [results, setResults] = useState<FightResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return saved ? JSON.parse(saved) : INITIAL_RESULTS;
    } catch {
      return INITIAL_RESULTS;
    }
  });

  const [fighters, setFighters] = useState<FighterProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FIGHTERS);
      return saved ? JSON.parse(saved) : INITIAL_FIGHTERS;
    } catch {
      return INITIAL_FIGHTERS;
    }
  });

  const [events, setEvents] = useState<MajorEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [maeMai] = useState<MaeMaiTechnique[]>(MAE_MAI_TECHNIQUES);
  const [activeTab, setActiveTabState] = useState<AppTab>(getTabFromPathname);
  const [selectedFighterId, setSelectedFighterId] = useState<string | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromPathname());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setActiveTab = (tab: AppTab) => {
    setActiveTabState(tab);
    const targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    // Scroll to top upon navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FIGHTS, JSON.stringify(fights));
    } catch (e) {
      console.error(e);
    }
  }, [fights]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    } catch (e) {
      console.error(e);
    }
  }, [results]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FIGHTERS, JSON.stringify(fighters));
    } catch (e) {
      console.error(e);
    }
  }, [fighters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error(e);
    }
  }, [news]);

  // Fight CRUD
  const addFight = (fight: Fight) => {
    setFights(prev => [fight, ...prev]);
  };
  const updateFight = (updated: Fight) => {
    setFights(prev => prev.map(f => f.id === updated.id ? updated : f));
  };
  const deleteFight = (id: string) => {
    setFights(prev => prev.filter(f => f.id !== id));
  };

  // Results CRUD
  const addResult = (result: FightResult) => {
    setResults(prev => [result, ...prev]);
  };
  const updateResult = (updated: FightResult) => {
    setResults(prev => prev.map(r => r.id === updated.id ? updated : r));
  };
  const deleteResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  // Fighters CRUD
  const addFighter = (fighter: FighterProfile) => {
    setFighters(prev => [...prev, fighter]);
  };
  const updateFighter = (updated: FighterProfile) => {
    setFighters(prev => prev.map(f => f.id === updated.id ? updated : f));
  };
  const deleteFighter = (id: string) => {
    setFighters(prev => prev.filter(f => f.id !== id));
  };

  // Events CRUD
  const addEvent = (event: MajorEvent) => {
    setEvents(prev => [event, ...prev]);
  };
  const updateEvent = (updated: MajorEvent) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // News CRUD
  const addNews = (article: NewsArticle) => {
    setNews(prev => [article, ...prev]);
  };
  const updateNews = (updated: NewsArticle) => {
    setNews(prev => prev.map(n => n.id === updated.id ? updated : n));
  };
  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // Reset to default
  const resetToDefaultData = () => {
    setFights(INITIAL_FIGHTS);
    setResults(INITIAL_RESULTS);
    setFighters(INITIAL_FIGHTERS);
    setEvents(INITIAL_EVENTS);
    setNews(INITIAL_NEWS);
    localStorage.removeItem(STORAGE_KEYS.FIGHTS);
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    localStorage.removeItem(STORAGE_KEYS.FIGHTERS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
  };

  // Export JSON
  const exportDataJSON = () => {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      fights,
      results,
      fighters,
      events,
      news
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `muaythai_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.fights && Array.isArray(parsed.fights)) setFights(parsed.fights);
      if (parsed.results && Array.isArray(parsed.results)) setResults(parsed.results);
      if (parsed.fighters && Array.isArray(parsed.fighters)) setFighters(parsed.fighters);
      if (parsed.events && Array.isArray(parsed.events)) setEvents(parsed.events);
      if (parsed.news && Array.isArray(parsed.news)) setNews(parsed.news);
      return true;
    } catch (e) {
      console.error('Failed to import JSON', e);
      return false;
    }
  };

  return (
    <MuayThaiContext.Provider
      value={{
        fights,
        results,
        fighters,
        events,
        news,
        maeMai,
        activeTab,
        setActiveTab,
        selectedFighterId,
        setSelectedFighterId,
        selectedNewsId,
        setSelectedNewsId,
        searchQuery,
        setSearchQuery,
        addFight,
        updateFight,
        deleteFight,
        addResult,
        updateResult,
        deleteResult,
        addFighter,
        updateFighter,
        deleteFighter,
        addEvent,
        updateEvent,
        deleteEvent,
        addNews,
        updateNews,
        deleteNews,
        resetToDefaultData,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </MuayThaiContext.Provider>
  );
};

export const useMuayThai = () => {
  const ctx = useContext(MuayThaiContext);
  if (!ctx) {
    throw new Error('useMuayThai must be used within a MuayThaiProvider');
  }
  return ctx;
};
