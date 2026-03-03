import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './admin.css';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/alumni', label: 'Alumni', icon: '🎓' },
  { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { to: '/admin/events', label: 'Events', icon: '📅' },
];

export default function AdminLayout({ children, title }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-wrapper admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🏛️ HEIHA Admin</h2>
          <p>Welcome, {username}</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>{title}</h1>
        </div>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
