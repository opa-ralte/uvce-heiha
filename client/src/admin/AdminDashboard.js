import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ alumni: '-', gallery: '-', events: '-' });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      axios.get('/api/alumni', { headers }),
      axios.get('/api/gallery', { headers }),
      axios.get('/api/events', { headers }),
    ])
      .then(([a, g, e]) =>
        setCounts({
          alumni: a.data.data.length,
          gallery: g.data.data.length,
          events: e.data.data.length,
        })
      )
      .catch(() => {});
  }, []);

  const stats = [
    { icon: '🎓', label: 'Alumni Records', value: counts.alumni, color: '#388bfd' },
    { icon: '🖼️', label: 'Gallery Items', value: counts.gallery, color: '#3fb950' },
    { icon: '📅', label: 'Events', value: counts.events, color: '#d2a8ff' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <h3 style={{ color: s.color }}>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="data-table-wrapper" style={{ padding: '1.5rem' }}>
        <h3 style={{ color: '#e6edf3', margin: '0 0 0.5rem' }}>Quick Start</h3>
        <p style={{ color: '#8b949e', margin: 0, fontSize: '0.9rem' }}>
          Use the sidebar to manage Alumni records, Gallery items, and Events.
          All changes are persisted to MongoDB.
        </p>
      </div>
    </AdminLayout>
  );
}
