import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0d1b2a',
      borderTop: '4px solid #ffd700',
      boxShadow: '0 -4px 0px #8b6914',
      padding: '30px 20px',
      textAlign: 'center',
      marginTop: '40px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          color: '#ffd700',
          textShadow: '2px 2px 0px #000',
          marginBottom: '10px',
        }}>
          ★ UVCE HEIHA ★
        </p>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '16px',
          color: '#f0e6c8',
          marginBottom: '10px',
        }}>
          Northeast India Student Community | UVCE Bangalore
        </p>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '14px',
          color: '#8b8b6b',
        }}>
          © {new Date().getFullYear()} UVCE HEIHA. Best viewed at 800x600 resolution. 
          <span style={{ marginLeft: '10px' }}>✦ Made with ♥ far from home ✦</span>
        </p>
        <div style={{
          marginTop: '15px',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '8px',
          color: '#555',
        }}>
          [ Visitor Count: 001337 ] [ Last Updated: 2024 ]
        </div>
      </div>
    </footer>
  );
}

export default Footer;
