
import React, { useState, useEffect } from 'react';
import { AppTab, SafetyAlert } from './types';
import { Language, translations } from './i18n';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RiskAnalyzer from './components/RiskAnalyzer';
import VisualEditor from './components/VisualEditor';
import AlertLogs from './components/AlertLogs';
import Devices from './components/Devices';
import BusinessPortal from './components/BusinessPortal';
import EmergencyOverlay from './components/EmergencyOverlay';
import SplashScreen from './components/SplashScreen';
import FireDetails from './components/FireDetails';
import WaterDetails from './components/WaterDetails';
import Settings from './components/Settings';
import Automation from './components/Automation';
import Community from './components/Community';
import Academy from './components/Academy';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('uz');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.SPLASH);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [criticalAlert, setCriticalAlert] = useState<SafetyAlert | null>(null);

  const t = translations[lang];

  const [alerts, setAlerts] = useState<SafetyAlert[]>([
    {
      id: '1',
      type: 'FIRE',
      severity: 'LOW',
      timestamp: new Date(Date.now() - 3600000),
      location: 'Oshxona',
      description: 'Datchik batareyasi past'
    },
    {
      id: '2',
      type: 'WATER',
      severity: 'MEDIUM',
      timestamp: new Date(Date.now() - 172800000),
      location: 'Yerto\'la',
      description: 'Namlik aniqlandi'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  const triggerEmergency = (type: 'FIRE' | 'WATER') => {
    const newAlert: SafetyAlert = {
      id: Date.now().toString(),
      type,
      severity: 'CRITICAL',
      timestamp: new Date(),
      location: 'Zal',
      description: type === 'FIRE' ? t.fire : t.water
    };
    setAlerts(prev => [newAlert, ...prev]);
    setCriticalAlert(newAlert);
  };

  const onBack = () => setActiveTab(AppTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard alerts={alerts} lang={lang} onTriggerDemo={triggerEmergency} setActiveTab={setActiveTab} />;
      case AppTab.FIRE_DETAIL:
        return <FireDetails lang={lang} alerts={alerts} onBack={onBack} />;
      case AppTab.WATER_DETAIL:
        return <WaterDetails lang={lang} alerts={alerts} onBack={onBack} />;
      case AppTab.DEVICES:
        return <Devices lang={lang} onBack={onBack} />;
      case AppTab.RISK_ANALYZER:
        return <RiskAnalyzer lang={lang} onBack={onBack} />;
      case AppTab.VISUAL_EDITOR:
        return <VisualEditor lang={lang} onBack={onBack} />;
      case AppTab.ALERTS:
        return <AlertLogs alerts={alerts} lang={lang} onBack={onBack} />;
      case AppTab.BUSINESS:
        return <BusinessPortal lang={lang} onBack={onBack} />;
      case AppTab.SETTINGS:
        return <Settings lang={lang} onBack={onBack} />;
      case AppTab.AUTOMATION:
        return <Automation lang={lang} onBack={onBack} />;
      case AppTab.COMMUNITY:
        return <Community lang={lang} onBack={onBack} />;
      case AppTab.ACADEMY:
        return <Academy lang={lang} onBack={onBack} />;
      default:
        return <Dashboard alerts={alerts} lang={lang} onTriggerDemo={triggerEmergency} setActiveTab={setActiveTab} />;
    }
  };

  if (activeTab === AppTab.SPLASH) {
    return <SplashScreen lang={lang} onStart={() => setActiveTab(AppTab.DASHBOARD)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-['Plus Jakarta Sans']">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} />
      
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0">
        <Header activeTab={activeTab} lang={lang} lastUpdate={lastUpdate} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />

      {criticalAlert && (
        <EmergencyOverlay 
          alert={criticalAlert} 
          lang={lang} 
          onClose={() => setCriticalAlert(null)} 
        />
      )}
    </div>
  );
};

export default App;
