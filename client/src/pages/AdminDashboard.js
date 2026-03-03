import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const G = '#f0c040';
const O = '#ff7040';

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      background: active
        ? `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`
        : 'rgba(12, 26, 56, 0.8)',
      color: active ? '#000' : G,
      border: `1px solid ${active ? O : 'rgba(240,192,64,0.3)'}`,
      padding: '8px 16px',
      borderRadius: '4px',
      fontFamily: "'Orbitron', sans-serif",
      fontSize: '10px',
      fontWeight: '600',
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginRight: '8px',
    }}
  >
    {label}
  </button>
);

const FormField = ({ label, value, onChange, placeholder, type = 'text', textarea = false }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{
      display: 'block',
      color: G,
      fontFamily: "'Orbitron', sans-serif",
      fontSize: '9px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      marginBottom: '6px',
    }}>
      {label}
    </label>
    {textarea ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(240, 192, 64, 0.3)',
          borderRadius: '4px',
          color: G,
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          minHeight: '100px',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(240, 192, 64, 0.3)',
          borderRadius: '4px',
          color: G,
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          boxSizing: 'border-box',
        }}
      />
    )}
  </div>
);

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');
  const [loading, setLoading] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ title: '', category: '', color: '#8B0000', description: '', image: '' });
  const [editingGallery, setEditingGallery] = useState(null);

  // Alumni state
  const [alumniItems, setAlumniItems] = useState([]);
  const [alumniForm, setAlumniForm] = useState({ name: '', batch: '', field: '', company: '', message: '' });
  const [editingAlumni, setEditingAlumni] = useState(null);

  // Events state
  const [eventItems, setEventItems] = useState([]);
  const [eventForm, setEventForm] = useState({ title: '', date: '', category: '', description: '', images: [] });
  const [editingEvent, setEditingEvent] = useState(null);

  // Home state
  const [homeData, setHomeData] = useState({ hero: {}, sections: [] });
  const [homeForm, setHomeForm] = useState({ title: '', subtitle: '', tagline: '' });
  const [homeSection, setHomeSection] = useState({ title: '', content: '' });
  const [editingHomeSection, setEditingHomeSection] = useState(null);

  // About state
  const [aboutData, setAboutData] = useState({ title: '', content: '', sections: [] });
  const [aboutForm, setAboutForm] = useState({ title: '', content: '' });
  const [aboutSection, setAboutSection] = useState({ title: '', content: '' });
  const [editingAboutSection, setEditingAboutSection] = useState(null);

  // StudentCorner state
  const [studentCornerData, setStudentCornerData] = useState({ title: '', subtitle: '', resources: [], tips: [], collegeInfo: [], faqs: [], usefulLinks: [], contact: {} });
  const [studentCornerForm, setStudentCornerForm] = useState({ title: '', subtitle: '' });
  const [studentResource, setStudentResource] = useState({ title: '', description: '', icon: '' });
  const [editingResource, setEditingResource] = useState(null);
  const [studentTip, setStudentTip] = useState({ icon: '', tip: '', desc: '' });
  const [editingTip, setEditingTip] = useState(null);
  const [collegeInfo, setCollegeInfo] = useState({ title: '', items: [] });
  const [editingCollegeInfo, setEditingCollegeInfo] = useState(null);
  const [faq, setFaq] = useState({ q: '', a: '' });
  const [editingFaq, setEditingFaq] = useState(null);
  const [usefulLink, setUsefulLink] = useState({ label: '', url: '', icon: '', description: '' });
  const [editingLink, setEditingLink] = useState(null);
  const [contactForm, setContactForm] = useState({ email: '', whatsapp: '', responseTime: '' });
  const [studentCornerSection, setStudentCornerSection] = useState('resources'); // resources, tips, collegeInfo, faqs, links, contact

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [galleryRes, alumniRes, eventsRes, homeRes, aboutRes, scRes] = await Promise.all([
        fetch('/api/gallery'),
        fetch('/api/alumni'),
        fetch('/api/events'),
        fetch('/api/home'),
        fetch('/api/about'),
        fetch('/api/student-corner'),
      ]);

      if (galleryRes.ok) setGalleryItems((await galleryRes.json()).data);
      if (alumniRes.ok) setAlumniItems((await alumniRes.json()).data);
      if (eventsRes.ok) setEventItems((await eventsRes.json()).data);
      if (homeRes.ok) setHomeData((await homeRes.json()).data);
      if (aboutRes.ok) setAboutData((await aboutRes.json()).data);
      if (scRes.ok) setStudentCornerData((await scRes.json()).data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-token': token },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return data.filename;
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
    return null;
  };

  // ────────────────── GALLERY OPERATIONS ──────────────────

  const saveGalleryItem = async () => {
    if (!galleryForm.title || !galleryForm.category) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const method = editingGallery ? 'PUT' : 'POST';
      const url = editingGallery
        ? `/api/admin/gallery/${editingGallery.id}`
        : '/api/admin/gallery';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify(galleryForm),
      });

      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.data);
        setGalleryForm({ title: '', category: '', color: '#8B0000', description: '', image: '' });
        setEditingGallery(null);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteGalleryItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ────────────────── ALUMNI OPERATIONS ──────────────────

  const saveAlumniItem = async () => {
    if (!alumniForm.name || !alumniForm.batch) {
      alert('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      const method = editingAlumni ? 'PUT' : 'POST';
      const url = editingAlumni
        ? `/api/admin/alumni/${editingAlumni.id}`
        : '/api/admin/alumni';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify(alumniForm),
      });

      const data = await res.json();
      if (data.success) {
        setAlumniItems(data.data);
        setAlumniForm({ name: '', batch: '', field: '', company: '', message: '' });
        setEditingAlumni(null);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlumniItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/alumni/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      const data = await res.json();
      if (data.success) {
        setAlumniItems(data.data);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ────────────────── EVENTS OPERATIONS ──────────────────

  const saveEventItem = async () => {
    if (!eventForm.title || !eventForm.date) {
      alert('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : '/api/admin/events';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify(eventForm),
      });

      const data = await res.json();
      if (data.success) {
        setEventItems(data.data);
        setEventForm({ title: '', date: '', category: '', description: '', images: [] });
        setEditingEvent(null);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEventItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token },
      });

      const data = await res.json();
      if (data.success) {
        setEventItems(data.data);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1428 0%, #0f1f3c 100%)',
      padding: '20px',
      paddingTop: '40px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: `1px solid ${G}40`,
          paddingBottom: '20px',
        }}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '28px',
            fontWeight: '700',
            color: G,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              background: `linear-gradient(135deg, #7a0000 0%, #4a0000 100%)`,
              color: G,
              border: `1px solid ${G}`,
              padding: '8px 16px',
              borderRadius: '4px',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <TabButton
            active={activeTab === 'gallery'}
            onClick={() => setActiveTab('gallery')}
            label="Gallery"
          />
          <TabButton
            active={activeTab === 'alumni'}
            onClick={() => setActiveTab('alumni')}
            label="Alumni"
          />
          <TabButton
            active={activeTab === 'events'}
            onClick={() => setActiveTab('events')}
            label="Events"
          />
          <TabButton
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
            label="Home"
          />
          <TabButton
            active={activeTab === 'about'}
            onClick={() => setActiveTab('about')}
            label="About"
          />
          <TabButton
            active={activeTab === 'student-corner'}
            onClick={() => setActiveTab('student-corner')}
            label="Student Corner"
          />
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              {editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <FormField
                label="Title"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                placeholder="Event title"
              />
              <FormField
                label="Category"
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                placeholder="e.g., Cultural Events, Sports, Annual Fest"
              />
              <FormField
                label="Color"
                type="color"
                value={galleryForm.color}
                onChange={(e) => setGalleryForm({ ...galleryForm, color: e.target.value })}
              />
              <div>
                <label style={{
                  display: 'block',
                  color: G,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  placeholder="/images/..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(240, 192, 64, 0.3)',
                    borderRadius: '4px',
                    color: G,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  color: G,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files[0]) {
                      setLoading(true);
                      const url = await uploadImage(e.target.files[0]);
                      if (url) {
                        setGalleryForm({ ...galleryForm, image: url });
                      }
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  style={{
                    padding: '8px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(240, 192, 64, 0.3)',
                    borderRadius: '4px',
                    color: G,
                  }}
                />
              </div>
            </div>

            <FormField
              label="Description"
              value={galleryForm.description}
              onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
              placeholder="Event description"
              textarea
            />

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <button
                onClick={saveGalleryItem}
                disabled={loading}
                style={{
                  background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                  color: '#000',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {editingGallery ? 'Update' : 'Add'}
              </button>
              {editingGallery && (
                <button
                  onClick={() => {
                    setEditingGallery(null);
                    setGalleryForm({ title: '', category: '', color: '#8B0000', description: '', image: '' });
                  }}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Items List */}
            <div style={{
              borderTop: `1px solid ${G}40`,
              paddingTop: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px' }}>
                Gallery Items ({galleryItems.length})
              </h3>
              <div style={{
                display: 'grid',
                gap: '12px',
              }}>
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${G}30`,
                      borderRadius: '4px',
                      padding: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: G, fontWeight: '600', marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      <div style={{ color: 'rgba(240,192,64,0.6)', fontSize: '12px' }}>
                        {item.category}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingGallery(item);
                          setGalleryForm(item);
                        }}
                        style={{
                          background: 'rgba(122, 0, 0, 0.8)',
                          color: G,
                          border: `1px solid ${G}`,
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        style={{
                          background: 'rgba(220, 38, 38, 0.8)',
                          color: '#fca5a5',
                          border: '1px solid #dc2626',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alumni Tab */}
        {activeTab === 'alumni' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              {editingAlumni ? 'Edit Alumni' : 'Add Alumni'}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <FormField
                label="Name"
                value={alumniForm.name}
                onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                placeholder="Full name"
              />
              <FormField
                label="Batch"
                value={alumniForm.batch}
                onChange={(e) => setAlumniForm({ ...alumniForm, batch: e.target.value })}
                placeholder="e.g., 2015"
              />
              <FormField
                label="Field"
                value={alumniForm.field}
                onChange={(e) => setAlumniForm({ ...alumniForm, field: e.target.value })}
                placeholder="e.g., Software Engineering"
              />
              <FormField
                label="Company"
                value={alumniForm.company}
                onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })}
                placeholder="e.g., Infosys"
              />
            </div>

            <FormField
              label="Message"
              value={alumniForm.message}
              onChange={(e) => setAlumniForm({ ...alumniForm, message: e.target.value })}
              placeholder="Motivational message"
              textarea
            />

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <button
                onClick={saveAlumniItem}
                disabled={loading}
                style={{
                  background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                  color: '#000',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {editingAlumni ? 'Update' : 'Add'}
              </button>
              {editingAlumni && (
                <button
                  onClick={() => {
                    setEditingAlumni(null);
                    setAlumniForm({ name: '', batch: '', field: '', company: '', message: '' });
                  }}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Items List */}
            <div style={{
              borderTop: `1px solid ${G}40`,
              paddingTop: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px' }}>
                Alumni ({alumniItems.length})
              </h3>
              <div style={{
                display: 'grid',
                gap: '12px',
              }}>
                {alumniItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${G}30`,
                      borderRadius: '4px',
                      padding: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: G, fontWeight: '600', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ color: 'rgba(240,192,64,0.6)', fontSize: '12px' }}>
                        {item.batch} · {item.company}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingAlumni(item);
                          setAlumniForm(item);
                        }}
                        style={{
                          background: 'rgba(122, 0, 0, 0.8)',
                          color: G,
                          border: `1px solid ${G}`,
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAlumniItem(item.id)}
                        style={{
                          background: 'rgba(220, 38, 38, 0.8)',
                          color: '#fca5a5',
                          border: '1px solid #dc2626',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <FormField
                label="Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Event title"
              />
              <FormField
                label="Date"
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
              />
              <FormField
                label="Category"
                value={eventForm.category}
                onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                placeholder="e.g., Annual, Cultural, Academic"
              />
            </div>

            <FormField
              label="Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              placeholder="Event description"
              textarea
            />

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: G,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '9px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}>
                Upload Event Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = e.target.files;
                  if (files) {
                    setLoading(true);
                    const uploadedImages = [];
                    for (let file of files) {
                      const url = await uploadImage(file);
                      if (url) uploadedImages.push(url);
                    }
                    setEventForm({
                      ...eventForm,
                      images: [...eventForm.images, ...uploadedImages],
                    });
                    setLoading(false);
                  }
                }}
                disabled={loading}
                style={{
                  padding: '8px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(240, 192, 64, 0.3)',
                  borderRadius: '4px',
                  color: G,
                }}
              />
              {eventForm.images.length > 0 && (
                <div style={{
                  marginTop: '12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {eventForm.images.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        border: `1px solid ${G}`,
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={`http://localhost:5000${img}`}
                        alt="preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        onClick={() => {
                          setEventForm({
                            ...eventForm,
                            images: eventForm.images.filter((_, i) => i !== idx),
                          });
                        }}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          background: 'rgba(220, 38, 38, 0.9)',
                          border: 'none',
                          color: '#fff',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <button
                onClick={saveEventItem}
                disabled={loading}
                style={{
                  background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                  color: '#000',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {editingEvent ? 'Update' : 'Add'}
              </button>
              {editingEvent && (
                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setEventForm({ title: '', date: '', category: '', description: '', images: [] });
                  }}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Items List */}
            <div style={{
              borderTop: `1px solid ${G}40`,
              paddingTop: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px' }}>
                Events ({eventItems.length})
              </h3>
              <div style={{
                display: 'grid',
                gap: '12px',
              }}>
                {eventItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${G}30`,
                      borderRadius: '4px',
                      padding: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: G, fontWeight: '600', marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      <div style={{ color: 'rgba(240,192,64,0.6)', fontSize: '12px' }}>
                        {item.date} · {item.category} · {item.images?.length || 0} images
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setEditingEvent(item);
                          setEventForm(item);
                        }}
                        style={{
                          background: 'rgba(122, 0, 0, 0.8)',
                          color: G,
                          border: `1px solid ${G}`,
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEventItem(item.id)}
                        style={{
                          background: 'rgba(220, 38, 38, 0.8)',
                          color: '#fca5a5',
                          border: '1px solid #dc2626',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              Edit Home Page
            </h2>

            {/* Hero Section */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                Hero Section
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}>
                <FormField
                  label="Hero Title"
                  value={homeForm.title !== undefined ? homeForm.title : (homeData.hero?.title || '')}
                  onChange={(e) => setHomeForm({ ...homeForm, title: e.target.value })}
                  placeholder="★ UVCE HEIHA ★"
                />
                <FormField
                  label="Hero Subtitle"
                  value={homeForm.subtitle !== undefined ? homeForm.subtitle : (homeData.hero?.subtitle || '')}
                  onChange={(e) => setHomeForm({ ...homeForm, subtitle: e.target.value })}
                  placeholder="Himalayan Ethnic Inclusion and Heritage Association"
                />
              </div>

              <FormField
                label="Tagline"
                value={homeForm.tagline !== undefined ? homeForm.tagline : (homeData.hero?.tagline || '')}
                onChange={(e) => setHomeForm({ ...homeForm, tagline: e.target.value })}
                placeholder="Unite. Celebrate. Inspire."
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={async () => {
                    if (!homeForm.title && !homeForm.subtitle && !homeForm.tagline) {
                      alert('Please change at least one field');
                      return;
                    }
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/home', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'x-admin-token': token,
                        },
                        body: JSON.stringify({ 
                          hero: { 
                            ...homeData.hero, 
                            title: homeForm.title !== undefined ? homeForm.title : homeData.hero?.title,
                            subtitle: homeForm.subtitle !== undefined ? homeForm.subtitle : homeData.hero?.subtitle,
                            tagline: homeForm.tagline !== undefined ? homeForm.tagline : homeData.hero?.tagline,
                          } 
                        }),
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setHomeData(data.data);
                        setHomeForm({});
                        alert('Hero section updated successfully!');
                      }
                    } catch (err) {
                      alert('Failed to update hero section');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    opacity: loading ? 0.7 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Hero'}
                </button>
                <button
                  onClick={() => setHomeForm({})}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                Home Page Sections ({homeData.sections?.length || 0})
              </h3>
              
              {/* Add New Section Form */}
              {!editingHomeSection && (
                <div style={{ marginBottom: '20px' }}>
                  <FormField
                    label="Section Title"
                    value={homeSection.title}
                    onChange={(e) => setHomeSection({ ...homeSection, title: e.target.value })}
                    placeholder="e.g., About Us, Our Mission"
                  />
                  <FormField
                    label="Section Content"
                    value={homeSection.content}
                    onChange={(e) => setHomeSection({ ...homeSection, content: e.target.value })}
                    placeholder="Section description and details..."
                    textarea
                  />
                  <button
                    onClick={async () => {
                      if (!homeSection.title || !homeSection.content) {
                        alert('Please fill all fields');
                        return;
                      }
                      setLoading(true);
                      try {
                        const res = await fetch('/api/admin/home/sections', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'x-admin-token': token,
                          },
                          body: JSON.stringify(homeSection),
                        });
                        const data = await res.json();
                        setHomeData(data.data);
                        setHomeSection({ title: '', content: '' });
                        alert('Section added successfully!');
                      } catch (err) {
                        alert('Failed to add section');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                      color: '#000',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      opacity: loading ? 0.7 : 1,
                    }}
                    disabled={loading}
                  >
                    ➕ Add New Section
                  </button>
                </div>
              )}

              {/* Existing Sections */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {homeData.sections && homeData.sections.map((section) => (
                  <div key={section.id} style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: `1px solid ${G}20`,
                    borderRadius: '4px',
                    padding: '16px',
                  }}>
                    {editingHomeSection && editingHomeSection.id === section.id ? (
                      // Edit Mode
                      <>
                        <FormField
                          label="Title"
                          value={editingHomeSection.title}
                          onChange={(e) => setEditingHomeSection({ ...editingHomeSection, title: e.target.value })}
                          placeholder="Section title"
                        />
                        <FormField
                          label="Content"
                          value={editingHomeSection.content}
                          onChange={(e) => setEditingHomeSection({ ...editingHomeSection, content: e.target.value })}
                          placeholder="Section content"
                          textarea
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={async () => {
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/home/sections/${section.id}`, {
                                  method: 'PUT',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'x-admin-token': token,
                                  },
                                  body: JSON.stringify(editingHomeSection),
                                });
                                const data = await res.json();
                                setHomeData(data.data);
                                setEditingHomeSection(null);
                                alert('Section updated!');
                              } catch (err) {
                                alert('Failed to update');
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                              color: '#000',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                            disabled={loading}
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingHomeSection(null)}
                            style={{
                              background: 'rgba(12, 26, 56, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      // View Mode
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            color: G, 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            fontSize: '13px'
                          }}>
                            {section.title}
                          </div>
                          <div style={{ 
                            color: 'rgba(240,192,64,0.7)', 
                            fontSize: '12px',
                            lineHeight: '1.6'
                          }}>
                            {section.content}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button
                            onClick={() => setEditingHomeSection({ ...section })}
                            style={{
                              background: 'rgba(122, 0, 0, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Delete this section?')) return;
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/home/sections/${section.id}`, {
                                  method: 'DELETE',
                                  headers: { 'x-admin-token': token },
                                });
                                const data = await res.json();
                                setHomeData(data.data);
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: 'rgba(220, 38, 38, 0.8)',
                              color: '#fca5a5',
                              border: '1px solid #dc2626',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!homeData.sections || homeData.sections.length === 0) && (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'rgba(240,192,64,0.5)',
                    fontSize: '12px',
                  }}>
                    No sections yet. Add your first section above!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              Edit About Page
            </h2>

            {/* Main Content */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                Main About Content
              </h3>
              <FormField
                label="Page Title"
                value={aboutForm.title !== undefined ? aboutForm.title : (aboutData.title || '')}
                onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                placeholder="About UVCE HEIHA"
              />
              <FormField
                label="Page Content"
                value={aboutForm.content !== undefined ? aboutForm.content : (aboutData.content || '')}
                onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                placeholder="Tell the story of HEIHA..."
                textarea
              />

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={async () => {
                    if (!aboutForm.title && !aboutForm.content) {
                      alert('Please change at least one field');
                      return;
                    }
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/about', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'x-admin-token': token,
                        },
                        body: JSON.stringify({
                          title: aboutForm.title !== undefined ? aboutForm.title : aboutData.title,
                          content: aboutForm.content !== undefined ? aboutForm.content : aboutData.content,
                        }),
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setAboutData(data.data);
                        setAboutForm({});
                        alert('About page updated successfully!');
                      }
                    } catch (err) {
                      alert('Failed to update about page');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    opacity: loading ? 0.7 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save About'}
                </button>
                <button
                  onClick={() => setAboutForm({})}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* About Sections */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                About Page Sections ({aboutData.sections?.length || 0})
              </h3>
              
              {/* Add New Section Form */}
              {!editingAboutSection && (
                <div style={{ marginBottom: '20px' }}>
                  <FormField
                    label="Section Title"
                    value={aboutSection.title}
                    onChange={(e) => setAboutSection({ ...aboutSection, title: e.target.value })}
                    placeholder="e.g., Our History, Our Mission"
                  />
                  <FormField
                    label="Section Content"
                    value={aboutSection.content}
                    onChange={(e) => setAboutSection({ ...aboutSection, content: e.target.value })}
                    placeholder="Section description and details..."
                    textarea
                  />
                  <button
                    onClick={async () => {
                      if (!aboutSection.title || !aboutSection.content) {
                        alert('Please fill all fields');
                        return;
                      }
                      setLoading(true);
                      try {
                        const res = await fetch('/api/admin/about/sections', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'x-admin-token': token,
                          },
                          body: JSON.stringify(aboutSection),
                        });
                        const data = await res.json();
                        setAboutData(data.data);
                        setAboutSection({ title: '', content: '' });
                        alert('Section added successfully!');
                      } catch (err) {
                        alert('Failed to add section');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                      color: '#000',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      opacity: loading ? 0.7 : 1,
                    }}
                    disabled={loading}
                  >
                    ➕ Add New Section
                  </button>
                </div>
              )}

              {/* Existing Sections */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {aboutData.sections && aboutData.sections.map((section) => (
                  <div key={section.id} style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: `1px solid ${G}20`,
                    borderRadius: '4px',
                    padding: '16px',
                  }}>
                    {editingAboutSection && editingAboutSection.id === section.id ? (
                      // Edit Mode
                      <>
                        <FormField
                          label="Title"
                          value={editingAboutSection.title}
                          onChange={(e) => setEditingAboutSection({ ...editingAboutSection, title: e.target.value })}
                          placeholder="Section title"
                        />
                        <FormField
                          label="Content"
                          value={editingAboutSection.content}
                          onChange={(e) => setEditingAboutSection({ ...editingAboutSection, content: e.target.value })}
                          placeholder="Section content"
                          textarea
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={async () => {
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/about/sections/${section.id}`, {
                                  method: 'PUT',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'x-admin-token': token,
                                  },
                                  body: JSON.stringify(editingAboutSection),
                                });
                                const data = await res.json();
                                setAboutData(data.data);
                                setEditingAboutSection(null);
                                alert('Section updated!');
                              } catch (err) {
                                alert('Failed to update');
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                              color: '#000',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                            disabled={loading}
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingAboutSection(null)}
                            style={{
                              background: 'rgba(12, 26, 56, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      // View Mode
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            color: G, 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            fontSize: '13px'
                          }}>
                            {section.title}
                          </div>
                          <div style={{ 
                            color: 'rgba(240,192,64,0.7)', 
                            fontSize: '12px',
                            lineHeight: '1.6'
                          }}>
                            {section.content}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button
                            onClick={() => setEditingAboutSection({ ...section })}
                            style={{
                              background: 'rgba(122, 0, 0, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Delete this section?')) return;
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/about/sections/${section.id}`, {
                                  method: 'DELETE',
                                  headers: { 'x-admin-token': token },
                                });
                                const data = await res.json();
                                setAboutData(data.data);
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: 'rgba(220, 38, 38, 0.8)',
                              color: '#fca5a5',
                              border: '1px solid #dc2626',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!aboutData.sections || aboutData.sections.length === 0) && (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'rgba(240,192,64,0.5)',
                    fontSize: '12px',
                  }}>
                    No sections yet. Add your first section above!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Student Corner Tab */}
        {activeTab === 'student-corner' && (
          <div style={{
            background: 'rgba(12, 26, 56, 0.72)',
            border: `1px solid ${G}40`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h2 style={{ color: G, marginBottom: '20px', fontSize: '18px' }}>
              Edit Student Corner
            </h2>

            {/* Page Header */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                Student Corner Header
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}>
                <FormField
                  label="Page Title"
                  value={studentCornerForm.title !== undefined ? studentCornerForm.title : (studentCornerData.title || '')}
                  onChange={(e) => setStudentCornerForm({ ...studentCornerForm, title: e.target.value })}
                  placeholder="Student Corner"
                />
                <FormField
                  label="Subtitle"
                  value={studentCornerForm.subtitle !== undefined ? studentCornerForm.subtitle : (studentCornerData.subtitle || '')}
                  onChange={(e) => setStudentCornerForm({ ...studentCornerForm, subtitle: e.target.value })}
                  placeholder="Resources and Support for Students"
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={async () => {
                    if (!studentCornerForm.title && !studentCornerForm.subtitle) {
                      alert('Please change at least one field');
                      return;
                    }
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/student-corner', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'x-admin-token': token,
                        },
                        body: JSON.stringify({
                          title: studentCornerForm.title !== undefined ? studentCornerForm.title : studentCornerData.title,
                          subtitle: studentCornerForm.subtitle !== undefined ? studentCornerForm.subtitle : studentCornerData.subtitle,
                        }),
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setStudentCornerData(data.data);
                        setStudentCornerForm({});
                        alert('Student Corner updated successfully!');
                      }
                    } catch (err) {
                      alert('Failed to update page');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    textTransform: 'uppercase',
                    opacity: loading ? 0.7 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Header'}
                </button>
                <button
                  onClick={() => setStudentCornerForm({})}
                  style={{
                    background: 'rgba(12, 26, 56, 0.8)',
                    color: G,
                    border: `1px solid ${G}`,
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Sub-Navigation for Student Corner Sections */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
            }}>
              {[
                { id: 'resources', label: '📚 Resources' },
                { id: 'tips', label: '💡 Tips' },
                { id: 'collegeInfo', label: '🏫 College Info' },
                { id: 'faqs', label: '❓ FAQs' },
                { id: 'links', label: '🔗 Links' },
                { id: 'contact', label: '📞 Contact' },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setStudentCornerSection(section.id)}
                  style={{
                    background: studentCornerSection === section.id 
                      ? `linear-gradient(135deg, ${G} 0%, #c09828 100%)`
                      : 'rgba(20, 26, 56, 0.8)',
                    color: studentCornerSection === section.id ? '#060d1e' : G,
                    border: studentCornerSection === section.id ? 'none' : `1px solid ${G}60`,
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Resources Section */}
            {studentCornerSection === 'resources' && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${G}30`,
              borderRadius: '6px',
              padding: '20px',
            }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                Student Resources ({studentCornerData.resources?.length || 0})
              </h3>
              
              {/* Add New Resource Form */}
              {!editingResource && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '16px',
                  }}>
                    <FormField
                      label="Resource Title"
                      value={studentResource.title}
                      onChange={(e) => setStudentResource({ ...studentResource, title: e.target.value })}
                      placeholder="e.g., Academic Support, Career Guidance"
                    />
                    <FormField
                      label="Icon Emoji"
                      value={studentResource.icon}
                      onChange={(e) => setStudentResource({ ...studentResource, icon: e.target.value })}
                      placeholder="📚"
                    />
                  </div>
                  <FormField
                    label="Description"
                    value={studentResource.description}
                    onChange={(e) => setStudentResource({ ...studentResource, description: e.target.value })}
                    placeholder="Brief description of the resource..."
                    textarea
                  />
                  <button
                    onClick={async () => {
                      if (!studentResource.title || !studentResource.description) {
                        alert('Please fill title and description');
                        return;
                      }
                      setLoading(true);
                      try {
                        const res = await fetch('/api/admin/student-corner/resources', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'x-admin-token': token,
                          },
                          body: JSON.stringify(studentResource),
                        });
                        const data = await res.json();
                        setStudentCornerData(data.data);
                        setStudentResource({ title: '', description: '', icon: '' });
                        alert('Resource added successfully!');
                      } catch (err) {
                        alert('Failed to add resource');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                      color: '#000',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      opacity: loading ? 0.7 : 1,
                    }}
                    disabled={loading}
                  >
                    ➕ Add New Resource
                  </button>
                </div>
              )}

              {/* Existing Resources */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {studentCornerData.resources && studentCornerData.resources.map((resource) => (
                  <div key={resource.id} style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: `1px solid ${G}20`,
                    borderRadius: '4px',
                    padding: '16px',
                  }}>
                    {editingResource && editingResource.id === resource.id ? (
                      // Edit Mode
                      <>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr',
                          gap: '16px',
                        }}>
                          <FormField
                            label="Title"
                            value={editingResource.title}
                            onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                            placeholder="Resource title"
                          />
                          <FormField
                            label="Icon"
                            value={editingResource.icon}
                            onChange={(e) => setEditingResource({ ...editingResource, icon: e.target.value })}
                            placeholder="📚"
                          />
                        </div>
                        <FormField
                          label="Description"
                          value={editingResource.description}
                          onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                          placeholder="Resource description"
                          textarea
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={async () => {
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/student-corner/resources/${resource.id}`, {
                                  method: 'PUT',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'x-admin-token': token,
                                  },
                                  body: JSON.stringify(editingResource),
                                });
                                const data = await res.json();
                                setStudentCornerData(data.data);
                                setEditingResource(null);
                                alert('Resource updated!');
                              } catch (err) {
                                alert('Failed to update');
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`,
                              color: '#000',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                            disabled={loading}
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingResource(null)}
                            style={{
                              background: 'rgba(12, 26, 56, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      // View Mode
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            color: G, 
                            fontWeight: '600', 
                            marginBottom: '8px',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}>
                            <span style={{ fontSize: '20px' }}>{resource.icon || '📄'}</span>
                            {resource.title}
                          </div>
                          <div style={{ 
                            color: 'rgba(240,192,64,0.7)', 
                            fontSize: '12px',
                            lineHeight: '1.6'
                          }}>
                            {resource.description}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button
                            onClick={() => setEditingResource({ ...resource })}
                            style={{
                              background: 'rgba(122, 0, 0, 0.8)',
                              color: G,
                              border: `1px solid ${G}`,
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Delete this resource?')) return;
                              setLoading(true);
                              try {
                                const res = await fetch(`/api/admin/student-corner/resources/${resource.id}`, {
                                  method: 'DELETE',
                                  headers: { 'x-admin-token': token },
                                });
                                const data = await res.json();
                                setStudentCornerData(data.data);
                              } finally {
                                setLoading(false);
                              }
                            }}
                            style={{
                              background: 'rgba(220, 38, 38, 0.8)',
                              color: '#fca5a5',
                              border: '1px solid #dc2626',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!studentCornerData.resources || studentCornerData.resources.length === 0) && (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: 'rgba(240,192,64,0.5)',
                    fontSize: '12px',
                  }}>
                    No resources yet. Add your first resource above!
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Tips Section */}
            {studentCornerSection === 'tips' && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${G}30`, borderRadius: '6px', padding: '20px' }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Student Tips ({studentCornerData.tips?.length || 0})</h3>
              {!editingTip && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <FormField label="Tip Title" value={studentTip.tip} onChange={(e) => setStudentTip({ ...studentTip, tip: e.target.value })} placeholder="e.g., Join the HEIHA WhatsApp Group" />
                    <FormField label="Icon" value={studentTip.icon} onChange={(e) => setStudentTip({ ...studentTip, icon: e.target.value })} placeholder="📱" />
                  </div>
                  <FormField label="Description" value={studentTip.desc} onChange={(e) => setStudentTip({ ...studentTip, desc: e.target.value })} placeholder="Detailed tip description..." textarea />
                  <button onClick={async () => {
                    if (!studentTip.tip || !studentTip.desc) return alert('Please fill all fields');
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/student-corner/tips', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(studentTip) });
                      const data = await res.json();
                      setStudentCornerData(data.data);
                      setStudentTip({ icon: '', tip: '', desc: '' });
                      alert('Tip added!');
                    } catch (err) { alert('Failed to add tip'); } finally { setLoading(false); }
                  }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }} disabled={loading}>➕ Add Tip</button>
                </div>
              )}
              <div style={{ display: 'grid', gap: '12px' }}>
                {studentCornerData.tips && studentCornerData.tips.map((tip) => (
                  <div key={tip.id} style={{ background: 'rgba(0, 0, 0, 0.4)', border: `1px solid ${G}20`, borderRadius: '4px', padding: '16px' }}>
                    {editingTip && editingTip.id === tip.id ? (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                          <FormField label="Tip" value={editingTip.tip} onChange={(e) => setEditingTip({ ...editingTip, tip: e.target.value })} />
                          <FormField label="Icon" value={editingTip.icon} onChange={(e) => setEditingTip({ ...editingTip, icon: e.target.value })} />
                        </div>
                        <FormField label="Description" value={editingTip.desc} onChange={(e) => setEditingTip({ ...editingTip, desc: e.target.value })} textarea />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={async () => {
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/tips/${tip.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(editingTip) });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                              setEditingTip(null);
                              alert('Tip updated!');
                            } catch (err) { alert('Failed'); } finally { setLoading(false); }
                          }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }} disabled={loading}>💾 Save</button>
                          <button onClick={() => setEditingTip(null)} style={{ background: 'rgba(12, 26, 56, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: G, fontWeight: '600', marginBottom: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>{tip.icon || '💡'}</span>{tip.tip}
                          </div>
                          <div style={{ color: 'rgba(240,192,64,0.7)', fontSize: '12px', lineHeight: '1.6' }}>{tip.desc}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button onClick={() => setEditingTip({ ...tip })} style={{ background: 'rgba(122, 0, 0, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>✏️ Edit</button>
                          <button onClick={async () => {
                            if (!confirm('Delete?')) return;
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/tips/${tip.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                            } finally { setLoading(false); }
                          }} style={{ background: 'rgba(220, 38, 38, 0.8)', color: '#fca5a5', border: '1px solid #dc2626', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>🗑️ Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!studentCornerData.tips || studentCornerData.tips.length === 0) && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(240,192,64,0.5)', fontSize: '12px' }}>No tips yet. Add your first tip above!</div>
                )}
              </div>
            </div>
            )}

            {/* FAQs Section */}
            {studentCornerSection === 'faqs' && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${G}30`, borderRadius: '6px', padding: '20px' }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>FAQs ({studentCornerData.faqs?.length || 0})</h3>
              {!editingFaq && (
                <div style={{ marginBottom: '20px' }}>
                  <FormField label="Question" value={faq.q} onChange={(e) => setFaq({ ...faq, q: e.target.value })} placeholder="e.g., When should I arrive in Bangalore?" />
                  <FormField label="Answer" value={faq.a} onChange={(e) => setFaq({ ...faq, a: e.target.value })} placeholder="Detailed answer..." textarea />
                  <button onClick={async () => {
                    if (!faq.q || !faq.a) return alert('Please fill both question and answer');
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/student-corner/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(faq) });
                      const data = await res.json();
                      setStudentCornerData(data.data);
                      setFaq({ q: '', a: '' });
                      alert('FAQ added!');
                    } catch (err) { alert('Failed to add FAQ'); } finally { setLoading(false); }
                  }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }} disabled={loading}>➕ Add FAQ</button>
                </div>
              )}
              <div style={{ display: 'grid', gap: '12px' }}>
                {studentCornerData.faqs && studentCornerData.faqs.map((faqItem) => (
                  <div key={faqItem.id} style={{ background: 'rgba(0, 0, 0, 0.4)', border: `1px solid ${G}20`, borderRadius: '4px', padding: '16px' }}>
                    {editingFaq && editingFaq.id === faqItem.id ? (
                      <>
                        <FormField label="Question" value={editingFaq.q} onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })} />
                        <FormField label="Answer" value={editingFaq.a} onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })} textarea />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={async () => {
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/faqs/${faqItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(editingFaq) });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                              setEditingFaq(null);
                              alert('FAQ updated!');
                            } catch (err) { alert('Failed'); } finally { setLoading(false); }
                          }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }} disabled={loading}>💾 Save</button>
                          <button onClick={() => setEditingFaq(null)} style={{ background: 'rgba(12, 26, 56, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: G, fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>Q: {faqItem.q}</div>
                          <div style={{ color: 'rgba(240,192,64,0.7)', fontSize: '12px', lineHeight: '1.6' }}>A: {faqItem.a}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button onClick={() => setEditingFaq({ ...faqItem })} style={{ background: 'rgba(122, 0, 0, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>✏️ Edit</button>
                          <button onClick={async () => {
                            if (!confirm('Delete this FAQ?')) return;
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/faqs/${faqItem.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                            } finally { setLoading(false); }
                          }} style={{ background: 'rgba(220, 38, 38, 0.8)', color: '#fca5a5', border: '1px solid #dc2626', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>🗑️ Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!studentCornerData.faqs || studentCornerData.faqs.length === 0) && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(240,192,64,0.5)', fontSize: '12px' }}>No FAQs yet. Add your first FAQ above!</div>
                )}
              </div>
            </div>
            )}

            {/* Useful Links Section */}
            {studentCornerSection === 'links' && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${G}30`, borderRadius: '6px', padding: '20px' }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Useful Links ({studentCornerData.usefulLinks?.length || 0})</h3>
              {!editingLink && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <FormField label="Link Label" value={usefulLink.label} onChange={(e) => setUsefulLink({ ...usefulLink, label: e.target.value })} placeholder="e.g., UVCE Official Website" />
                    <FormField label="Icon" value={usefulLink.icon} onChange={(e) => setUsefulLink({ ...usefulLink, icon: e.target.value })} placeholder="🏛️" />
                  </div>
                  <FormField label="URL" value={usefulLink.url} onChange={(e) => setUsefulLink({ ...usefulLink, url: e.target.value })} placeholder="https://..." />
                  <FormField label="Description (Optional)" value={usefulLink.description} onChange={(e) => setUsefulLink({ ...usefulLink, description: e.target.value })} placeholder="Additional info..." />
                  <button onClick={async () => {
                    if (!usefulLink.label || !usefulLink.url) return alert('Please fill label and URL');
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/student-corner/links', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(usefulLink) });
                      const data = await res.json();
                      setStudentCornerData(data.data);
                      setUsefulLink({ label: '', url: '', icon: '', description: '' });
                      alert('Link added!');
                    } catch (err) { alert('Failed to add link'); } finally { setLoading(false); }
                  }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }} disabled={loading}>➕ Add Link</button>
                </div>
              )}
              <div style={{ display: 'grid', gap: '12px' }}>
                {studentCornerData.usefulLinks && studentCornerData.usefulLinks.map((link) => (
                  <div key={link.id} style={{ background: 'rgba(0, 0, 0, 0.4)', border: `1px solid ${G}20`, borderRadius: '4px', padding: '16px' }}>
                    {editingLink && editingLink.id === link.id ? (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                          <FormField label="Label" value={editingLink.label} onChange={(e) => setEditingLink({ ...editingLink, label: e.target.value })} />
                          <FormField label="Icon" value={editingLink.icon} onChange={(e) => setEditingLink({ ...editingLink, icon: e.target.value })} />
                        </div>
                        <FormField label="URL" value={editingLink.url} onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })} />
                        <FormField label="Description" value={editingLink.description} onChange={(e) => setEditingLink({ ...editingLink, description: e.target.value })} />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={async () => {
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/links/${link.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(editingLink) });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                              setEditingLink(null);
                              alert('Link updated!');
                            } catch (err) { alert('Failed'); } finally { setLoading(false); }
                          }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }} disabled={loading}>💾 Save</button>
                          <button onClick={() => setEditingLink(null)} style={{ background: 'rgba(12, 26, 56, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: G, fontWeight: '600', marginBottom: '4px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>{link.icon || '🔗'}</span>{link.label}
                          </div>
                          <div style={{ color: 'rgba(76,218,112,0.8)', fontSize: '11px', marginBottom: '4px', wordBreak: 'break-all' }}>{link.url}</div>
                          {link.description && <div style={{ color: 'rgba(240,192,64,0.6)', fontSize: '11px' }}>{link.description}</div>}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button onClick={() => setEditingLink({ ...link })} style={{ background: 'rgba(122, 0, 0, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>✏️ Edit</button>
                          <button onClick={async () => {
                            if (!confirm('Delete this link?')) return;
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/links/${link.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                            } finally { setLoading(false); }
                          }} style={{ background: 'rgba(220, 38, 38, 0.8)', color: '#fca5a5', border: '1px solid #dc2626', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>🗑️ Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!studentCornerData.usefulLinks || studentCornerData.usefulLinks.length === 0) && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(240,192,64,0.5)', fontSize: '12px' }}>No links yet. Add your first link above!</div>
                )}
              </div>
            </div>
            )}

            {/* Contact Section */}
            {studentCornerSection === 'contact' && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${G}30`, borderRadius: '6px', padding: '20px' }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Contact Information</h3>
              <FormField label="Email" value={contactForm.email !== undefined ? contactForm.email : (studentCornerData.contact?.email || '')} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="heiha.uvce@gmail.com" />
              <FormField label="WhatsApp Info" value={contactForm.whatsapp !== undefined ? contactForm.whatsapp : (studentCornerData.contact?.whatsapp || '')} onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })} placeholder="Ask any HEIHA member..." />
              <FormField label="Response Time Info" value={contactForm.responseTime !== undefined ? contactForm.responseTime : (studentCornerData.contact?.responseTime || '')} onChange={(e) => setContactForm({ ...contactForm, responseTime: e.target.value })} placeholder="We respond within 24 hours..." textarea />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={async () => {
                  if (!contactForm.email && !contactForm.whatsapp && !contactForm.responseTime) return alert('Please change at least one field');
                  setLoading(true);
                  try {
                    const res = await fetch('/api/admin/student-corner/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify({ email: contactForm.email !== undefined ? contactForm.email : studentCornerData.contact?.email, whatsapp: contactForm.whatsapp !== undefined ? contactForm.whatsapp : studentCornerData.contact?.whatsapp, responseTime: contactForm.responseTime !== undefined ? contactForm.responseTime : studentCornerData.contact?.responseTime }) });
                    if (res.ok) {
                      const data = await res.json();
                      setStudentCornerData(data.data);
                      setContactForm({});
                      alert('Contact info updated!');
                    }
                  } catch (err) { alert('Failed to update'); } finally { setLoading(false); }
                }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '10px 20px', borderRadius: '4px', fontFamily: "'Orbitron', sans-serif", fontSize: '10px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? 'Saving...' : 'Save Contact'}</button>
                <button onClick={() => setContactForm({})} style={{ background: 'rgba(12, 26, 56, 0.8)', color: G, border: `1px solid ${G}`, padding: '10px 20px', borderRadius: '4px', fontFamily: "'Orbitron', sans-serif", fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }}>Reset</button>
              </div>
            </div>
            )}

            {/* College Info Section */}
            {studentCornerSection === 'collegeInfo' && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: `1px solid ${G}30`, borderRadius: '6px', padding: '20px' }}>
              <h3 style={{ color: G, marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>College Info Sections ({studentCornerData.collegeInfo?.length || 0})</h3>
              {!editingCollegeInfo && (
                <div style={{ marginBottom: '20px' }}>
                  <FormField label="Section Title" value={collegeInfo.title} onChange={(e) => setCollegeInfo({ ...collegeInfo, title: e.target.value })} placeholder="e.g., Academic Calendar, Key Offices" />
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: G, fontSize: '11px', fontWeight: '600', marginBottom: '6px', fontFamily: "'Orbitron', sans-serif" }}>Items (one per line)</label>
                    <textarea value={collegeInfo.items?.join('\n') || ''} onChange={(e) => setCollegeInfo({ ...collegeInfo, items: e.target.value.split('\n').filter(item => item.trim()) })} placeholder="Enter each item on a new line..." style={{ width: '100%', minHeight: '120px', background: 'rgba(12, 26, 56, 0.5)', border: '1px solid rgba(240,192,64,0.3)', borderRadius: '4px', padding: '10px', color: 'rgba(228,216,192,0.9)', fontSize: '13px', fontFamily: "'Inter', sans-serif", resize: 'vertical' }} />
                  </div>
                  <button onClick={async () => {
                    if (!collegeInfo.title || !collegeInfo.items || collegeInfo.items.length === 0) return alert('Please fill title and at least one item');
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/student-corner/college-info', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(collegeInfo) });
                      const data = await res.json();
                      setStudentCornerData(data.data);
                      setCollegeInfo({ title: '', items: [] });
                      alert('College info added!');
                    } catch (err) { alert('Failed to add'); } finally { setLoading(false); }
                  }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }} disabled={loading}>➕ Add Section</button>
                </div>
              )}
              <div style={{ display: 'grid', gap: '12px' }}>
                {studentCornerData.collegeInfo && studentCornerData.collegeInfo.map((info) => (
                  <div key={info.id} style={{ background: 'rgba(0, 0, 0, 0.4)', border: `1px solid ${G}20`, borderRadius: '4px', padding: '16px' }}>
                    {editingCollegeInfo && editingCollegeInfo.id === info.id ? (
                      <>
                        <FormField label="Section Title" value={editingCollegeInfo.title} onChange={(e) => setEditingCollegeInfo({ ...editingCollegeInfo, title: e.target.value })} />
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', color: G, fontSize: '11px', fontWeight: '600', marginBottom: '6px', fontFamily: "'Orbitron', sans-serif" }}>Items (one per line)</label>
                          <textarea value={editingCollegeInfo.items?.join('\n') || ''} onChange={(e) => setEditingCollegeInfo({ ...editingCollegeInfo, items: e.target.value.split('\n').filter(item => item.trim()) })} style={{ width: '100%', minHeight: '120px', background: 'rgba(12, 26, 56, 0.5)', border: '1px solid rgba(240,192,64,0.3)', borderRadius: '4px', padding: '10px', color: 'rgba(228,216,192,0.9)', fontSize: '13px', fontFamily: "'Inter', sans-serif", resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={async () => {
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/college-info/${info.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(editingCollegeInfo) });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                              setEditingCollegeInfo(null);
                              alert('College info updated!');
                            } catch (err) { alert('Failed'); } finally { setLoading(false); }
                          }} style={{ background: `linear-gradient(135deg, ${O} 0%, #ff5030 100%)`, color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }} disabled={loading}>💾 Save</button>
                          <button onClick={() => setEditingCollegeInfo(null)} style={{ background: 'rgba(12, 26, 56, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: G, fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>{info.title}</div>
                          <ul style={{ color: 'rgba(240,192,64,0.7)', fontSize: '12px', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
                            {info.items && info.items.map((item, idx) => <li key={idx}>{item}</li>)}
                          </ul>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                          <button onClick={() => setEditingCollegeInfo({ ...info })} style={{ background: 'rgba(122, 0, 0, 0.8)', color: G, border: `1px solid ${G}`, padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>✏️ Edit</button>
                          <button onClick={async () => {
                            if (!confirm('Delete this section?')) return;
                            setLoading(true);
                            try {
                              const res = await fetch(`/api/admin/student-corner/college-info/${info.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
                              const data = await res.json();
                              setStudentCornerData(data.data);
                            } finally { setLoading(false); }
                          }} style={{ background: 'rgba(220, 38, 38, 0.8)', color: '#fca5a5', border: '1px solid #dc2626', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', textTransform: 'uppercase' }}>🗑️ Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {(!studentCornerData.collegeInfo || studentCornerData.collegeInfo.length === 0) && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(240,192,64,0.5)', fontSize: '12px' }}>No college info sections yet. Add your first section above!</div>
                )}
              </div>
            </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
