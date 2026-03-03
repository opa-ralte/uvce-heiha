import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/student-corner', label: 'Student Corner' },
  ];

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: scrolled
      ? 'rgba(6, 13, 30, 0.92)'
      : 'rgba(8, 16, 38, 0.82)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    borderBottom: '1px solid rgba(240, 192, 64, 0.35)',
    boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.6)' : '0 2px 16px rgba(0, 0, 0, 0.35)',
    transition: 'all 0.3s ease',
  };

  const innerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '62px',
  };

  const logoStyle = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '12px',
    color: '#f0c040',
    textShadow: '0 0 16px rgba(240, 192, 64, 0.7)',
    textDecoration: 'none',
    letterSpacing: '1px',
    flexShrink: 0,
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    gap: '4px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    const isHovered = hoveredLink === path;
    const highlighted = isActive || isHovered;
    return {
      display: 'block',
      padding: '7px 14px',
      fontFamily: "'Orbitron', sans-serif",
      fontSize: '10px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      color: highlighted ? '#060d1e' : 'rgba(240, 192, 64, 0.85)',
      background: highlighted
        ? 'linear-gradient(135deg, #f0c040 0%, #c09828 100%)'
        : 'transparent',
      borderRadius: '4px',
      border: highlighted
        ? '1px solid #f0c040'
        : '1px solid rgba(240, 192, 64, 0.2)',
      textDecoration: 'none',
      boxShadow: highlighted ? '0 0 14px rgba(240, 192, 64, 0.5)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
    };
  };

  const adminLinkStyle = {
    display: 'block',
    padding: '5px 10px',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '8px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    color: hoveredLink === '/admin' ? '#060d1e' : 'rgba(0,204,238,0.65)',
    background: hoveredLink === '/admin' ? 'rgba(0,204,238,0.8)' : 'transparent',
    borderRadius: '4px',
    border: '1px solid rgba(0,204,238,0.25)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    marginLeft: '4px',
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <Link to="/" style={logoStyle}>
          ★ HEIHA ★
        </Link>
        <ul style={navLinksStyle}>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={getLinkStyle(link.path)}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              style={adminLinkStyle}
              onMouseEnter={() => setHoveredLink('/admin')}
              onMouseLeave={() => setHoveredLink(null)}
              title="Admin Portal"
            >
              ⚙️ Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
