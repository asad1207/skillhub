import { useState, useEffect } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
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
  { title: 'React landing page',       category: 'Web Dev',   price: 800,  seller: 'Rahul K.',  rating: 5,   catColor: '#E6F1FB', catText: '#185FA5' },
  { title: 'Logo & brand identity',    category: 'Design',    price: 500,  seller: 'Priya S.',  rating: 4.5, catColor: '#EEEDFE', catText: '#3C3489' },
  { title: 'Research paper editing',   category: 'Writing',   price: 300,  seller: 'Ananya M.', rating: 5,   catColor: '#EAF3DE', catText: '#27500A' },
  { title: 'YouTube reel editing',     category: 'Video',     price: 600,  seller: 'Karan V.',  rating: 4,   catColor: '#FAECE7', catText: '#712B13' },
  { title: 'Python data analysis',     category: 'Web Dev',   price: 700,  seller: 'Sneha R.',  rating: 5,   catColor: '#E6F1FB', catText: '#185FA5' },
  { title: 'UI/UX Figma prototype',   category: 'Design',    price: 650,  seller: 'Arjun T.',  rating: 4.5, catColor: '#EEEDFE', catText: '#3C3489' },
];

const testimonials = [
  { name: 'Neha R.', branch: 'B.Tech ECE · 2nd year', text: 'I earned ₹12,000 in my first month just by helping juniors with their assignments. SkillHub is amazing!', earned: '₹12,000', avatar: 'NR' },
  { name: 'Arjun K.', branch: 'BBA · 3rd year',       text: 'Found a great designer for my startup pitch deck. Affordable, fast, and professional. Highly recommend!', earned: '₹8,500',  avatar: 'AK' },
  { name: 'Priya S.', branch: 'B.Tech CSE · 4th year', text: "As a seller I've built a real portfolio and earned enough to fund my semester trip. Best platform ever.", earned: '₹21,000', avatar: 'PS' },
];

const stats = [
  { value: '500+', label: 'Active students' },
  { value: '1,200+', label: 'Services listed' },
  { value: '₹4.2L+', label: 'Paid out to students' },
  { value: '4.8★', label: 'Average rating' },
];

