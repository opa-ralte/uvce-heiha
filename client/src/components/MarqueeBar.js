import React from 'react';

function MarqueeBar({ text }) {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #380000 0%, #820000 50%, #380000 100%)',
      borderTop: '1px solid rgba(240, 192, 64, 0.4)',
      borderBottom: '1px solid rgba(240, 192, 64, 0.4)',
      padding: '8px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      boxShadow: '0 0 20px rgba(130, 0, 0, 0.55)',
    }}>
      <span style={{
        display: 'inline-block',
        animation: 'marquee-scroll 25s linear infinite',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '10px',
        color: '#f0c040',
        textShadow: '0 0 12px rgba(240, 192, 64, 0.9)',
      }}>
        {text}
      </span>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default MarqueeBar;
