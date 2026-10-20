import React from 'react';
import { MuayThaiProvider, useMuayThai } from './context/MuayThaiContext';
import { AntiGamblingBanner } from './components/AntiGamblingBanner';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { TodayFightsView } from './components/TodayFightsView';
import { ResultsView } from './components/ResultsView';
import { FightersView } from './components/FightersView';
import { EventsCalendarView } from './components/EventsCalendarView';
import { NewsView } from './components/NewsView';
import { MaeMaiTechniquesView } from './components/MaeMaiTechniquesView';
import { CmsDataManagerModal } from './components/CmsDataManagerModal';
import { FighterDetailModal } from './components/FighterDetailModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useMuayThai();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Visible Anti-Gambling Policy Banner */}
      <AntiGamblingBanner />

      {/* 2. Top Navigation Bar & Mobile Tab Bar */}
      <Navbar />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && <HomeHero />}
        {activeTab === 'today' && <TodayFightsView />}
        {activeTab === 'results' && <ResultsView />}
        {activeTab === 'fighters' && <FightersView />}
        {activeTab === 'events' && <EventsCalendarView />}
        {activeTab === 'news' && <NewsView />}
        {activeTab === 'mae-mai' && <MaeMaiTechniquesView />}
        {activeTab === 'cms' && <CmsDataManagerModal />}
      </main>

      {/* 4. Global Modals */}
      <FighterDetailModal />
      <NewsDetailModal />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <MuayThaiProvider>
      <AppContent />
    </MuayThaiProvider>
  );
}
