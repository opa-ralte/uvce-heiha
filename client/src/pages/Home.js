import React from 'react';
import { Link } from 'react-router-dom';
import MarqueeBar from '../components/MarqueeBar';

/* ── shared tokens ─────────────────────────────── */
const G = '#f0c040';
const O = '#ff7040';
const card = {
  background: 'rgba(12, 26, 56, 0.72)',
  border: '1px solid rgba(240, 192, 64, 0.38)',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(240,192,64,0.22)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  padding: '24px',
  marginBottom: '24px',
  transition: 'box-shadow 0.28s ease, transform 0.22s ease',
};

const cardHoverStyle = {
  boxShadow: '0 12px 44px rgba(0,0,0,0.55), 0 0 28px rgba(240,192,64,0.45)',
  transform: 'translateY(-2px)',
};

const btnStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #7a0000 0%, #4a0000 100%)',
  color: G,
  border: '1px solid rgba(240,192,64,0.45)',
  borderRadius: '4px',
  padding: '9px 18px',
  fontFamily: "'Orbitron', sans-serif",
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  boxShadow: '0 0 14px rgba(240,192,64,0.28)',
  textDecoration: 'none',
  transition: 'all 0.22s ease',
};

/* ── hover-aware card wrapper ────────────────── */
function HoverCard({ style, children }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{ ...card, ...style, ...(hovered ? cardHoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

/* ── hover-aware button ──────────────────────── */
function HoverBtn({ to, children }) {
  const [hovered, setHovered] = React.useState(false);
  const hov = {
    background: `linear-gradient(135deg, ${G} 0%, #c09828 100%)`,
    color: '#060d1e',
    boxShadow: '0 6px 22px rgba(240,192,64,0.5)',
    transform: 'translateY(-1px)',
  };
  return (
    <Link
      to={to}
      style={{ ...btnStyle, ...(hovered ? hov : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

/* ── section heading ─────────────────────────── */
const sectionHeading = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '11px',
  color: G,
  textShadow: `0 0 18px rgba(240,192,64,0.55)`,
  margin: '32px 0 20px',
  borderLeft: `3px solid ${G}`,
  paddingLeft: '14px',
};

/* ── card title ──────────────────────────────── */
const cardTitle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '10px',
  color: G,
  textShadow: `0 0 10px rgba(240,192,64,0.5)`,
  marginBottom: '10px',
  lineHeight: '1.6',
};

/* ── body text ───────────────────────────────── */
const bodyText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  lineHeight: '1.65',
  color: 'rgba(228,216,192,0.85)',
  marginBottom: '16px',
};

function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Hero ────────────────────────────────── */}
      <div style={{
        textAlign: 'center',
        padding: '72px 20px 52px',
        background: 'linear-gradient(180deg, rgba(8,20,55,0.55) 0%, rgba(6,13,30,0) 100%)',
        borderBottom: '1px solid rgba(240,192,64,0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* background glow blobs */}
        <div style={{
          position: 'absolute', top: '-80px', left: '50%',
          transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(240,192,64,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '4px',
            color: O,
            marginBottom: '18px',
            textTransform: 'uppercase',
            textShadow: '0 0 12px rgba(255,112,64,0.6)',
          }}>
            ★ Welcome To ★
          </div>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(22px, 5vw, 38px)',
            color: G,
            textShadow: `0 0 30px rgba(240,192,64,0.6), 0 0 60px rgba(240,192,64,0.25), 3px 3px 0px rgba(0,0,0,0.7)`,
            marginBottom: '22px',
            lineHeight: '1.4',
          }}>
            UVCE<br />HEIHA
          </h1>
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '2.5px',
            color: 'rgba(228,216,192,0.85)',
            marginBottom: '26px',
            textTransform: 'uppercase',
          }}>
            Northeast India Students Association
          </p>
          <div style={{
            display: 'inline-block',
            background: 'rgba(12,26,56,0.65)',
            border: '1px solid rgba(240,192,64,0.35)',
            borderRadius: '6px',
            padding: '14px 28px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(240,192,64,0.18)',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(240,192,64,0.82)',
              letterSpacing: '0.5px',
            }}>
              University Visvesvaraya College of Engineering, Bangalore
            </span>
          </div>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────── */}
      <MarqueeBar text="★ WELCOME FRESHERS 2024! ★ · UPCOMING: CHAPCHAR KUT CELEBRATION ★ · JOIN THE HEIHA FAMILY ★ · UNITY IN DIVERSITY ★ · FROM THE HILLS TO SILICON VALLEY ★" />

      {/* ── Main Content ────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 40px' }}>

        {/* Welcome message */}
        <HoverCard style={{
          textAlign: 'center',
          background: 'rgba(20, 10, 45, 0.72)',
          border: '1px solid rgba(255,112,64,0.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 22px rgba(255,112,64,0.22)',
        }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: O,
            textShadow: '0 0 14px rgba(255,112,64,0.7)',
            marginBottom: '14px',
            lineHeight: '1.6',
          }}>
            ✦ Dear Freshers ✦
          </h2>
          <p style={{ ...bodyText, maxWidth: '800px', margin: '0 auto', fontSize: '15px', lineHeight: '1.75' }}>
            Moving to Bangalore from Northeast India is a big step. But you are not alone!
            UVCE HEIHA is your home away from home. We are a community of students from
            Mizoram, Nagaland, Manipur, Assam, Meghalaya, Arunachal Pradesh, Tripura, and Sikkim —
            bound together by shared roots, culture, and the journey of engineering education.
          </p>
        </HoverCard>

        {/* Section heading */}
        <h2 style={sectionHeading}>☰ Explore HEIHA</h2>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '22px',
          marginBottom: '28px',
        }}>
          {[
            { emoji: '📋', title: 'About Us', body: 'Learn about the HEIHA community at UVCE — our history, mission, values, and the dedicated executive committee working for you.', to: '/about', cta: 'Read More' },
            { emoji: '🎓', title: 'Alumni', body: 'Meet our distinguished alumni from Google, ISRO, L&T and more. Read their inspiring messages and see where HEIHA has taken its members.', to: '/alumni', cta: 'Read More' },
            { emoji: '📷', title: 'Gallery', body: 'Browse photos from our Chapchar Kut celebrations, annual fests, cultural nights, sports events, and memorable moments.', to: '/gallery', cta: 'View Gallery' },
            { emoji: '📚', title: 'Student Corner', body: 'New to UVCE? Find essential tips, hostel info, college rules, FAQs, and helpful resources compiled by your seniors.', to: '/student-corner', cta: 'Explore' },
          ].map((item) => (
            <HoverCard key={item.to} style={{}}>
              <div style={{ fontSize: '22px', marginBottom: '10px' }}>{item.emoji}</div>
              <h3 style={cardTitle}>{item.title}</h3>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.4), transparent)', margin: '10px 0 14px' }} />
              <p style={bodyText}>{item.body}</p>
              <HoverBtn to={item.to}>{item.cta} »</HoverBtn>
            </HoverCard>
          ))}
        </div>

        {/* Stats */}
        <HoverCard style={{
          background: 'rgba(10, 18, 42, 0.72)',
          border: '1px solid rgba(240,192,64,0.25)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}>
            {[
              { num: '200+', label: 'Members' },
              { num: '10+', label: 'Years' },
              { num: '8', label: 'NE States' },
              { num: '50+', label: 'Alumni' },
            ].map((stat) => (
              <div key={stat.label} style={{ padding: '16px 22px' }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '20px',
                  color: G,
                  textShadow: '0 0 20px rgba(240,192,64,0.65)',
                  marginBottom: '6px',
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '1.5px',
                  color: O,
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </HoverCard>
      </div>
    </div>
  );
}

export default Home;
