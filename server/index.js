const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* ── Serve React build (production) ──────────────────────── */
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

/* ── Admin authentication ────────────────────────────────── */
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'heiha2024admin';

if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  ADMIN_PASSWORD env var not set — using default password. Set ADMIN_PASSWORD before deploying to production.');
}

const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

/* ── In-memory data (mutable for admin operations) ────────── */
let alumniData = [
  { id: 1, name: 'Lalthansanga Pachuau', batch: '2015', field: 'Software Engineering', company: 'Infosys', message: 'UVCE gave me the foundation to build my career. Cherish every moment!' },
  { id: 2, name: 'Malsawmi Hmar', batch: '2016', field: 'Civil Engineering', company: 'L&T Construction', message: 'The HEIHA community was my home away from home. Stay strong and united!' },
  { id: 3, name: 'Zothansanga Ralte', batch: '2017', field: 'Electronics', company: 'ISRO', message: 'Dream big, work hard. The journey at UVCE is worth every challenge.' },
  { id: 4, name: 'Lalnunpuii Chhangte', batch: '2018', field: 'Computer Science', company: 'Google', message: 'Leverage every opportunity UVCE offers. The connections you make here last a lifetime.' },
  { id: 5, name: 'Vanlalruata Sailo', batch: '2019', field: 'Mechanical Engineering', company: 'BHEL', message: 'Trust the process and lean on your HEIHA family for support.' }
];

let galleryData = [
  { id: 1, title: 'Chapchar Kut Celebration 2023', category: 'Cultural Events', color: '#8B0000', description: 'Annual spring festival celebration with traditional dances and songs' },
  { id: 2, title: 'Annual Freshers Welcome 2023', category: 'Annual Fest', color: '#1a237e', description: 'Welcoming new students from Northeast India to the HEIHA family' },
  { id: 3, title: 'Mizo Night 2022', category: 'Cultural Events', color: '#4a148c', description: 'A magical evening of Mizo cultural performances and traditional food' },
  { id: 4, title: 'Sports Day 2023', category: 'Sports', color: '#1b5e20', description: 'Inter-community sports competition and team building activities' },
  { id: 5, title: 'Farewell Party 2023', category: 'Annual Fest', color: '#e65100', description: 'Bidding farewell to our graduating seniors with love and memories' },
  { id: 6, title: 'NE Food Festival', category: 'Cultural Events', color: '#880e4f', description: 'A showcase of northeastern Indian cuisines and culinary traditions' },
  { id: 7, title: 'Community Meeting 2023', category: 'General', color: '#006064', description: 'Annual general body meeting and elections for new executive committee' },
  { id: 8, title: 'Tech Fest Participation', category: 'Academic', color: '#37474f', description: 'HEIHA members showcasing projects at the annual college tech fest' }
];

let eventsData = [
  { id: 1, title: 'Freshers Welcome 2024', date: '2024-08-15', category: 'Annual', description: 'Grand welcome ceremony for new students joining UVCE' },
  { id: 2, title: 'Chapchar Kut Celebration', date: '2024-03-10', category: 'Cultural', description: 'Traditional Mizo spring festival celebration' },
  { id: 3, title: 'Career Guidance Session', date: '2024-09-20', category: 'Academic', description: 'Senior students and alumni sharing career insights' },
  { id: 4, title: 'NE Cultural Night', date: '2024-10-05', category: 'Cultural', description: 'Evening of northeastern India cultural performances' }
];

const nextId = {
  get alumni() { return Math.max(0, ...alumniData.map(a => a.id)) + 1; },
  get gallery() { return Math.max(0, ...galleryData.map(g => g.id)) + 1; },
  get events() { return Math.max(0, ...eventsData.map(e => e.id)) + 1; },
};

/* ── Public GET routes ─────────────────────────────────────── */
app.get('/api/alumni', (req, res) => {
  res.json({ success: true, data: alumniData });
});

app.get('/api/gallery', (req, res) => {
  res.json({ success: true, data: galleryData });
});

app.get('/api/events', (req, res) => {
  res.json({ success: true, data: eventsData });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'UVCE HEIHA Server is running' });
});

/* ── Admin login ──────────────────────────────────────────── */
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

/* ── Admin CRUD: Alumni ────────────────────────────────────── */
app.post('/api/alumni', requireAuth, (req, res) => {
  const item = { id: nextId.alumni, ...req.body };
  alumniData.push(item);
  res.json({ success: true, data: item });
});

app.put('/api/alumni/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = alumniData.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  alumniData[idx] = { ...alumniData[idx], ...req.body, id };
  res.json({ success: true, data: alumniData[idx] });
});

app.delete('/api/alumni/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = alumniData.length;
  alumniData = alumniData.filter(a => a.id !== id);
  if (alumniData.length === before) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true });
});

/* ── Admin CRUD: Gallery ───────────────────────────────────── */
app.post('/api/gallery', requireAuth, (req, res) => {
  const item = { id: nextId.gallery, ...req.body };
  galleryData.push(item);
  res.json({ success: true, data: item });
});

app.put('/api/gallery/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = galleryData.findIndex(g => g.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  galleryData[idx] = { ...galleryData[idx], ...req.body, id };
  res.json({ success: true, data: galleryData[idx] });
});

app.delete('/api/gallery/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = galleryData.length;
  galleryData = galleryData.filter(g => g.id !== id);
  if (galleryData.length === before) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true });
});

/* ── Admin CRUD: Events ────────────────────────────────────── */
app.post('/api/events', requireAuth, (req, res) => {
  const item = { id: nextId.events, ...req.body };
  eventsData.push(item);
  res.json({ success: true, data: item });
});

app.put('/api/events/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = eventsData.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' });
  eventsData[idx] = { ...eventsData[idx], ...req.body, id };
  res.json({ success: true, data: eventsData[idx] });
});

app.delete('/api/events/:id', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = eventsData.length;
  eventsData = eventsData.filter(e => e.id !== id);
  if (eventsData.length === before) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true });
});

/* ── Catch-all: serve React app for client-side routes ────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`UVCE HEIHA Server running on port ${PORT}`);
});
