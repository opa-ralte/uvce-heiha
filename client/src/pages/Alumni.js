import React, { useState, useEffect } from 'react';
import MarqueeBar from '../components/MarqueeBar';

/* ── tokens ─────────────────────────────────── */
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
};

const bodyText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  lineHeight: '1.7',
  color: 'rgba(228,216,192,0.85)',
};

function Alumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/alumni')
      .then(res => res.json())
      .then(data => {
        setAlumni(data.data);
        setLoading(false);
      })
      .catch(() => {
        setAlumni([
          { id: 1, name: 'Lalthansanga Pachuau', batch: '2015', field: 'Software Engineering', company: 'Infosys', message: 'UVCE gave me the foundation to build my career. Cherish every moment!' },
          { id: 2, name: 'Malsawmi Hmar', batch: '2016', field: 'Civil Engineering', company: 'L&T Construction', message: 'The HEIHA community was my home away from home. Stay strong and united!' },
          { id: 3, name: 'Zothansanga Ralte', batch: '2017', field: 'Electronics', company: 'ISRO', message: 'Dream big, work hard. The journey at UVCE is worth every challenge.' },
          { id: 4, name: 'Lalnunpuii Chhangte', batch: '2018', field: 'Computer Science', company: 'Google', message: 'Leverage every opportunity UVCE offers. The connections you make here last a lifetime.' },
          { id: 5, name: 'Vanlalruata Sailo', batch: '2019', field: 'Mechanical Engineering', company: 'BHEL', message: 'Trust the process and lean on your HEIHA family for support.' },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px' }}>
      <MarqueeBar text="★ HEIHA ALUMNI ★ · Our graduates are making us proud all over the world ★ · From Bangalore to the globe ★" />

      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: G,
            textShadow: `0 0 26px rgba(240,192,64,0.6), 3px 3px 0px rgba(0,0,0,0.6)`,
            lineHeight: '1.5',
          }}>
            ★ Alumni ★
          </h1>
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '1px',
            color: O,
            marginTop: '12px',
            textTransform: 'uppercase',
          }}>
            Our graduates, our pride — blazing trails across industries worldwide
          </p>
        </div>

        {/* Alumni message */}
        <div style={{
          ...card,
          background: 'rgba(22, 10, 48, 0.72)',
          border: '1px solid rgba(255,112,64,0.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 22px rgba(255,112,64,0.22)',
        }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: O,
            textShadow: '0 0 14px rgba(255,112,64,0.7)',
            marginBottom: '14px',
            lineHeight: '1.6',
          }}>
            💌 A Message From Our Alumni
          </h2>
          <p style={{ ...bodyText, fontSize: '15px', lineHeight: '1.75' }}>
            To the new generation of HEIHA members — you carry not just your own dreams,
            but the hopes of your families, your villages, and your communities back home.
            The road may be tough, the city may be overwhelming, but remember: every senior
            who walked these halls felt the same way. And every one of us made it through
            because of this community. You are never alone.
          </p>
          <div style={{
            marginTop: '14px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '9px',
            fontWeight: '600',
            letterSpacing: '1px',
            color: 'rgba(240,192,64,0.7)',
          }}>
            — HEIHA Alumni Association
          </div>
        </div>

        {/* Notable Alumni heading */}
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          color: G,
          textShadow: `0 0 14px rgba(240,192,64,0.5)`,
          marginBottom: '20px',
          borderLeft: `3px solid ${G}`,
          paddingLeft: '14px',
          lineHeight: '1.6',
        }}>
          🌟 Notable Alumni
        </h2>

        {loading ? (
          <div style={{
            textAlign: 'center',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: G,
            padding: '40px',
          }}>
            Loading... <span className="blink">_</span>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '22px',
          }}>
            {alumni.map((alum) => (
              <div key={alum.id} style={{
                ...card,
                marginBottom: 0,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-11px',
                  right: '16px',
                  background: 'linear-gradient(135deg, #7a0000 0%, #4a0000 100%)',
                  border: '1px solid rgba(240,192,64,0.45)',
                  borderRadius: '4px',
                  padding: '3px 10px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '8px',
                  fontWeight: '600',
                  color: G,
                  boxShadow: '0 0 10px rgba(240,192,64,0.3)',
                  letterSpacing: '0.5px',
                }}>
                  Batch '{String(alum.batch).length >= 3 ? String(alum.batch).slice(-2) : alum.batch}
                </div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, rgba(18,44,90,0.9), rgba(8,20,50,0.9))',
                  border: '1px solid rgba(240,192,64,0.4)',
                  borderRadius: '50%',
                  boxShadow: '0 0 14px rgba(240,192,64,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '12px',
                }}>
                  👤
                </div>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600',
                  color: G,
                  marginBottom: '4px',
                }}>
                  {alum.name}
                </h3>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  color: O,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}>
                  {alum.field} @ {alum.company}
                </div>
                <div style={{
                  borderLeft: `2px solid rgba(240,192,64,0.35)`,
                  paddingLeft: '12px',
                  background: 'rgba(8,16,36,0.5)',
                  borderRadius: '0 4px 4px 0',
                  padding: '10px 10px 10px 14px',
                }}>
                  <p style={{ ...bodyText, fontStyle: 'italic', fontSize: '13px' }}>
                    "{alum.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Directory */}
        <div style={{
          ...card,
          marginTop: '28px',
          textAlign: 'center',
          background: 'rgba(10, 16, 38, 0.72)',
          border: '1px solid rgba(240,192,64,0.2)',
        }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: 'rgba(240,192,64,0.6)',
            marginBottom: '14px',
            lineHeight: '1.6',
          }}>
            📒 Full Alumni Directory
          </h2>
          <p style={{ ...bodyText, marginBottom: '16px' }}>
            We have 50+ alumni across various industries and countries.
            The full directory is available to registered HEIHA members.
            Contact the current executive committee for access.
          </p>
          <div style={{
            display: 'inline-block',
            border: '1px dashed rgba(240,192,64,0.35)',
            borderRadius: '4px',
            padding: '10px 20px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '9px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            color: 'rgba(136,152,184,0.6)',
          }}>
            [ MEMBERS ONLY ] — Contact: heiha.uvce@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alumni;
