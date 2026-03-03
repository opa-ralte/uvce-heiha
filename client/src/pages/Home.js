import React from 'react';
import { Link } from 'react-router-dom';
import MarqueeBar from '../components/MarqueeBar';

const pageStyle = {
  minHeight: '100vh',
  backgroundColor: '#0a0a1a',
};

const heroStyle = {
  textAlign: 'center',
  padding: '60px 20px 40px',
  background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)',
  borderBottom: '4px solid #ffd700',
};

const summaryCardStyle = {
  border: '3px solid #ffd700',
  boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b6914',
  backgroundColor: '#0d1b2a',
  padding: '25px',
  marginBottom: '25px',
};

const sectionGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '25px',
  margin: '30px 0',
};

function Home() {
  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '11px',
            color: '#ff6b35',
            marginBottom: '15px',
            textShadow: '2px 2px 0px #000',
          }}>
            ★ WELCOME TO ★
          </div>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '28px',
            color: '#ffd700',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #8b6914',
            marginBottom: '20px',
            lineHeight: '1.4',
          }}>
            UVCE<br/>HEIHA
          </h1>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: '26px',
            color: '#f0e6c8',
            marginBottom: '25px',
            letterSpacing: '3px',
          }}>
            Northeast India Students Association
          </div>
          <div style={{
            border: '2px solid #ffd700',
            backgroundColor: '#1a0a0a',
            padding: '15px 25px',
            display: 'inline-block',
            boxShadow: '3px 3px 0px #000',
          }}>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: '20px',
              color: '#ffd700',
            }}>
              University Visvesvaraya College of Engineering, Bangalore
            </span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <MarqueeBar text="★ WELCOME FRESHERS 2024! ★ | ★ UPCOMING: CHAPCHAR KUT CELEBRATION ★ | ★ JOIN THE HEIHA FAMILY ★ | ★ UNITY IN DIVERSITY ★ | ★ FROM THE HILLS TO SILICON VALLEY ★" />

      {/* Welcome Message */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{
          ...summaryCardStyle,
          textAlign: 'center',
          backgroundColor: '#1a0a2a',
          border: '3px solid #ff6b35',
          boxShadow: '5px 5px 0px #000, 9px 9px 0px #8b3214',
        }}>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '14px',
            color: '#ff6b35',
            textShadow: '2px 2px 0px #000',
            marginBottom: '15px',
          }}>
            ✦ DEAR FRESHERS ✦
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '22px',
            lineHeight: '1.6',
            color: '#f0e6c8',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Moving to Bangalore from Northeast India is a big step. But you are not alone! 
            UVCE HEIHA is your home away from home. We are a community of students from 
            Mizoram, Nagaland, Manipur, Assam, Meghalaya, Arunachal Pradesh, Tripura, and Sikkim — 
            bound together by shared roots, culture, and the journey of engineering education.
          </p>
        </div>

        {/* Summary Cards Grid */}
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '14px',
          color: '#ffd700',
          textShadow: '2px 2px 0px #000',
          margin: '30px 0 20px',
          borderLeft: '5px solid #ffd700',
          paddingLeft: '15px',
        }}>
          ☰ EXPLORE HEIHA
        </h2>

        <div style={sectionGridStyle}>
          {/* About Card */}
          <div style={summaryCardStyle}>
            <h3 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#ffd700',
              textShadow: '2px 2px 0px #000',
              marginBottom: '12px',
            }}>
              📋 ABOUT US
            </h3>
            <hr style={{ border: 'none', borderTop: '2px solid #ffd700', marginBottom: '12px' }} />
            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '18px',
              lineHeight: '1.5',
              color: '#f0e6c8',
              marginBottom: '15px',
            }}>
              Learn about the HEIHA community at UVCE — our history, mission, 
              values, and the dedicated executive committee working for you.
            </p>
            <Link to="/about" style={{
              display: 'inline-block',
              backgroundColor: '#8b0000',
              color: '#ffd700',
              border: '3px solid #ffd700',
              padding: '8px 15px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '3px 3px 0px #000',
              textDecoration: 'none',
            }}>
              READ MORE »
            </Link>
          </div>

          {/* Alumni Card */}
          <div style={summaryCardStyle}>
            <h3 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#ffd700',
              textShadow: '2px 2px 0px #000',
              marginBottom: '12px',
            }}>
              🎓 ALUMNI
            </h3>
            <hr style={{ border: 'none', borderTop: '2px solid #ffd700', marginBottom: '12px' }} />
            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '18px',
              lineHeight: '1.5',
              color: '#f0e6c8',
              marginBottom: '15px',
            }}>
              Meet our distinguished alumni from Google, ISRO, L&T and more. 
              Read their inspiring messages and see where HEIHA has taken its members.
            </p>
            <Link to="/alumni" style={{
              display: 'inline-block',
              backgroundColor: '#8b0000',
              color: '#ffd700',
              border: '3px solid #ffd700',
              padding: '8px 15px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '3px 3px 0px #000',
              textDecoration: 'none',
            }}>
              READ MORE »
            </Link>
          </div>

          {/* Gallery Card */}
          <div style={summaryCardStyle}>
            <h3 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#ffd700',
              textShadow: '2px 2px 0px #000',
              marginBottom: '12px',
            }}>
              📷 GALLERY
            </h3>
            <hr style={{ border: 'none', borderTop: '2px solid #ffd700', marginBottom: '12px' }} />
            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '18px',
              lineHeight: '1.5',
              color: '#f0e6c8',
              marginBottom: '15px',
            }}>
              Browse photos from our Chapchar Kut celebrations, annual fests, 
              cultural nights, sports events, and memorable moments.
            </p>
            <Link to="/gallery" style={{
              display: 'inline-block',
              backgroundColor: '#8b0000',
              color: '#ffd700',
              border: '3px solid #ffd700',
              padding: '8px 15px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '3px 3px 0px #000',
              textDecoration: 'none',
            }}>
              VIEW GALLERY »
            </Link>
          </div>

          {/* Student Corner Card */}
          <div style={summaryCardStyle}>
            <h3 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#ffd700',
              textShadow: '2px 2px 0px #000',
              marginBottom: '12px',
            }}>
              📚 STUDENT CORNER
            </h3>
            <hr style={{ border: 'none', borderTop: '2px solid #ffd700', marginBottom: '12px' }} />
            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '18px',
              lineHeight: '1.5',
              color: '#f0e6c8',
              marginBottom: '15px',
            }}>
              New to UVCE? Find essential tips, hostel info, college rules, 
              FAQs, and helpful resources compiled by your seniors.
            </p>
            <Link to="/student-corner" style={{
              display: 'inline-block',
              backgroundColor: '#8b0000',
              color: '#ffd700',
              border: '3px solid #ffd700',
              padding: '8px 15px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '3px 3px 0px #000',
              textDecoration: 'none',
            }}>
              EXPLORE »
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          ...summaryCardStyle,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          textAlign: 'center',
          backgroundColor: '#1a1a0a',
          border: '3px solid #8b6914',
        }}>
          {[
            { num: '200+', label: 'MEMBERS' },
            { num: '10+', label: 'YEARS' },
            { num: '8', label: 'NE STATES' },
            { num: '50+', label: 'ALUMNI' },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: '15px 20px' }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '22px',
                color: '#ffd700',
                textShadow: '2px 2px 0px #000',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: "'VT323', monospace",
                fontSize: '18px',
                color: '#ff6b35',
                marginTop: '5px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
