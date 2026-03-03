import React, { useState, useEffect, useCallback } from 'react';

/* ── design tokens (matches site theme) ─────────────────── */
const G = '#f0c040';
const O = '#ff7040';
const C = '#00ccee';
const CARD = 'rgba(12,26,56,0.85)';
const BORDER = 'rgba(240,192,64,0.35)';

const ff = { pixel: "'Press Start 2P', monospace", orb: "'Orbitron', sans-serif", body: "'Inter', sans-serif" };

/* ── helpers ─────────────────────────────────────────────── */
const apiHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/* ── tiny shared components ──────────────────────────────── */
function Btn({ children, onClick, variant = 'primary', disabled = false, small = false }) {
  const [hov, setHov] = useState(false);
  const base = {
    fontFamily: ff.orb, fontSize: small ? '9px' : '10px', fontWeight: '600',
    letterSpacing: '0.5px', textTransform: 'uppercase', border: 'none',
    borderRadius: '4px', cursor: disabled ? 'not-allowed' : 'pointer',
    padding: small ? '6px 12px' : '10px 20px', transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
  };
  const vars = {
    primary: { bg: hov ? `linear-gradient(135deg,${G},#c09828)` : 'linear-gradient(135deg,#7a0000,#4a0000)', color: hov ? '#060d1e' : G, boxShadow: hov ? `0 4px 18px rgba(240,192,64,0.5)` : `0 0 12px rgba(240,192,64,0.25)` },
    danger:  { bg: hov ? 'linear-gradient(135deg,#cc2200,#880000)' : 'linear-gradient(135deg,#550000,#330000)', color: hov ? '#fff' : '#ff8080', boxShadow: hov ? '0 4px 14px rgba(200,30,0,0.45)' : 'none' },
    ghost:   { bg: hov ? 'rgba(240,192,64,0.12)' : 'transparent', color: hov ? G : 'rgba(240,192,64,0.65)', boxShadow: 'none', border: `1px solid ${BORDER}` },
    success: { bg: hov ? 'linear-gradient(135deg,#00aa55,#007733)' : 'linear-gradient(135deg,#005522,#003311)', color: hov ? '#fff' : '#44ee88', boxShadow: 'none' },
  };
  const v = vars[variant] || vars.primary;
  return (
    <button style={{ ...base, background: v.bg, color: v.color, boxShadow: v.boxShadow, border: v.border || 'none' }}
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder = '', required = false, textarea = false }) {
  const inputStyle = {
    width: '100%', background: 'rgba(8,16,36,0.8)', border: `1px solid ${BORDER}`,
    borderRadius: '4px', color: 'rgba(228,216,192,0.9)', fontFamily: ff.body,
    fontSize: '14px', padding: '10px 12px', outline: 'none', transition: 'border-color 0.2s',
    resize: textarea ? 'vertical' : undefined, minHeight: textarea ? '80px' : undefined,
  };
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', letterSpacing: '0.5px', color: 'rgba(240,192,64,0.75)', marginBottom: '6px', textTransform: 'uppercase' }}>
        {label}{required && <span style={{ color: O, marginLeft: '4px' }}>*</span>}
      </label>
      {textarea
        ? <textarea style={inputStyle} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        : <input style={inputStyle} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => (e.target.style.borderColor = G)} onBlur={e => (e.target.style.borderColor = BORDER)} />}
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', letterSpacing: '0.5px', color: 'rgba(240,192,64,0.75)', marginBottom: '6px', textTransform: 'uppercase' }}>
        {label}
      </label>
      <select style={{ width: '100%', background: 'rgba(8,16,36,0.8)', border: `1px solid ${BORDER}`, borderRadius: '4px', color: 'rgba(228,216,192,0.9)', fontFamily: ff.body, fontSize: '14px', padding: '10px 12px', outline: 'none' }}
        value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);
  const colors = { success: { bg: 'rgba(0,80,40,0.92)', border: '#00aa55', icon: '✅' }, error: { bg: 'rgba(80,0,0,0.92)', border: '#cc2200', icon: '❌' } };
  const c = colors[type] || colors.success;
  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, background: c.bg, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', backdropFilter: 'blur(14px)', minWidth: '260px', maxWidth: '360px' }}>
      <span style={{ fontSize: '18px' }}>{c.icon}</span>
      <span style={{ fontFamily: ff.body, fontSize: '14px', color: 'rgba(228,216,192,0.95)', flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(228,216,192,0.5)', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>×</button>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: CARD, border: `1px solid ${O}`, borderRadius: '8px', padding: '28px 32px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: `0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(255,112,64,0.3)`, backdropFilter: 'blur(14px)' }}>
        <div style={{ fontSize: '32px', marginBottom: '14px' }}>⚠️</div>
        <p style={{ fontFamily: ff.body, fontSize: '15px', color: 'rgba(228,216,192,0.9)', lineHeight: '1.6', marginBottom: '24px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
          <Btn variant="danger" onClick={onConfirm}>Yes, Delete</Btn>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9997, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '28px', maxWidth: '580px', width: '100%', boxShadow: `0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(240,192,64,0.2)`, backdropFilter: 'blur(14px)', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <h3 style={{ fontFamily: ff.pixel, fontSize: '10px', color: G, textShadow: `0 0 12px rgba(240,192,64,0.5)` }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(240,192,64,0.6)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Section: Alumni ─────────────────────────────────────── */
function AlumniSection({ token, showToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({ name: '', batch: '', field: '', company: '', message: '' });

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/alumni').then(r => r.json()).then(d => { setItems(d.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm({ name: '', batch: '', field: '', company: '', message: '' }); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, batch: item.batch, field: item.field, company: item.company, message: item.message }); setModalOpen(true); };

  const save = async () => {
    if (!form.name || !form.batch || !form.field || !form.company || !form.message) { showToast('Please fill all required fields.', 'error'); return; }
    const url = editing ? `/api/alumni/${editing.id}` : '/api/alumni';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: apiHeaders(token), body: JSON.stringify(form) });
    if (res.ok) { showToast(editing ? 'Alumni updated!' : 'Alumni added!'); setModalOpen(false); load(); }
    else { showToast('Something went wrong. Please try again.', 'error'); }
  };

  const del = async (id) => {
    const res = await fetch(`/api/alumni/${id}`, { method: 'DELETE', headers: apiHeaders(token) });
    if (res.ok) { showToast('Alumni removed.'); load(); }
    else { showToast('Delete failed.', 'error'); }
    setConfirm(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: ff.pixel, fontSize: '10px', color: G, marginBottom: '6px' }}>🎓 Alumni</h2>
          <p style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(136,152,184,0.8)' }}>{items.length} alumni listed</p>
        </div>
        <Btn onClick={openAdd}>+ Add Alumni</Btn>
      </div>

      {loading ? <LoadingMsg /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'rgba(8,16,36,0.7)', border: `1px solid ${BORDER}`, borderRadius: '6px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontFamily: ff.body, fontSize: '15px', fontWeight: '600', color: G, marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontFamily: ff.orb, fontSize: '9px', color: O, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Batch {item.batch} · {item.field} @ {item.company}</div>
                <div style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(228,216,192,0.7)', fontStyle: 'italic' }}>"{item.message}"</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Btn small variant="ghost" onClick={() => openEdit(item)}>✏️ Edit</Btn>
                <Btn small variant="danger" onClick={() => setConfirm({ id: item.id, name: item.name })}>🗑️ Delete</Btn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? '✏️ Edit Alumni' : '+ Add New Alumni'} onClose={() => setModalOpen(false)}>
          <Input label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. Lalthansanga Pachuau" required />
          <Input label="Batch Year" value={form.batch} onChange={v => setForm(f => ({ ...f, batch: v }))} placeholder="e.g. 2020" required />
          <Input label="Field / Branch" value={form.field} onChange={v => setForm(f => ({ ...f, field: v }))} placeholder="e.g. Computer Science" required />
          <Input label="Company / Organisation" value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))} placeholder="e.g. Google" required />
          <Input label="Inspirational Message" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} placeholder="A short message for current students..." required textarea />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn onClick={save}>{editing ? 'Save Changes' : 'Add Alumni'}</Btn>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmModal
          message={`Are you sure you want to remove "${confirm.name}" from the alumni list? This cannot be undone.`}
          onConfirm={() => del(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

/* ── Section: Gallery ────────────────────────────────────── */
const galleryCategories = ['Cultural Events', 'Annual Fest', 'Sports', 'General', 'Academic'];
const galleryColors = ['#8B0000', '#1a237e', '#4a148c', '#1b5e20', '#e65100', '#880e4f', '#006064', '#37474f'];

function GallerySection({ token, showToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Cultural Events', color: '#8B0000', description: '' });

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/gallery').then(r => r.json()).then(d => { setItems(d.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm({ title: '', category: 'Cultural Events', color: '#8B0000', description: '' }); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, category: item.category, color: item.color, description: item.description }); setModalOpen(true); };

  const save = async () => {
    if (!form.title || !form.description) { showToast('Please fill all required fields.', 'error'); return; }
    const url = editing ? `/api/gallery/${editing.id}` : '/api/gallery';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: apiHeaders(token), body: JSON.stringify(form) });
    if (res.ok) { showToast(editing ? 'Gallery item updated!' : 'Gallery item added!'); setModalOpen(false); load(); }
    else { showToast('Something went wrong. Please try again.', 'error'); }
  };

  const del = async (id) => {
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: apiHeaders(token) });
    if (res.ok) { showToast('Gallery item removed.'); load(); }
    else { showToast('Delete failed.', 'error'); }
    setConfirm(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: ff.pixel, fontSize: '10px', color: G, marginBottom: '6px' }}>📷 Gallery</h2>
          <p style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(136,152,184,0.8)' }}>{items.length} items in gallery</p>
        </div>
        <Btn onClick={openAdd}>+ Add Item</Btn>
      </div>

      {loading ? <LoadingMsg /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'rgba(8,16,36,0.7)', border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ height: '80px', background: `linear-gradient(135deg, ${item.color} 0%, rgba(0,0,0,0.85) 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📸</div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontFamily: ff.orb, fontSize: '7px', color: O, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>{item.category}</div>
                <div style={{ fontFamily: ff.body, fontSize: '14px', fontWeight: '600', color: G, marginBottom: '5px', lineHeight: '1.3' }}>{item.title}</div>
                <div style={{ fontFamily: ff.body, fontSize: '12px', color: 'rgba(136,152,184,0.8)', lineHeight: '1.4', marginBottom: '10px' }}>{item.description}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Btn small variant="ghost" onClick={() => openEdit(item)}>✏️ Edit</Btn>
                  <Btn small variant="danger" onClick={() => setConfirm({ id: item.id, name: item.title })}>🗑️</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? '✏️ Edit Gallery Item' : '+ Add Gallery Item'} onClose={() => setModalOpen(false)}>
          <Input label="Event Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Chapchar Kut 2024" required />
          <Select label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={galleryCategories} />
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', letterSpacing: '0.5px', color: 'rgba(240,192,64,0.75)', marginBottom: '8px', textTransform: 'uppercase' }}>Card Colour</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {galleryColors.map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                  style={{ width: '28px', height: '28px', borderRadius: '4px', background: c, border: form.color === c ? `2px solid ${G}` : '2px solid transparent', cursor: 'pointer', transition: 'border-color 0.15s' }} />
              ))}
            </div>
          </div>
          <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Brief description of the event..." required textarea />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn onClick={save}>{editing ? 'Save Changes' : 'Add Item'}</Btn>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmModal
          message={`Remove "${confirm.name}" from the gallery? This cannot be undone.`}
          onConfirm={() => del(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

/* ── Section: Events ─────────────────────────────────────── */
const eventCategories = ['Annual', 'Cultural', 'Academic', 'Sports', 'Social'];

function EventsSection({ token, showToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', category: 'Cultural', description: '' });

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/events').then(r => r.json()).then(d => { setItems(d.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm({ title: '', date: '', category: 'Cultural', description: '' }); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, date: item.date, category: item.category, description: item.description }); setModalOpen(true); };

  const save = async () => {
    if (!form.title || !form.date || !form.description) { showToast('Please fill all required fields.', 'error'); return; }
    const url = editing ? `/api/events/${editing.id}` : '/api/events';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: apiHeaders(token), body: JSON.stringify(form) });
    if (res.ok) { showToast(editing ? 'Event updated!' : 'Event added!'); setModalOpen(false); load(); }
    else { showToast('Something went wrong. Please try again.', 'error'); }
  };

  const del = async (id) => {
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE', headers: apiHeaders(token) });
    if (res.ok) { showToast('Event removed.'); load(); }
    else { showToast('Delete failed.', 'error'); }
    setConfirm(null);
  };

  const catColor = { Annual: '#f0c040', Cultural: '#00ccee', Academic: '#ff7040', Sports: '#44ee88', Social: '#cc88ff' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: ff.pixel, fontSize: '10px', color: G, marginBottom: '6px' }}>📅 Events</h2>
          <p style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(136,152,184,0.8)' }}>{items.length} events listed</p>
        </div>
        <Btn onClick={openAdd}>+ Add Event</Btn>
      </div>

      {loading ? <LoadingMsg /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'rgba(8,16,36,0.7)', border: `1px solid ${BORDER}`, borderRadius: '6px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: ff.body, fontSize: '15px', fontWeight: '600', color: G }}>{item.title}</span>
                  <span style={{ fontFamily: ff.orb, fontSize: '7px', fontWeight: '700', color: '#060d1e', background: catColor[item.category] || G, borderRadius: '3px', padding: '2px 7px', textTransform: 'uppercase' }}>{item.category}</span>
                </div>
                <div style={{ fontFamily: ff.orb, fontSize: '9px', color: C, letterSpacing: '0.5px', marginBottom: '6px' }}>📅 {item.date}</div>
                <div style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(228,216,192,0.7)' }}>{item.description}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Btn small variant="ghost" onClick={() => openEdit(item)}>✏️ Edit</Btn>
                <Btn small variant="danger" onClick={() => setConfirm({ id: item.id, name: item.title })}>🗑️ Delete</Btn>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? '✏️ Edit Event' : '+ Add New Event'} onClose={() => setModalOpen(false)}>
          <Input label="Event Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Freshers Welcome 2025" required />
          <Input label="Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} required />
          <Select label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={eventCategories} />
          <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Brief description of the event..." required textarea />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn onClick={save}>{editing ? 'Save Changes' : 'Add Event'}</Btn>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmModal
          message={`Remove event "${confirm.name}"? This cannot be undone.`}
          onConfirm={() => del(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

/* ── Overview section ────────────────────────────────────── */
function OverviewSection({ onNavigate }) {
  const [counts, setCounts] = useState({ alumni: '…', gallery: '…', events: '…' });

  useEffect(() => {
    Promise.all([
      fetch('/api/alumni').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
      fetch('/api/events').then(r => r.json()),
    ]).then(([a, g, e]) => setCounts({ alumni: a.data.length, gallery: g.data.length, events: e.data.length }));
  }, []);

  const cards = [
    { emoji: '🎓', label: 'Alumni', count: counts.alumni, tab: 'alumni', desc: 'Add, edit or remove alumni profiles and their messages.' },
    { emoji: '📷', label: 'Gallery', count: counts.gallery, tab: 'gallery', desc: 'Manage event photos, titles, and categories.' },
    { emoji: '📅', label: 'Events', count: counts.events, tab: 'events', desc: 'Create, update or delete upcoming & past events.' },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: ff.pixel, fontSize: '10px', color: G, marginBottom: '8px' }}>📊 Dashboard Overview</h2>
      <p style={{ fontFamily: ff.body, fontSize: '14px', color: 'rgba(228,216,192,0.7)', marginBottom: '24px', lineHeight: '1.6' }}>
        Welcome to the HEIHA Admin Portal. Use the sections below to manage website content — no coding skills needed!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {cards.map(c => (
          <div key={c.tab} onClick={() => onNavigate(c.tab)}
            style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '22px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.boxShadow = `0 0 20px rgba(240,192,64,0.25)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{c.emoji}</div>
            <div style={{ fontFamily: ff.pixel, fontSize: '18px', color: G, marginBottom: '4px' }}>{c.count}</div>
            <div style={{ fontFamily: ff.orb, fontSize: '9px', fontWeight: '700', color: O, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>{c.label}</div>
            <div style={{ fontFamily: ff.body, fontSize: '12px', color: 'rgba(136,152,184,0.85)', lineHeight: '1.5', marginBottom: '12px' }}>{c.desc}</div>
            <span style={{ fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', color: C, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Manage →</span>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(0,30,60,0.6)', border: '1px solid rgba(0,204,238,0.25)', borderRadius: '8px', padding: '18px 22px' }}>
        <div style={{ fontFamily: ff.pixel, fontSize: '9px', color: C, marginBottom: '10px' }}>💡 Quick Tips</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Click any section card above to manage its content.',
            'Use the "+ Add" buttons to create new entries.',
            'Click ✏️ Edit on any item to update its details.',
            'Click 🗑️ Delete and confirm to remove an item permanently.',
            'All changes take effect on the website immediately.',
          ].map((tip, i) => (
            <li key={i} style={{ fontFamily: ff.body, fontSize: '13px', color: 'rgba(228,216,192,0.75)', paddingLeft: '18px', position: 'relative', lineHeight: '1.5' }}>
              <span style={{ position: 'absolute', left: 0, color: C }}>›</span>{tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LoadingMsg() {
  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: ff.pixel, fontSize: '10px', color: G }}>
      Loading… <span className="blink">_</span>
    </div>
  );
}

/* ── Login screen ────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
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
        sessionStorage.setItem('heiha_admin_token', data.token);
        onLogin(data.token);
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Could not connect to server. Make sure the server is running.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '40px 36px', maxWidth: '420px', width: '100%', boxShadow: `0 12px 48px rgba(0,0,0,0.7), 0 0 30px rgba(240,192,64,0.18)`, backdropFilter: 'blur(18px)', textAlign: 'center' }}>
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>🔐</div>
        <h1 style={{ fontFamily: ff.pixel, fontSize: '13px', color: G, textShadow: `0 0 20px rgba(240,192,64,0.6)`, marginBottom: '8px', lineHeight: '1.6' }}>Admin Portal</h1>
        <p style={{ fontFamily: ff.orb, fontSize: '9px', fontWeight: '500', letterSpacing: '1.5px', color: O, textTransform: 'uppercase', marginBottom: '28px' }}>UVCE HEIHA</p>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', letterSpacing: '0.5px', color: 'rgba(240,192,64,0.75)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password…"
              style={{ width: '100%', background: 'rgba(8,16,36,0.9)', border: `1px solid ${error ? O : BORDER}`, borderRadius: '4px', color: 'rgba(228,216,192,0.9)', fontFamily: ff.body, fontSize: '15px', padding: '12px 14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = G)}
              onBlur={e => (e.target.style.borderColor = error ? O : BORDER)}
              autoFocus
            />
          </div>
          {error && (
            <div style={{ background: 'rgba(80,0,0,0.55)', border: '1px solid rgba(200,30,0,0.5)', borderRadius: '4px', padding: '10px 14px', marginBottom: '16px', fontFamily: ff.body, fontSize: '13px', color: '#ff8080', textAlign: 'left' }}>
              ⚠️ {error}
            </div>
          )}
          <button type="submit" disabled={loading || !password.trim()}
            style={{ width: '100%', background: `linear-gradient(135deg, #7a0000, #4a0000)`, color: G, border: `1px solid ${BORDER}`, borderRadius: '4px', padding: '12px', fontFamily: ff.orb, fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: loading || !password.trim() ? 'not-allowed' : 'pointer', opacity: loading || !password.trim() ? 0.6 : 1, transition: 'all 0.2s ease', boxShadow: `0 0 16px rgba(240,192,64,0.25)` }}>
            {loading ? 'Verifying…' : '🔓 Enter Portal'}
          </button>
        </form>
        <p style={{ fontFamily: ff.body, fontSize: '12px', color: 'rgba(136,152,184,0.55)', marginTop: '20px', lineHeight: '1.5' }}>
          Only authorized HEIHA admins can access this portal.
        </p>
      </div>
    </div>
  );
}

/* ── Main Admin component ────────────────────────────────── */
function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('heiha_admin_token') || null);
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const logout = () => {
    sessionStorage.removeItem('heiha_admin_token');
    setToken(null);
  };

  if (!token) return <LoginScreen onLogin={setToken} />;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'alumni',   label: '🎓 Alumni' },
    { id: 'gallery',  label: '📷 Gallery' },
    { id: 'events',   label: '📅 Events' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '24px 20px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '16px 22px', boxShadow: `0 4px 24px rgba(0,0,0,0.45), 0 0 16px rgba(240,192,64,0.15)`, backdropFilter: 'blur(14px)' }}>
          <div>
            <h1 style={{ fontFamily: ff.pixel, fontSize: '12px', color: G, textShadow: `0 0 16px rgba(240,192,64,0.6)`, marginBottom: '4px' }}>⚙️ Admin Portal</h1>
            <p style={{ fontFamily: ff.orb, fontSize: '9px', fontWeight: '500', letterSpacing: '1px', color: O, textTransform: 'uppercase' }}>UVCE HEIHA Content Management</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href="/" style={{ fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', color: 'rgba(240,192,64,0.7)', textDecoration: 'none', letterSpacing: '0.5px', textTransform: 'uppercase' }}>← View Site</a>
            <Btn small variant="ghost" onClick={logout}>🚪 Logout</Btn>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Sidebar nav */}
        <nav style={{ width: '200px', flexShrink: 0, background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '12px', backdropFilter: 'blur(14px)', position: 'sticky', top: '20px' }}>
          <div style={{ fontFamily: ff.orb, fontSize: '8px', fontWeight: '700', letterSpacing: '1.5px', color: 'rgba(240,192,64,0.5)', textTransform: 'uppercase', padding: '6px 10px 10px', borderBottom: `1px solid rgba(240,192,64,0.15)`, marginBottom: '8px' }}>Navigation</div>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: active ? 'rgba(240,192,64,0.15)' : 'transparent', border: active ? `1px solid rgba(240,192,64,0.35)` : '1px solid transparent', borderRadius: '4px', color: active ? G : 'rgba(228,216,192,0.65)', fontFamily: ff.orb, fontSize: '9px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '10px 12px', cursor: 'pointer', marginBottom: '4px', transition: 'all 0.15s ease' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(240,192,64,0.07)'; e.currentTarget.style.color = 'rgba(240,192,64,0.85)'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(228,216,192,0.65)'; } }}>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '28px', backdropFilter: 'blur(14px)', boxShadow: `0 8px 32px rgba(0,0,0,0.45)` }}>
          {activeTab === 'overview' && <OverviewSection onNavigate={setActiveTab} />}
          {activeTab === 'alumni'   && <AlumniSection  token={token} showToast={showToast} />}
          {activeTab === 'gallery'  && <GallerySection token={token} showToast={showToast} />}
          {activeTab === 'events'   && <EventsSection  token={token} showToast={showToast} />}
        </div>
      </div>

      {toast && (
        <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default Admin;
