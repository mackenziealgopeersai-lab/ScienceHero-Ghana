
import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import Quiz from './components/Quiz';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('welcome');

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return <Welcome onStart={() => handleNavigate('dashboard')} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatBot onBack={() => handleNavigate('dashboard')} />;
      case 'quiz':
        return <Quiz onBack={() => handleNavigate('dashboard')} />;
      default:
        return <Welcome onStart={() => handleNavigate('dashboard')} />;
    }
  };

  return (
    <div className="antialiased text-slate-900 bg-[#FDFCF0] min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
