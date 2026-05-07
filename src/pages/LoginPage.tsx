import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type Mode = 'login' | 'signup';

interface LoginPageProps {
  onSuccess: () => void;
  onBack:    () => void;
}

export default function LoginPage({ onSuccess, onBack }: LoginPageProps) {
  const { signUp, logIn, loading } = useAuth();

  const [mode, setMode]         = useState<Mode>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [branch, setBranch]     = useState('');
  const [year, setYear]         = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [info, setInfo]         = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    // Basic validation
    if (!email.trim())    { setError('Please enter your email.');    return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (mode === 'signup' && !name.trim())   { setError('Please enter your full name.'); return; }
    if (mode === 'signup' && !branch)        { setError('Please select your branch.');   return; }
    if (mode === 'signup' && !year)          { setError('Please select your year.');     return; }

    if (mode === 'signup') {
      const err = await signUp(email, password, name, branch, year);
      if (err) { setError(err); return; }
      setInfo('Account created! Please check your email to verify, then log in.');
      setMode('login');
    } else {
      const err = await logIn(email, password);
      if (err) { setError(err); return; }
      onSuccess();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    border: '0.5px solid #d1d5db', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── LEFT: Branding ── */}
      <div style={{ background: 'linear-gradient(145deg, #0F6E56 0%, #1D9E75 60%, #2dbd8e 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 48, color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Skill<span style={{ color: '#a7f3d0' }}>Hub</span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 48 }}>Campus Skill Marketplace</div>
        <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3, marginBottom: 16, maxWidth: 300 }}>
          Turn your skills into a steady income
        </h2>
        <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, maxWidth: 300, marginBottom: 40 }}>
          Join 500+ Woxsen students who are already earning by offering their skills to fellow students.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 300 }}>
          {[['₹4.2L+', 'Paid to students'], ['1,200+', 'Services listed'], ['4.8★', 'Avg. rating'], ['500+', 'Active students']].map(([v, l]) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 16px', textAlign: 'left' }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '18px 22px', maxWidth: 300, textAlign: 'left' }}>
          <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.9, marginBottom: 8, fontStyle: 'italic' }}>
            "I earned ₹12,000 in my first month just by helping juniors with assignments."
          </p>
          <div style={{ fontSize: 12, opacity: 0.7 }}>— Neha R., B.Tech ECE · 2nd year</div>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px 64px' }}>

        {/* Back */}
        <div style={{ width: '100%', maxWidth: 400, marginBottom: 28 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 13, color: '#888', cursor: 'pointer', padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1D9E75')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
            ← Back to home
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {(['login', 'signup'] as Mode[]).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setInfo(''); }}
                style={{ flex: 1, padding: 9, borderRadius: 8, border: 'none', cursor: 'pointer', background: mode === m ? '#fff' : 'transparent', color: mode === m ? '#1a1a1a' : '#888', fontWeight: mode === m ? 600 : 400, fontSize: 14, boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                {m === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
            {mode === 'login' ? 'Log in to access your SkillHub dashboard.' : 'Join with your university email.'}
          </p>

          {/* Info message (after signup) */}
          {info && (
            <div style={{ background: '#E1F5EE', color: '#0F6E56', fontSize: 12, padding: '10px 14px', borderRadius: 8, marginBottom: 16 }}>
              ✓ {info}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            {mode === 'signup' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 500 }}>Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Arjun Kumar" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1D9E75')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')} />
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 500 }}>University email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@woxsen.edu.in" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1D9E75')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: mode === 'signup' ? 14 : 22 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters" style={{ ...inputStyle, paddingRight: 52 }}
                  onFocus={e => (e.target.style.borderColor = '#1D9E75')}
                  onBlur={e => (e.target.style.borderColor = '#d1d5db')} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 12 }}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Branch + Year */}
            {mode === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 500 }}>Branch</label>
                  <select value={branch} onChange={e => setBranch(e.target.value)}
                    style={{ ...inputStyle, background: '#fff' }}>
                    <option value="">Select</option>
                    {['B.Tech CSE', 'B.Tech ECE', 'BBA', 'B.Des', 'MBA', 'Other'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 500 }}>Year</label>
                  <select value={year} onChange={e => setYear(e.target.value)}
                    style={{ ...inputStyle, background: '#fff' }}>
                    <option value="">Select</option>
                    {['1st year', '2nd year', '3rd year', '4th year'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ background: '#FCEBEB', color: '#A32D2D', fontSize: 12, padding: '10px 14px', borderRadius: 8, marginBottom: 14 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: loading ? '#9FE1CB' : '#1D9E75', color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#0F6E56'); }}
              onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = loading ? '#9FE1CB' : '#1D9E75'); }}>
              {loading ? (mode === 'login' ? 'Logging in…' : 'Creating account…') : (mode === 'login' ? 'Log in' : 'Create account')}
            </button>

          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 20 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setInfo(''); }}
              style={{ background: 'none', border: 'none', color: '#1D9E75', cursor: 'pointer', fontWeight: 600, fontSize: 12, padding: 0 }}>
              {mode === 'login' ? 'Sign up free' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
