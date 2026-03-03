import React, { useState, useEffect } from 'react';
import MarqueeBar from '../components/MarqueeBar';

const pageStyle = {
  minHeight: '100vh',
  backgroundColor: '#0a0a1a',
  padding: '30px 20px',
};

const boxStyle = {
  border: '3px solid #ffd700',
  boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b6914',
  backgroundColor: '#0d1b2a',
  padding: '25px',
  marginBottom: '25px',
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
        // Fallback data if server not running
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
    <div style={pageStyle}>
      <MarqueeBar text="★ HEIHA ALUMNI ★ | Our graduates are making us proud all over the world ★ | From Bangalore to the globe ★" />
      
      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '20px',
            color: '#ffd700',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #8b6914',
          }}>
            ★ ALUMNI ★
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#ff6b35',
            marginTop: '10px',
          }}>
            Our graduates, our pride — blazing trails across industries worldwide
          </p>
        </div>

        {/* Alumni Message Section */}
        <div style={{ ...boxStyle, backgroundColor: '#1a0a2a', border: '3px solid #ff6b35', boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b3214' }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ff6b35',
            textShadow: '2px 2px 0px #000',
            marginBottom: '15px',
          }}>
            💌 A MESSAGE FROM OUR ALUMNI
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '22px',
            lineHeight: '1.7',
            color: '#f0e6c8',
          }}>
            To the new generation of HEIHA members — you carry not just your own dreams, 
            but the hopes of your families, your villages, and your communities back home. 
            The road may be tough, the city may be overwhelming, but remember: every senior 
            who walked these halls felt the same way. And every one of us made it through 
            because of this community. You are never alone.
          </p>
          <div style={{
            marginTop: '15px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: '#ffd700',
          }}>
            — HEIHA Alumni Association
          </div>
        </div>

        {/* Notable Alumni Grid */}
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '12px',
          color: '#ffd700',
          textShadow: '2px 2px 0px #000',
          marginBottom: '20px',
          borderLeft: '5px solid #ffd700',
          paddingLeft: '15px',
        }}>
          🌟 NOTABLE ALUMNI
        </h2>

        {loading ? (
          <div style={{
            textAlign: 'center',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ffd700',
            padding: '40px',
          }}>
            LOADING... <span className="blink">_</span>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
          }}>
            {alumni.map((alum) => (
              <div key={alum.id} style={{
                ...boxStyle,
                marginBottom: 0,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '15px',
                  backgroundColor: '#8b0000',
                  border: '2px solid #ffd700',
                  padding: '3px 10px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  color: '#ffd700',
                  boxShadow: '2px 2px 0px #000',
                }}>
                  Batch '{alum.batch.slice(2)}
                </div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#1a3a5a',
                  border: '3px solid #ffd700',
                  boxShadow: '3px 3px 0px #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '12px',
                }}>
                  👤
                </div>
                <h3 style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '24px',
                  color: '#ffd700',
                  marginBottom: '5px',
                }}>
                  {alum.name}
                </h3>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  color: '#ff6b35',
                  marginBottom: '10px',
                }}>
                  {alum.field} @ {alum.company}
                </div>
                <div style={{
                  border: '2px dashed #8b6914',
                  padding: '10px',
                  backgroundColor: '#1a1a2a',
                }}>
                  <p style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '19px',
                    lineHeight: '1.5',
                    color: '#f0e6c8',
                    fontStyle: 'italic',
                  }}>
                    "{alum.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Directory Teaser */}
        <div style={{ ...boxStyle, marginTop: '30px', textAlign: 'center', backgroundColor: '#1a1a0a', border: '3px solid #8b6914' }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: '#8b6914',
            marginBottom: '15px',
          }}>
            📒 FULL ALUMNI DIRECTORY
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#f0e6c8',
            marginBottom: '15px',
          }}>
            We have 50+ alumni across various industries and countries. 
            The full directory is available to registered HEIHA members.
            Contact the current executive committee for access.
          </p>
          <div style={{
            display: 'inline-block',
            border: '3px dashed #8b6914',
            padding: '10px 20px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: '#555',
          }}>
            [ MEMBERS ONLY ] — Contact: heiha.uvce@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alumni;
