import { useState } from 'react';
import type { AuthUser } from '../hooks/useAuth';

interface DashboardProps {
  user: AuthUser;
  onLogout: () => void;
}

const categories = [
  { icon: '💻', label: 'Web Dev',      color: '#E6F1FB', text: '#185FA5', count: 34 },
  { icon: '🎨', label: 'Design',       color: '#EEEDFE', text: '#3C3489', count: 28 },
  { icon: '✍️', label: 'Writing',      color: '#EAF3DE', text: '#27500A', count: 19 },
  { icon: '🎬', label: 'Video',        color: '#FAECE7', text: '#712B13', count: 22 },
  { icon: '📊', label: 'Data Science', color: '#E1F5EE', text: '#0F6E56', count: 15 },
  { icon: '🎵', label: 'Music',        color: '#FAEEDA', text: '#633806', count: 6  },
];

const services = [
  { title: 'React landing page',     category: 'Web Dev',   price: 800,  seller: 'Rahul K.',  rating: 5,   catColor: '#E6F1FB', catText: '#185FA5', avatar: 'RK', delivery: '3 days' },
  { title: 'Logo & brand identity',  category: 'Design',    price: 500,  seller: 'Priya S.',  rating: 4.5, catColor: '#EEEDFE', catText: '#3C3489', avatar: 'PS', delivery: '2 days' },
  { title: 'Research paper editing', category: 'Writing',   price: 300,  seller: 'Ananya M.', rating: 5,   catColor: '#EAF3DE', catText: '#27500A', avatar: 'AM', delivery: '1 day'  },
  { title: 'YouTube reel editing',   category: 'Video',     price: 600,  seller: 'Karan V.',  rating: 4,   catColor: '#FAECE7', catText: '#712B13', avatar: 'KV', delivery: '3 days' },
  { title: 'Python data analysis',   category: 'Web Dev',   price: 700,  seller: 'Sneha R.',  rating: 5,   catColor: '#E6F1FB', catText: '#185FA5', avatar: 'SR', delivery: '2 days' },
  { title: 'Figma UI prototype',     category: 'Design',    price: 650,  seller: 'Arjun T.',  rating: 4.5, catColor: '#EEEDFE', catText: '#3C3489', avatar: 'AT', delivery: '4 days' },
];

