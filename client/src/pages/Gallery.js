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

const categories = ['All', 'Cultural Events', 'Annual Fest', 'Sports'];

const getItemImages = (item) => {
  if (Array.isArray(item.image)) return item.image;
  if (item.image) return [item.image];
  return [];
};

/* ── hover-aware gallery card ────────────────── */
function GalleryCard({ item, onOpenViewer }) {
  const [hovered, setHovered] = React.useState(false);
  const images = getItemImages(item);
  const hasImages = images.length > 0;
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
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '1px solid rgba(240,192,64,0.25)',
      }}>
        {hasImages ? (
          <img
            src={`http://localhost:5000${images[0]}`}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.35s ease',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              cursor: 'pointer',
            }}
            onClick={() => onOpenViewer(item, 0)}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{
            height: '170px',
            background: `linear-gradient(135deg, ${item.color} 0%, rgba(0,0,0,0.85) 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <div style={{ fontSize: '36px' }}>📸</div>
          </div>
        )}

        {images.length > 1 && (
          <button
            onClick={() => onOpenViewer(item, 0)}
            style={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              background: 'rgba(6, 13, 30, 0.85)',
              color: G,
              border: '1px solid rgba(240,192,64,0.45)',
              borderRadius: '999px',
              padding: '3px 9px',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            +{images.length - 1} More
          </button>
        )}
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
      {images.length > 0 && (
        <button
          onClick={() => onOpenViewer(item, 0)}
          style={{
            marginTop: '10px',
            background: 'linear-gradient(135deg, #7a0000 0%, #4a0000 100%)',
            color: G,
            border: '1px solid rgba(240,192,64,0.4)',
            borderRadius: '4px',
            padding: '6px 10px',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '8px',
            fontWeight: '600',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          View Photos ({images.length})
        </button>
      )}
    </div>
    </div >
  );
}


function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewer, setViewer] = useState({
    open: false,
    images: [],
    index: 0,
    title: '',
  });

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
          { id: 4, title: 'One Day', category: 'Sports', color: '#1b5e20', description: 'Inter-community sports competition' },
          { id: 5, title: 'Farewell Party 2023', category: 'Annual Fest', color: '#e65100', description: 'Bidding farewell to graduating seniors' },
          { id: 6, title: 'NE Food Festival', category: 'Cultural Events', color: '#880e4f', description: 'A showcase of northeastern Indian cuisines' },
          { id: 7, title: 'Community Meeting 2023', category: 'General', color: '#006064', description: 'Annual general body meeting and elections' },
          { id: 8, title: 'Tech Fest Participation', category: 'Academic', color: '#37474f', description: 'HEIHA members at the annual college tech fest' },
          { id: 9, title: 'Engineering Meet', category: 'Sports', color: '#1b5e20', description: 'Kum tin hian Engineering College hrang hrang Mizo awmna: AIT, PES Mandya leh UVCE te hian sports hrang hrang a in elna neih thin a ni' },
        ]);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  const openViewer = (item, startIndex = 0) => {
    const images = getItemImages(item);
    if (images.length === 0) return;
    setViewer({
      open: true,
      images,
      index: startIndex,
      title: item.title,
    });
  };

  const closeViewer = () => {
    setViewer({
      open: false,
      images: [],
      index: 0,
      title: '',
    });
  };

  const goPrev = () => {
    setViewer((prev) => ({
      ...prev,
      index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1,
    }));
  };

  const goNext = () => {
    setViewer((prev) => ({
      ...prev,
      index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1,
    }));
  };

  useEffect(() => {
    if (!viewer.open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewer.open]);

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
              <GalleryCard key={item.id} item={item} onOpenViewer={openViewer} />
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

      {viewer.open && (
        <div
          onClick={closeViewer}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 8, 20, 0.94)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(900px, 100%)',
              border: '1px solid rgba(240,192,64,0.35)',
              borderRadius: '10px',
              background: 'rgba(8,16,38,0.92)',
              boxShadow: '0 14px 40px rgba(0,0,0,0.65)',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(240,192,64,0.22)',
              padding: '10px 12px',
            }}>
              <div style={{
                color: G,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
              }}>
                {viewer.title} · {viewer.index + 1}/{viewer.images.length}
              </div>
              <button
                onClick={closeViewer}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(240,192,64,0.35)',
                  borderRadius: '4px',
                  color: G,
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              position: 'relative',
              height: 'min(70vh, 640px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.55)',
            }}>
              <img
                src={`http://localhost:5000${viewer.images[viewer.index]}`}
                alt={`${viewer.title} ${viewer.index + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />

              {viewer.images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      border: '1px solid rgba(240,192,64,0.5)',
                      background: 'rgba(6,13,30,0.8)',
                      color: G,
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={goNext}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '999px',
                      border: '1px solid rgba(240,192,64,0.5)',
                      background: 'rgba(6,13,30,0.8)',
                      color: G,
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
