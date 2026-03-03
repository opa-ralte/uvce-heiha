import React from 'react';
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
    <div style={pageStyle}>
      <MarqueeBar text="★ ABOUT UVCE HEIHA ★ | Our Story, Our Mission, Our Values ★ | Established with love and community spirit ★" />
      
      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '20px',
            color: '#ffd700',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #8b6914',
          }}>
            ★ ABOUT HEIHA ★
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#ff6b35',
            marginTop: '10px',
          }}>
            Hnam Endiktu Inkhawm Hna Association — Northeast India Students' Union, UVCE
          </p>
        </div>

        {/* History */}
        <div style={boxStyle}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ffd700',
            textShadow: '2px 2px 0px #000',
            marginBottom: '15px',
            borderBottom: '2px solid #ffd700',
            paddingBottom: '10px',
          }}>
            📜 OUR HISTORY
          </h2>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            lineHeight: '1.7',
            color: '#f0e6c8',
          }}>
            <p style={{ marginBottom: '15px' }}>
              HEIHA was founded in the early 2010s by a group of students from Northeast India 
              who found themselves thousands of kilometers from home, in the bustling city of Bangalore. 
              The name "HEIHA" reflects the sense of community and belonging — a call to gather together.
            </p>
            <p style={{ marginBottom: '15px' }}>
              What started as informal gatherings of Mizo students gradually grew into a formal 
              association that now encompasses students from all eight northeastern states. The founding 
              members envisioned a space where students could preserve their cultural identity while 
              adapting to life in Bangalore.
            </p>
            <p>
              Over the years, HEIHA has organized numerous cultural events, festivals, academic 
              support sessions, and welfare activities. It has become an indispensable part of student 
              life for NE students at UVCE, providing not just community but also practical support 
              for navigating college and city life far from home.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <div style={{ ...boxStyle, marginBottom: 0, backgroundColor: '#1a0a2a', border: '3px solid #ff6b35', boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b3214' }}>
            <h2 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#ff6b35',
              textShadow: '2px 2px 0px #000',
              marginBottom: '15px',
              borderBottom: '2px solid #ff6b35',
              paddingBottom: '10px',
            }}>
              🎯 OUR MISSION
            </h2>
            <ul style={{
              fontFamily: "'VT323', monospace",
              fontSize: '19px',
              lineHeight: '1.8',
              color: '#f0e6c8',
              paddingLeft: '20px',
            }}>
              <li>Foster unity among NE students at UVCE</li>
              <li>Preserve and celebrate our cultural heritage</li>
              <li>Support academic and personal growth</li>
              <li>Bridge the gap between home and Bangalore</li>
              <li>Build lifelong friendships and networks</li>
              <li>Advocate for the welfare of NE students</li>
            </ul>
          </div>

          <div style={{ ...boxStyle, marginBottom: 0, backgroundColor: '#0a1a0a', border: '3px solid #4caf50', boxShadow: '5px 5px 0px #000, 9px 9px 0px #1b5e20' }}>
            <h2 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#4caf50',
              textShadow: '2px 2px 0px #000',
              marginBottom: '15px',
              borderBottom: '2px solid #4caf50',
              paddingBottom: '10px',
            }}>
              ✦ OUR VALUES
            </h2>
            <ul style={{
              fontFamily: "'VT323', monospace",
              fontSize: '19px',
              lineHeight: '1.8',
              color: '#f0e6c8',
              paddingLeft: '20px',
            }}>
              <li><strong style={{ color: '#ffd700' }}>UNITY</strong> — Stronger together</li>
              <li><strong style={{ color: '#ffd700' }}>IDENTITY</strong> — Proud of our roots</li>
              <li><strong style={{ color: '#ffd700' }}>EXCELLENCE</strong> — Academic achievement</li>
              <li><strong style={{ color: '#ffd700' }}>SERVICE</strong> — Community first</li>
              <li><strong style={{ color: '#ffd700' }}>RESPECT</strong> — For all cultures</li>
              <li><strong style={{ color: '#ffd700' }}>INTEGRITY</strong> — Honesty in all</li>
            </ul>
          </div>
        </div>

        {/* Executive Committee */}
        <div style={boxStyle}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '12px',
            color: '#ffd700',
            textShadow: '2px 2px 0px #000',
            marginBottom: '20px',
            borderBottom: '2px solid #ffd700',
            paddingBottom: '10px',
          }}>
            👑 EXECUTIVE COMMITTEE 2024-25
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '15px',
          }}>
            {committeeMembers.map((member) => (
              <div key={member.role} style={{
                border: '2px solid #8b6914',
                backgroundColor: '#1a1a2a',
                padding: '15px',
                boxShadow: '3px 3px 0px #000',
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  color: '#ff6b35',
                  marginBottom: '8px',
                }}>
                  {member.role}
                </div>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '22px',
                  color: '#ffd700',
                  marginBottom: '5px',
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '17px',
                  color: '#a0a0a0',
                }}>
                  {member.dept} | {member.state}
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
