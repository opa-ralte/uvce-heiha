import React from 'react';

function MarqueeBar({ text }) {
  return (
    <div style={{
      backgroundColor: '#8b0000',
      borderTop: '3px solid #ffd700',
      borderBottom: '3px solid #ffd700',
      padding: '8px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        display: 'inline-block',
        animation: 'marquee-scroll 25s linear infinite',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '10px',
        color: '#ffd700',
        textShadow: '2px 2px 0px #000',
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