export default function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a1a', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:      'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background:    scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        borderBottom:  scrolled ? '0.5px solid #e5e7eb' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition:    'all 0.3s',
        padding:       '0 48px',
        height:        60,
        display:       'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#1D9E75' }}>
          Skill<span style={{ color: '#1a1a1a' }}>Hub</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#555' }}>
          {['Browse', 'How it works', 'Pricing'].map(l => (
            <a key={l} href="#" style={{ textDecoration: 'none', color: '#555' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1D9E75')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onLogin}
            style={{ padding: '8px 18px', borderRadius: 8, border: '0.5px solid #d1d5db', background: 'transparent', fontSize: 13, cursor: 'pointer', color: '#333' }}
            onMouseEnter={e => { (e.currentTarget.style.background = '#f9fafb'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); }}>
            Log in
          </button>
          <button onClick={onGetStarted}
            style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget.style.background = '#0F6E56'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = '#1D9E75'); }}>
            Sign up free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:      '100vh',
        background:     'linear-gradient(135deg, #f0fdf8 0%, #f8faff 50%, #fff8f0 100%)',
        display:        'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection:  'column', textAlign: 'center',
        padding:        '100px 24px 60px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#E1F5EE', color: '#0F6E56',
          fontSize: 12, fontWeight: 500,
          padding: '5px 14px', borderRadius: 20, marginBottom: 24,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
          Woxsen University · Now live
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
          Students helping{' '}
          <span style={{ color: '#1D9E75' }}>students</span>,<br />
          skills becoming{' '}
          <span style={{ color: '#e67e22' }}>income</span>
        </h1>

        <p style={{ fontSize: 17, color: '#555', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          SkillHub is the marketplace where Woxsen students offer their skills and earn real money — all within a trusted, university-verified platform.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
          <button onClick={onGetStarted}
            style={{ padding: '14px 32px', borderRadius: 10, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(29,158,117,0.3)' }}
            onMouseEnter={e => { (e.currentTarget.style.background = '#0F6E56'); (e.currentTarget.style.transform = 'translateY(-2px)'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = '#1D9E75'); (e.currentTarget.style.transform = 'translateY(0)'); }}>
            Start earning →
          </button>
          <button onClick={onGetStarted}
            style={{ padding: '14px 32px', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', color: '#333', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget.style.borderColor = '#1D9E75'); (e.currentTarget.style.color = '#1D9E75'); }}
            onMouseLeave={e => { (e.currentTarget.style.borderColor = '#d1d5db'); (e.currentTarget.style.color = '#333'); }}>
            Browse services
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1D9E75' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 48px', background: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>How it works</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Simple. Secure. Student-first.</h2>
        <p style={{ fontSize: 15, color: '#666', marginBottom: 56, maxWidth: 480, margin: '0 auto 56px' }}>Get started in minutes, whether you're buying or selling.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto' }}>
          {[
            { step: '01', icon: '🎓', title: 'Sign up with your university ID', desc: 'Verify your Woxsen email to join the trusted student community.' },
            { step: '02', icon: '🛍️', title: 'Browse or list a service',        desc: 'Find what you need or showcase your skills with a listing.' },
            { step: '03', icon: '💸', title: 'Pay, work, earn — securely',      desc: 'Funds are held in escrow and released only after approval.' },
          ].map(step => (
            <div key={step.step}
              style={{ background: '#f9fafb', borderRadius: 16, padding: '32px 24px', textAlign: 'left', border: '0.5px solid #e5e7eb', cursor: 'default', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-4px)'); (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'); }}
              onMouseLeave={e => { (e.currentTarget.style.transform = 'translateY(0)'); (e.currentTarget.style.boxShadow = 'none'); }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1D9E75', marginBottom: 12 }}>{step.step}</div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: '80px 48px', background: '#f9fafb', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Categories</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48 }}>Find the skill you need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, maxWidth: 900, margin: '0 auto 40px' }}>
          {categories.map(cat => (
            <div key={cat.label}
              style={{ background: '#fff', borderRadius: 16, padding: '20px 12px', border: '0.5px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { (e.currentTarget.style.background = cat.color); (e.currentTarget.style.borderColor = cat.text); (e.currentTarget.style.transform = 'translateY(-3px)'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = '#fff'); (e.currentTarget.style.borderColor = '#e5e7eb'); (e.currentTarget.style.transform = 'translateY(0)'); }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 4 }}>{cat.label}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{cat.count} services</div>
            </div>
          ))}
        </div>
        <button onClick={onGetStarted}
          style={{ padding: '10px 24px', borderRadius: 8, border: '1.5px solid #1D9E75', background: 'transparent', color: '#1D9E75', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          onMouseEnter={e => { (e.currentTarget.style.background = '#1D9E75'); (e.currentTarget.style.color = '#fff'); }}
          onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = '#1D9E75'); }}>
          View all categories →
        </button>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '80px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Featured</div>
              <h2 style={{ fontSize: 32, fontWeight: 700 }}>Popular services</h2>
            </div>
            <button onClick={onGetStarted}
              style={{ padding: '8px 18px', borderRadius: 8, border: '0.5px solid #d1d5db', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#333' }}>
              Browse all
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {services.map((s, i) => (
              <div key={i}
                style={{ background: '#fff', border: hoveredService === i ? '1.5px solid #1D9E75' : '0.5px solid #e5e7eb', borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.2s', transform: hoveredService === i ? 'translateY(-3px)' : 'none', boxShadow: hoveredService === i ? '0 8px 24px rgba(0,0,0,0.08)' : 'none' }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}>
                <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 6, background: s.catColor, color: s.catText, display: 'inline-block', marginBottom: 10 }}>{s.category}</span>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>{s.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1D9E75' }}>₹ {s.price.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {s.seller} · {'★'.repeat(Math.round(s.rating))}
                  </div>
                </div>
                {hoveredService === i && (
                  <button onClick={onGetStarted}
                    style={{ width: '100%', marginTop: 12, padding: '8px', borderRadius: 8, border: 'none', background: '#1D9E75', color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
                    Order now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 48px', background: '#f0fdf8', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1D9E75', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Stories</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 48 }}>What students say</h2>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '40px', border: '0.5px solid #e5e7eb', marginBottom: 24, transition: 'all 0.3s' }}>
            <div style={{ fontSize: 40, color: '#E1F5EE', fontFamily: 'Georgia', lineHeight: 1, marginBottom: 16, textAlign: 'left' }}>"</div>
            <p style={{ fontSize: 16, color: '#333', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>
              {testimonials[activeTestimonial].text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{testimonials[activeTestimonial].name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{testimonials[activeTestimonial].branch}</div>
                </div>
              </div>
              <div style={{ background: '#E1F5EE', color: '#0F6E56', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20 }}>
                Earned {testimonials[activeTestimonial].earned}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, border: 'none', background: i === activeTestimonial ? '#1D9E75' : '#d1d5db', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 48px', background: '#0F6E56', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Ready to start?</h2>
        <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 36 }}>Join 500+ Woxsen students already earning on SkillHub.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onGetStarted}
            style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: '#e67e22', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            onMouseEnter={e => { (e.currentTarget.style.background = '#d35400'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = '#e67e22'); }}>
            Create free account
          </button>
          <button onClick={onLogin}
            style={{ padding: '14px 36px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(255,255,255,0.1)'); }}
            onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); }}>
            Log in
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '32px 48px', background: '#1a1a1a', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
        <div style={{ color: '#1D9E75', fontSize: 16, fontWeight: 600 }}>Skill<span style={{ color: '#fff' }}>Hub</span></div>
        <div>© 2025 SkillHub · Woxsen University</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href="#" style={{ color: '#888', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
