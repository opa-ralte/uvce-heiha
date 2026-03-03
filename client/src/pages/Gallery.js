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

const categories = ['All', 'Cultural Events', 'Annual Fest', 'Sports', 'General', 'Academic'];

/* ── hover-aware gallery card ────────────────── */
function GalleryCard({ item }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        background: 'rgba(12,26,56,0.72)',
        border: '1px solid rgba(240,192,64,0.32)',
        borderRadius: '8px',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.6), 0 0 24px rgba(240,192,64,0.38)'
          : '0 8px 28px rgba(0,0,0,0.45), 0 0 14px rgba(240,192,64,0.15)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s ease, transform 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder image */}
      <div style={{
        height: '170px',
        background: `linear-gradient(135deg, ${item.color} 0%, rgba(0,0,0,0.85) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottom: '1px solid rgba(240,192,64,0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 5px)',
        }} />
        <div style={{ fontSize: '36px', marginBottom: '4px', position: 'relative', zIndex: 1 }}>📸</div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: 'rgba(255,255,255,0.45)',
          position: 'relative',
          zIndex: 1,
        }}>
          [ PHOTO ]
        </div>
      </div>
      <div style={{ padding: '14px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #7a0000 0%, #4a0000 100%)',
          border: '1px solid rgba(240,192,64,0.35)',
          borderRadius: '3px',
          padding: '3px 8px',
          display: 'inline-block',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '7px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          color: G,
          marginBottom: '8px',
          textTransform: 'uppercase',
        }}>
          {item.category}
        </div>
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: '600',
          color: G,
          marginBottom: '5px',
          lineHeight: '1.3',
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(136,152,184,0.85)',
          lineHeight: '1.5',
        }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}


function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setGallery(data.data);
        setLoading(false);
      })
      .catch(() => {
        setGallery([
          { id: 1, title: 'Chapchar Kut Celebration 2023', category: 'Cultural Events', color: '#8B0000', description: 'Annual spring festival celebration' },
          { id: 2, title: 'Annual Freshers Welcome 2023', category: 'Annual Fest', color: '#1a237e', description: 'Welcoming new students from Northeast India' },
          { id: 3, title: 'Mizo Night 2022', category: 'Cultural Events', color: '#4a148c', description: 'A magical evening of Mizo cultural performances' },
          { id: 4, title: 'Sports Day 2023', category: 'Sports', color: '#1b5e20', description: 'Inter-community sports competition' },
          { id: 5, title: 'Farewell Party 2023', category: 'Annual Fest', color: '#e65100', description: 'Bidding farewell to graduating seniors' },
          { id: 6, title: 'NE Food Festival', category: 'Cultural Events', color: '#880e4f', description: 'A showcase of northeastern Indian cuisines' },
          { id: 7, title: 'Community Meeting 2023', category: 'General', color: '#006064', description: 'Annual general body meeting and elections' },
          { id: 8, title: 'Tech Fest Participation', category: 'Academic', color: '#37474f', description: 'HEIHA members at the annual college tech fest' },
        ]);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', padding: '30px 20px' }}>
      <MarqueeBar text="★ HEIHA GALLERY ★ · Memories, celebrations, and community moments ★ · Culture, sports, and smiles ★" />

      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: G,
            textShadow: `0 0 26px rgba(240,192,64,0.6), 3px 3px 0px rgba(0,0,0,0.6)`,
            lineHeight: '1.5',
          }}>
            ★ Gallery ★
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
            Memories preserved in pixels — our community in action
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          ...card,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          padding: '16px 20px',
        }}>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            color: 'rgba(240,192,64,0.7)',
            textTransform: 'uppercase',
            marginRight: '6px',
          }}>
            Filter:
          </span>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${G} 0%, #c09828 100%)`
                    : 'rgba(12,26,56,0.8)',
                  color: active ? '#060d1e' : 'rgba(240,192,64,0.8)',
                  border: active
                    ? `1px solid ${G}`
                    : '1px solid rgba(240,192,64,0.25)',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '8px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: active ? '0 0 14px rgba(240,192,64,0.45)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Upload Notice */}
        <div style={{
          border: '1px dashed rgba(240,192,64,0.3)',
          borderRadius: '8px',
          padding: '22px',
          textAlign: 'center',
          marginTop: '28px',
          background: 'rgba(10,16,38,0.55)',
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: 'rgba(240,192,64,0.6)',
            marginBottom: '10px',
            lineHeight: '1.6',
          }}>
            📷 Submit Your Photos
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(228,216,192,0.75)',
            lineHeight: '1.6',
          }}>
            Have photos from HEIHA events? Send them to{' '}
            <span style={{ color: G }}>heiha.uvce@gmail.com</span>{' '}
            with the event name and date to be featured in our gallery!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
