import React from 'react';
import MarqueeBar from '../components/MarqueeBar';

/* ── tokens ─────────────────────────────────── */
const G = '#f0c040';
const O = '#ff7040';
const GN = '#4cda70';

const card = {
  background: 'rgba(12, 26, 56, 0.72)',
  border: '1px solid rgba(240, 192, 64, 0.38)',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(240,192,64,0.22)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  padding: '24px',
  marginBottom: '24px',
};

const bodyText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  lineHeight: '1.7',
  color: 'rgba(228,216,192,0.85)',
};

const sectionTitle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '10px',
  color: G,
  textShadow: `0 0 14px rgba(240,192,64,0.5)`,
  marginBottom: '14px',
  paddingBottom: '10px',
  borderBottom: `1px solid rgba(240,192,64,0.3)`,
  lineHeight: '1.6',
};

const committeeMembers = [
  { role: 'President', name: 'Lalremsiama Pachuau', dept: 'CSE 3rd Year', state: 'Mizoram' },
  { role: 'Vice President', name: 'Zoramthanga Sailo', dept: 'ECE 3rd Year', state: 'Mizoram' },
  { role: 'Secretary', name: 'Ngurthanpuii Hmar', dept: 'Mech 2nd Year', state: 'Mizoram' },
  { role: 'Treasurer', name: 'Vanlalhluna Chhangte', dept: 'Civil 3rd Year', state: 'Mizoram' },
  { role: 'Cultural Head', name: 'Malsawmi Ralte', dept: 'ISE 2nd Year', state: 'Manipur' },
  { role: 'Sports Head', name: 'Lalnunmawia Tlau', dept: 'EEE 2nd Year', state: 'Nagaland' },
];

function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px' }}>
      <MarqueeBar text="★ ABOUT UVCE HEIHA ★ · Our Story, Our Mission, Our Values ★ · Established with love and community spirit ★" />

      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: G,
            textShadow: `0 0 26px rgba(240,192,64,0.6), 3px 3px 0px rgba(0,0,0,0.6)`,
            lineHeight: '1.5',
          }}>
            ★ About HEIHA ★
          </h1>
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '1px',
            color: O,
            marginTop: '12px',
            textTransform: 'uppercase',
          }}>
            Hnam Endiktu Inkhawm Hna Association — Northeast India Students' Union, UVCE
          </p>
        </div>

        {/* History */}
        <div style={card}>
          <h2 style={sectionTitle}>📜 Our History</h2>
          <p style={{ ...bodyText, marginBottom: '14px' }}>
            HEIHA was founded in the early 2010s by a group of students from Northeast India
            who found themselves thousands of kilometers from home, in the bustling city of Bangalore.
            The name "HEIHA" reflects the sense of community and belonging — a call to gather together.
          </p>
          <p style={{ ...bodyText, marginBottom: '14px' }}>
            What started as informal gatherings of Mizo students gradually grew into a formal
            association that now encompasses students from all eight northeastern states. The founding
            members envisioned a space where students could preserve their cultural identity while
            adapting to life in Bangalore.
          </p>
          <p style={bodyText}>
            Over the years, HEIHA has organized numerous cultural events, festivals, academic
            support sessions, and welfare activities. It has become an indispensable part of student
            life for NE students at UVCE, providing not just community but also practical support
            for navigating college and city life far from home.
          </p>
        </div>

        {/* Mission & Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px', marginBottom: '22px' }}>
          <div style={{
            ...card,
            marginBottom: 0,
            background: 'rgba(22, 10, 48, 0.72)',
            border: '1px solid rgba(255,112,64,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(255,112,64,0.22)',
          }}>
            <h2 style={{ ...sectionTitle, color: O, borderBottomColor: 'rgba(255,112,64,0.3)', textShadow: '0 0 14px rgba(255,112,64,0.5)' }}>
              🎯 Our Mission
            </h2>
            <ul style={{ ...bodyText, paddingLeft: '18px', lineHeight: '2' }}>
              <li>Foster unity among NE students at UVCE</li>
              <li>Preserve and celebrate our cultural heritage</li>
              <li>Support academic and personal growth</li>
              <li>Bridge the gap between home and Bangalore</li>
              <li>Build lifelong friendships and networks</li>
              <li>Advocate for the welfare of NE students</li>
            </ul>
          </div>

          <div style={{
            ...card,
            marginBottom: 0,
            background: 'rgba(8, 22, 12, 0.72)',
            border: '1px solid rgba(76,218,112,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 18px rgba(76,218,112,0.18)',
          }}>
            <h2 style={{ ...sectionTitle, color: GN, borderBottomColor: 'rgba(76,218,112,0.3)', textShadow: '0 0 14px rgba(76,218,112,0.5)' }}>
              ✦ Our Values
            </h2>
            <ul style={{ ...bodyText, paddingLeft: '18px', lineHeight: '2' }}>
              <li><strong style={{ color: G }}>Unity</strong> — Stronger together</li>
              <li><strong style={{ color: G }}>Identity</strong> — Proud of our roots</li>
              <li><strong style={{ color: G }}>Excellence</strong> — Academic achievement</li>
              <li><strong style={{ color: G }}>Service</strong> — Community first</li>
              <li><strong style={{ color: G }}>Respect</strong> — For all cultures</li>
              <li><strong style={{ color: G }}>Integrity</strong> — Honesty in all</li>
            </ul>
          </div>
        </div>

        {/* Executive Committee */}
        <div style={card}>
          <h2 style={sectionTitle}>👑 Executive Committee 2024-25</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '14px',
          }}>
            {committeeMembers.map((member) => (
              <div key={member.role} style={{
                background: 'rgba(20, 26, 50, 0.75)',
                border: '1px solid rgba(240,192,64,0.25)',
                borderRadius: '6px',
                padding: '14px 16px',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '8px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  color: O,
                  textTransform: 'uppercase',
                  marginBottom: '7px',
                }}>
                  {member.role}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  color: G,
                  marginBottom: '4px',
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(136,152,184,0.85)',
                }}>
                  {member.dept} · {member.state}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