type NavPage = 'home' | 'browse' | 'orders' | 'profile';

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [page, setPage]             = useState<NavPage>('home');
  const [dropdownOpen, setDropdown] = useState(false);
  const [hoveredCard, setHovered]   = useState<number | null>(null);
  const [activeCategory, setCategory] = useState<string>('All');
  const [search, setSearch]         = useState('');
  const [orderedService, setOrdered] = useState<string | null>(null);

  const filtered = services.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.seller.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOrder = (title: string) => {
    setOrdered(title);
    setTimeout(() => setOrdered(null), 3000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', background: '#f9fafb' }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fff', borderBottom: '0.5px solid #e5e7eb', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1D9E75', cursor: 'pointer' }} onClick={() => setPage('home')}>
          Skill<span style={{ color: '#1a1a1a' }}>Hub</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {([
            { label: 'Home',    page: 'home'    },
            { label: 'Browse',  page: 'browse'  },
            { label: 'Orders',  page: 'orders'  },
            { label: 'Profile', page: 'profile' },
          ] as { label: string; page: NavPage }[]).map(item => (
            <button key={item.page} onClick={() => setPage(item.page)}
              style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, background: page === item.page ? '#f3f4f6' : 'transparent', color: page === item.page ? '#1a1a1a' : '#666', fontWeight: page === item.page ? 500 : 400, transition: 'all 0.15s' }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: avatar + dropdown */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDropdown(!dropdownOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '0.5px solid #e5e7eb', borderRadius: 20, padding: '5px 12px 5px 5px', cursor: 'pointer' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
              {user.initials}
            </div>
            <span style={{ fontSize: 13, color: '#333', fontWeight: 500 }}>{user.name.split(' ')[0]}</span>
            <span style={{ fontSize: 10, color: '#888' }}>▾</span>
          </button>

          {dropdownOpen && (
            <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 200, zIndex: 200, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: '0.5px solid #f0f0f0' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{user.email}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{user.branch} · {user.year}</div>
              </div>
              {[
                { label: 'My profile', pg: 'profile' as NavPage },
                { label: 'My orders',  pg: 'orders'  as NavPage },
              ].map(item => (
                <button key={item.label} onClick={() => { setPage(item.pg); setDropdown(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', fontSize: 13, color: '#333', cursor: 'pointer', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                  {item.label}
                </button>
              ))}
              <div style={{ height: '0.5px', background: '#f0f0f0' }} />
              <button onClick={() => { setDropdown(false); onLogout(); }}
                style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', fontSize: 13, color: '#dc2626', cursor: 'pointer', display: 'block' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FCEBEB')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── ORDER SUCCESS TOAST ── */}
      {orderedService && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0F6E56', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 500, zIndex: 300, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ✓ Order placed for "{orderedService}"
        </div>
      )}

      <main style={{ paddingTop: 56 }}>

        {/* ══════════════ HOME PAGE ══════════════ */}
        {page === 'home' && (
          <div>
            {/* Welcome hero */}
            <div style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #f8faff 100%)', padding: '48px 48px 40px', borderBottom: '0.5px solid #e5e7eb' }}>
              <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Welcome back</div>
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                  Hey, {user.name.split(' ')[0]}! 👋
                </h1>
                <p style={{ fontSize: 15, color: '#666', marginBottom: 28 }}>
                  Ready to earn or find a skill today?
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setPage('browse')}
                    style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0F6E56')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#1D9E75')}>
                    Browse services
                  </button>
                  <button
                    style={{ padding: '11px 24px', borderRadius: 10, border: '1.5px solid #1D9E75', background: '#fff', color: '#1D9E75', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                    + List a service
                  </button>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: 960, margin: '0 auto', padding: '36px 48px' }}>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
                {[
                  { label: 'Services available', value: '124', icon: '🛍️' },
                  { label: 'Students earning',   value: '48',  icon: '💰' },
                  { label: 'Orders completed',   value: '312', icon: '✅' },
                  { label: 'Avg. rating',        value: '4.8★', icon: '⭐' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1D9E75', marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Browse by category</div>
                  <button onClick={() => setPage('browse')} style={{ background: 'none', border: 'none', color: '#1D9E75', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>View all →</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
                  {categories.map(cat => (
                    <div key={cat.label} onClick={() => { setPage('browse'); setCategory(cat.label); }}
                      style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 14, padding: '18px 10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = cat.color; (e.currentTarget as HTMLDivElement).style.borderColor = cat.text; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                      <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#333' }}>{cat.label}</div>
                      <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{cat.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured services */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Featured services</div>
                  <button onClick={() => setPage('browse')} style={{ background: 'none', border: 'none', color: '#1D9E75', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Browse all →</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {services.slice(0, 3).map((s, i) => (
                    <div key={i}
                      style={{ background: '#fff', border: hoveredCard === i ? '1.5px solid #1D9E75' : '0.5px solid #e5e7eb', borderRadius: 14, padding: 18, cursor: 'pointer', transition: 'all 0.2s', transform: hoveredCard === i ? 'translateY(-3px)' : 'none', boxShadow: hoveredCard === i ? '0 8px 24px rgba(0,0,0,0.07)' : 'none' }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 6, background: s.catColor, color: s.catText, display: 'inline-block', marginBottom: 10 }}>{s.category}</span>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>⏱ {s.delivery}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1D9E75' }}>₹ {s.price.toLocaleString()}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>{'★'.repeat(Math.round(s.rating))} {s.seller}</div>
                      </div>
                      <button onClick={() => handleOrder(s.title)}
                        style={{ width: '100%', marginTop: 12, padding: '8px', borderRadius: 8, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#0F6E56')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#1D9E75')}>
                        Order now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ BROWSE PAGE ══════════════ */}
        {page === 'browse' && (
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '36px 48px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Browse services</h2>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>Find the skill you need from fellow students.</p>

            {/* Search + filter */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search services or sellers…"
                style={{ flex: 1, padding: '10px 16px', borderRadius: 10, border: '0.5px solid #d1d5db', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                onFocus={e => (e.target.style.borderColor = '#1D9E75')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')} />
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
              {['All', ...categories.map(c => c.label)].map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{ padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, background: activeCategory === cat ? '#1D9E75' : '#fff', color: activeCategory === cat ? '#fff' : '#555', border: activeCategory === cat ? 'none' : '0.5px solid #e5e7eb', transition: 'all 0.15s' } as React.CSSProperties}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Service grid */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 15 }}>No services found. Try a different search.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {filtered.map((s, i) => (
                  <div key={i}
                    style={{ background: '#fff', border: hoveredCard === i + 100 ? '1.5px solid #1D9E75' : '0.5px solid #e5e7eb', borderRadius: 14, padding: 18, cursor: 'pointer', transition: 'all 0.2s', transform: hoveredCard === i + 100 ? 'translateY(-3px)' : 'none', boxShadow: hoveredCard === i + 100 ? '0 8px 24px rgba(0,0,0,0.07)' : 'none' }}
                    onMouseEnter={() => setHovered(i + 100)}
                    onMouseLeave={() => setHovered(null)}>
                    <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 6, background: s.catColor, color: s.catText, display: 'inline-block', marginBottom: 10 }}>{s.category}</span>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>⏱ {s.delivery}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#1D9E75' }}>₹ {s.price.toLocaleString()}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>{'★'.repeat(Math.round(s.rating))}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600 }}>{s.avatar}</div>
                      <span style={{ fontSize: 12, color: '#888' }}>{s.seller}</span>
                    </div>
                    <button onClick={() => handleOrder(s.title)}
                      style={{ width: '100%', padding: '9px', borderRadius: 8, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#0F6E56')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#1D9E75')}>
                      Order now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ ORDERS PAGE ══════════════ */}
        {page === 'orders' && (
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '36px 48px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>My orders</h2>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>Track and manage your orders here.</p>
            <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>No orders yet</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>When you place an order it will appear here.</div>
              <button onClick={() => setPage('browse')}
                style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                Browse services
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ PROFILE PAGE ══════════════ */}
        {page === 'profile' && (
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '36px 48px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 28 }}>My profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* Profile card */}
              <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 600, border: '0.5px solid #9FE1CB' }}>
                    {user.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{user.branch} · {user.year}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ borderTop: '0.5px solid #f0f0f0', paddingTop: 16 }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>University</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Woxsen University</div>
                </div>
              </div>

              {/* Earnings placeholder */}
              <div style={{ background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Earnings</div>
                <div style={{ background: '#f9fafb', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#1D9E75' }}>₹ 0</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Total earned</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: '#f9fafb', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>0</div>
                    <div style={{ fontSize: 11, color: '#888' }}>Orders done</div>
                  </div>
                  <div style={{ background: '#f9fafb', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>0</div>
                    <div style={{ fontSize: 11, color: '#888' }}>Services listed</div>
                  </div>
                </div>
              </div>

            </div>

            {/* List service CTA */}
            <div style={{ background: 'linear-gradient(135deg, #E1F5EE, #f0fdf8)', border: '0.5px solid #9FE1CB', borderRadius: 16, padding: 28, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0F6E56', marginBottom: 4 }}>Start earning today</div>
                <div style={{ fontSize: 13, color: '#555' }}>List your first service and reach hundreds of students.</div>
              </div>
              <button style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0F6E56')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1D9E75')}>
                + List a service
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
