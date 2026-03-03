import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const CATEGORIES = ['Annual', 'Cultural', 'Academic', 'Sports', 'General'];
const EMPTY = { title: '', date: '', category: 'Cultural', description: '' };

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  const headers = { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/events');
      setItems(res.data.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setError(''); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, date: item.date, category: item.category, description: item.description }); setError(''); setModal(true); };
  const closeModal = () => setModal(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await axios.put(`/api/events/${editing._id}`, form, { headers });
      } else {
        await axios.post('/api/events', form, { headers });
      }
      closeModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await axios.delete(`/api/events/${id}`, { headers });
      fetchData();
    } catch { }
  };

  return (
    <AdminLayout title="Manage Events">
      <div className="section-header">
        <h2>Events</h2>
        <button className="btn-add" onClick={openAdd}>+ Add Event</button>
      </div>

      <div className="data-table-wrapper">
        {loading ? (
          <div className="loading-state">Loading…</div>
        ) : items.length === 0 ? (
          <div className="empty-state">No events yet.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td><span className="badge">{item.category}</span></td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => openEdit(item)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{editing ? 'Edit Event' : 'Add Event'}</h3>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit">{editing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
