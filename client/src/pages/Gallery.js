import React, { useState, useEffect } from 'react';
import MarqueeBar from '../components/MarqueeBar';

const pageStyle = {
  minHeight: '100vh',
  backgroundColor: '#0a0a1a',
  padding: '30px 20px',
};

const categories = ['All', 'Cultural Events', 'Annual Fest', 'Sports', 'General', 'Academic'];

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
    <div style={pageStyle}>
      <MarqueeBar text="★ HEIHA GALLERY ★ | Memories, celebrations, and community moments ★ | Culture, sports, and smiles ★" />
      
      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '20px',
            color: '#ffd700',
            textShadow: '4px 4px 0px #000, -2px -2px 0px #8b6914',
          }}>
            ★ GALLERY ★
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#ff6b35',
            marginTop: '10px',
          }}>
            Memories preserved in pixels — our community in action
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          border: '3px solid #ffd700',
          boxShadow: '4px 4px 0px #000',
          backgroundColor: '#0d1b2a',
          padding: '15px 20px',
          marginBottom: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: '#ffd700',
            marginRight: '10px',
          }}>
            FILTER:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                backgroundColor: activeCategory === cat ? '#ffd700' : '#8b0000',
                color: activeCategory === cat ? '#0a0a1a' : '#ffd700',
                border: '2px solid #ffd700',
                padding: '6px 12px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #000',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map((item) => (
              <div key={item.id} style={{
                border: '3px solid #ffd700',
                boxShadow: '4px 4px 0px #000, 7px 7px 0px #8b6914',
                backgroundColor: '#0d1b2a',
                overflow: 'hidden',
              }}>
                {/* Placeholder image box */}
                <div style={{
                  height: '180px',
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  borderBottom: '3px solid #ffd700',
                  position: 'relative',
                  background: `linear-gradient(135deg, ${item.color} 0%, #000 100%)`,
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
                  }}></div>
                  <div style={{
                    fontSize: '40px',
                    marginBottom: '5px',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    📸
                  </div>
                  <div style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '8px',
                    color: 'rgba(255,255,255,0.6)',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    [ PHOTO ]
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{
                    backgroundColor: '#8b0000',
                    border: '1px solid #ffd700',
                    padding: '3px 8px',
                    display: 'inline-block',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '7px',
                    color: '#ffd700',
                    marginBottom: '8px',
                  }}>
                    {item.category}
                  </div>
                  <h3 style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '20px',
                    color: '#ffd700',
                    marginBottom: '6px',
                    lineHeight: '1.2',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '16px',
                    color: '#a0a0a0',
                    lineHeight: '1.4',
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Notice */}
        <div style={{
          border: '3px dashed #8b6914',
          padding: '20px',
          textAlign: 'center',
          marginTop: '30px',
          backgroundColor: '#1a1a0a',
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: '#8b6914',
            marginBottom: '10px',
          }}>
            📷 SUBMIT YOUR PHOTOS
          </p>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '19px',
            color: '#f0e6c8',
          }}>
            Have photos from HEIHA events? Send them to heiha.uvce@gmail.com 
            with the event name and date to be featured in our gallery!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
