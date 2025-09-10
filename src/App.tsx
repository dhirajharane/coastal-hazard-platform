import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { CitizenReporting } from './components/CitizenReporting';
import { Dashboard } from './components/Dashboard';
import { ReportDetails } from './components/ReportDetails';
import { SocialFeed } from './components/SocialFeed';
import { Analytics } from './components/Analytics';
import { MyReports } from './components/MyReports';
import { AdminSettings } from './components/AdminSettings';
import { EmergencyReport } from './components/EmergencyReport';

type Screen = 'landing' | 'auth' | 'citizen-reporting' | 'dashboard' | 'report-details' | 'social-feed' | 'analytics' | 'my-reports' | 'admin-settings' | 'emergency-report';

type User = {
  id: string;
  email: string;
  role: 'citizen' | 'analyst' | 'official';
  username: string;
};

type UserRole = 'citizen' | 'analyst' | 'official';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  // Mock offline/online status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly go offline/online for demo purposes
      setIsOffline(Math.random() < 0.1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (screen: Screen, reportId?: string, role?: UserRole) => {
    setCurrentScreen(screen);
    if (reportId) setSelectedReportId(reportId);
    if (role) setPendingRole(role);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'citizen') {
      navigateTo('citizen-reporting');
    } else {
      navigateTo('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('landing');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onNavigate={navigateTo} pendingRole={pendingRole} />;
      case 'citizen-reporting':
        return <CitizenReporting user={user} onNavigate={navigateTo} isOffline={isOffline} />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'report-details':
        return <ReportDetails reportId={selectedReportId} user={user} onNavigate={navigateTo} />;
      case 'social-feed':
        return <SocialFeed user={user} onNavigate={navigateTo} />;
      case 'analytics':
        return <Analytics user={user} onNavigate={navigateTo} />;
      case 'my-reports':
        return <MyReports user={user} onNavigate={navigateTo} />;
      case 'admin-settings':
        return <AdminSettings user={user} onNavigate={navigateTo} />;
      case 'emergency-report':
        return <EmergencyReport onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}