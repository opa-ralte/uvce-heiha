import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#0d1b2a',
  borderBottom: '4px solid #ffd700',
  boxShadow: '0 4px 0px #8b6914',
  padding: '0',
};

const logoStyle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '14px',
  color: '#ffd700',
  textShadow: '3px 3px 0px #000, -1px -1px 0px #8b6914',
  padding: '15px 20px',
  display: 'block',
};

const navLinksStyle = {
  display: 'flex',
  listStyle: 'none',
  margin: '0',
  padding: '0',
  flexWrap: 'wrap',
};

const getLinkStyle = (isActive) => ({
  display: 'block',
  padding: '12px 18px',
  fontFamily: "'Press Start 2P', monospace",
  fontSize: '9px',
  color: isActive ? '#0a0a1a' : '#ffd700',
  backgroundColor: isActive ? '#ffd700' : 'transparent',
  borderRight: '2px solid #ffd700',
  textDecoration: 'none',
  boxShadow: isActive ? 'inset 2px 2px 0px #8b6914' : 'none',
  cursor: 'pointer',
  transition: 'none',
});

function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { path: '/', label: '[ HOME ]' },
    { path: '/about', label: '[ ABOUT ]' },
    { path: '/alumni', label: '[ ALUMNI ]' },
    { path: '/gallery', label: '[ GALLERY ]' },
    { path: '/student-corner', label: '[ STUDENT CORNER ]' },
  ];

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <Link to="/" style={logoStyle}>
          ★ UVCE HEIHA ★
        </Link>
        <ul style={navLinksStyle}>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={getLinkStyle(
                  location.pathname === link.path || hoveredLink === link.path
                    ? true
                    : false
                )}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
