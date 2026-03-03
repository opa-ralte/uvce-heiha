import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const EMPTY = { name: '', batch: '', field: '', company: '', message: '' };

export default function AdminAlumni() {
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
      const res = await axios.get('/api/alumni');
      setItems(res.data.data);
    } catch { }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setError(''); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ name: item.name, batch: item.batch, field: item.field, company: item.company, message: item.message }); setError(''); setModal(true); };
  const closeModal = () => setModal(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await axios.put(`/api/alumni/${editing._id}`, form, { headers });
      } else {
        await axios.post('/api/alumni', form, { headers });
      }
      closeModal();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this alumni record?')) return;
    try {
      await axios.delete(`/api/alumni/${id}`, { headers });
      fetchData();
    } catch { }
  };

  return (
    <AdminLayout title="Manage Alumni">
      <div className="section-header">
        <h2>Alumni Records</h2>
        <button className="btn-add" onClick={openAdd}>+ Add Alumni</button>
      </div>

      <div className="data-table-wrapper">
        {loading ? (
          <div className="loading-state">Loading…</div>
        ) : items.length === 0 ? (
          <div className="empty-state">No alumni records yet.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Field</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td><span className="badge">{item.batch}</span></td>
                  <td>{item.field}</td>
                  <td>{item.company}</td>
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
            <h3>{editing ? 'Edit Alumni' : 'Add Alumni'}</h3>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', label: 'Full Name', type: 'text' },
                { name: 'batch', label: 'Batch Year', type: 'text' },
                { name: 'field', label: 'Field / Discipline', type: 'text' },
                { name: 'company', label: 'Company / Organization', type: 'text' },
              ].map((f) => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required />
                </div>
              ))}
              <div className="form-group">
                <label>Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} />
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
