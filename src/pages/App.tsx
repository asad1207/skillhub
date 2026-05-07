import { useAuth } from '../hooks/useAuth';
import LandingPage from './LandingPage';
import LoginPage   from './LoginPage';
import Dashboard   from './Dashboard';

// Re-export Page type (kept for any future imports)
export type Page = 'browse' | 'orders' | 'chat' | 'wallet' | 'profile' | 'admin';

type AppView = 'landing' | 'login';

import { useState } from 'react';

export default function App() {
  const { user, loading, logOut } = useAuth();
  const [view, setView] = useState<AppView>('landing');

  // ── Loading spinner while Supabase checks session ──
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, color: '#1D9E75', fontWeight: 700, marginBottom: 8 }}>SkillHub</div>
          <div style={{ fontSize: 13, color: '#888' }}>Loading…</div>
        </div>
      </div>
    );
  }

  // ── If logged in → show dashboard ──
  if (user) {
    return <Dashboard user={user} onLogout={logOut} />;
  }

  // ── Not logged in → landing or login ──
  if (view === 'login') {
    return (
      <LoginPage
        onSuccess={() => {}}   // useAuth listener auto-detects login
        onBack={() => setView('landing')}
      />
    );
  }

  return (
    <LandingPage
      onGetStarted={() => setView('login')}
      onLogin={() => setView('login')}
    />
  );
}
