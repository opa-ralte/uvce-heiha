import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'rgba(6, 10, 24, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(240, 192, 64, 0.35)',
      boxShadow: '0 -4px 28px rgba(0, 0, 0, 0.55)',
      padding: '36px 20px',
      textAlign: 'center',
      marginTop: '40px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '11px',
          color: '#f0c040',
          textShadow: '0 0 14px rgba(240, 192, 64, 0.65)',
          marginBottom: '12px',
          letterSpacing: '1px',
        }}>
          ★ UVCE HEIHA ★
        </p>
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '1px',
          color: 'rgba(228, 216, 192, 0.7)',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}>
          Northeast India Student Community · UVCE Bangalore
        </p>
        <div style={{
          width: '180px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.45), transparent)',
          margin: '14px auto',
        }} />
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'rgba(136, 152, 184, 0.7)',
        }}>
          © {new Date().getFullYear()} UVCE HEIHA —&nbsp;
          <span style={{ color: 'rgba(240, 192, 64, 0.55)' }}>Made with ♥ far from home</span>
        </p>
        <div style={{
          marginTop: '14px',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: 'rgba(136, 152, 184, 0.35)',
          letterSpacing: '0.5px',
        }}>
          [ VISITOR: 001337 ] · [ LAST UPDATED: {new Date().getFullYear()} ]
        </div>
      </div>
    </footer>
  );
}

export default Footer;
