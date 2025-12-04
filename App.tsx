import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Vision } from './pages/Vision';
import { Schedule } from './pages/Schedule';
import { Announcements } from './pages/Announcements';
import { Results } from './pages/Results';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Teachers } from './pages/Teachers';
import { PageView } from './types';
import { SchoolProvider } from './context/SchoolContext';

function AppContent() {
  const [activePage, setActivePage] = useState<PageView>(PageView.HOME);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case PageView.HOME:
        return <Home onNavigate={setActivePage} />;
      case PageView.VISION:
        return <Vision />;
      case PageView.SCHEDULE:
        return <Schedule />;
      case PageView.ANNOUNCEMENTS:
        return <Announcements />;
      case PageView.RESULTS:
        return <Results />;
      case PageView.TEACHERS:
        return <Teachers />;
      case PageView.CONTACT:
        return <Contact />;
      case PageView.LOGIN:
        return <Login onNavigate={setActivePage} />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-slate-50">
      <Header onNavigate={setActivePage} activePage={activePage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={setActivePage} />
    </div>
  );
}

function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}

export default App;