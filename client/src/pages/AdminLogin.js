import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const G = '#f0c040';
const O = '#ff7040';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a1428 0%, #0f1f3c 100%)',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(12, 26, 56, 0.92)',
        border: `1px solid ${G}`,
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${G}40`,
      }}>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '24px',
          fontWeight: '700',
          color: G,
          marginBottom: '12px',
          letterSpacing: '1px',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          Admin Portal
        </h1>
        <p style={{
          color: 'rgba(240, 192, 64, 0.6)',
          textAlign: 'center',
          fontSize: '12px',
          marginBottom: '30px',
        }}>
          Enter admin password to continue
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: G,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: `1px solid rgba(240, 192, 64, 0.3)`,
                borderRadius: '4px',
                color: G,
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid #dc2626',
              borderRadius: '4px',
              padding: '10px',
              color: '#fca5a5',
              fontSize: '12px',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.boxShadow = `0 0 20px ${O}`;
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
