const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Admin credentials (use env variables in production)
const ADMIN_PASSWORD = 'admin123';
const ADMIN_TOKEN_MAP = new Map();

// Configure multer for image uploads
const uploadsDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Data storage
let alumniData = [
  { id: 1, name: 'Lalthansanga Pachuau', batch: '2015', field: 'Software Engineering', company: 'Infosys', message: 'UVCE gave me the foundation to build my career. Cherish every moment!' },
  { id: 2, name: 'Malsawmi Hmar', batch: '2016', field: 'Civil Engineering', company: 'L&T Construction', message: 'The HEIHA community was my home away from home. Stay strong and united!' },
  { id: 3, name: 'Zothansanga Ralte', batch: '2017', field: 'Electronics', company: 'ISRO', message: 'Dream big, work hard. The journey at UVCE is worth every challenge.' },
  { id: 4, name: 'Lalnunpuii Chhangte', batch: '2018', field: 'Computer Science', company: 'Google', message: 'Leverage every opportunity UVCE offers. The connections you make here last a lifetime.' },
  { id: 5, name: 'Vanlalruata Sailo', batch: '2019', field: 'Mechanical Engineering', company: 'BHEL', message: 'Trust the process and lean on your HEIHA family for support.' }
];

let galleryData = [
  { id: 1, title: 'Chapchar Kut', category: 'Cultural Events', color: '#8B0000', image: '/images/chapchar-kut.jpg', description: 'Mizorama an lawm thin ang bawkin, Bangalore Mizo Association(BMA) chuan March thla Karnataka chawlh hmasa berah Chapchar kut hi a huaihawt thin ani' },
  { id: 2, title: 'Freshers Day', category: 'Annual Fest', color: '#1a237e', description: 'Mizoram atanga rawn chhuk thar student te chuan kan lo welcome ani tih entirnan fresher\'s party siam sak thin an ni a, hemi ni hian year hrang hrang te chuan kan lawm ani tih entirnan item chi hrang hrang hmangin in tih hlimna buatsaih thin ani' },
  { id: 3, title: 'Zirna Kutpui', category: 'Cultural Events', color: '#4a148c', description: 'Mizo Student Association (MSA) chuan kum tin hian zirlai te tan bik liau liau Zirna kutpui chu a lawm thin a, hemi ni hian zaithiam te sawmin ruai te nen zirna kutpui chu lawm thin ani' },
  { id: 4, title: 'One Day', category: 'Sports', color: '#1b5e20', description: 'UVCE Mizo Community a year hrang hrang te chu hemi ni hian sports hrang hrang in an in el thina, final year ten an huaihawt thin ani' },
  { id: 5, title: 'Farewell Party', category: 'Annual Fest', color: '#e65100', description: 'Kum tin hian farewell party neih thin ani a, a remchan zawk chuan Fresher\'s day nen neih kawp thin ani' },
  { id: 6, title: 'Vangpui Kut', category: 'Cultural Events', color: '#880e4f', description: 'Vangpui Kut hi Bangalore Mizo Community tan chuan kut pawimawh leh hlut ber deuh tho ani a, ruai nen lawm thin ani, college hrang hrang ten hnam lam leh mizo traditions te an show thina, Mizoram atangin zaithiam sawm thin an ni bawk' },
  { id: 7, title: 'Engineering Meet', category: 'Sports', color: '#1b5e20', image: '/images/emeet.jpg', description: 'Kum tin hian Engineering College hrang hrang Mizo awmna: AIT, PES Mandya leh UVCE te hian sports hrang hrang a in elna neih thin a ni' },
  { id: 8, title: 'MSA Basketball', category: 'Sports', color: '#880e4f', image: ['/images/msabasket.jpg', '/images/msabasket-1.jpg', '/images/msabasket-2.jpg'], description: 'MSA hian Basketball tournament a buatsaih thina UVCE Mizo pawh Mizo student an nih na angin an tel ziah ani' }
];

let eventsData = [
  { id: 1, title: 'Freshers Welcome 2024', date: '2024-08-15', category: 'Annual', description: 'Grand welcome ceremony for new students joining UVCE', images: [] },
  { id: 2, title: 'Chapchar Kut Celebration', date: '2024-03-10', category: 'Cultural', description: 'Traditional Mizo spring festival celebration', images: [] },
  { id: 3, title: 'Career Guidance Session', date: '2024-09-20', category: 'Academic', description: 'Senior students and alumni sharing career insights', images: [] },
  { id: 4, title: 'NE Cultural Night', date: '2024-10-05', category: 'Cultural', description: 'Evening of northeastern India cultural performances', images: [] }
];

let homeData = {
  hero: {
    title: '★ UVCE HEIHA ★',
    subtitle: 'Himalayan Ethnic Inclusion and Heritage Association',
    tagline: 'Unite. Celebrate. Inspire.',
    backgroundImage: '/images/hero-bg.jpg'
  },
  sections: [
    { id: 1, title: 'About Us', content: 'HEIHA is a vibrant community of Himalayan students at UVCE, promoting cultural diversity and fostering strong bonds.' },
    { id: 2, title: 'Our Mission', content: 'To create an inclusive environment that celebrates cultural diversity while building lasting connections among students.' }
  ]
};

let aboutData = {
  title: 'About HEIHA',
  content: 'HEIHA (Himalayan Ethnic Inclusion and Heritage Association) is a student organization at UVCE dedicated to fostering inclusivity, celebrating cultural heritage, and building a strong community.',
  sections: [
    { id: 1, title: 'History', content: 'Founded with the vision of bringing together students from Himalayan regions...' },
    { id: 2, title: 'Values', content: 'Unity, Diversity, Inclusion, and Cultural Pride' },
    { id: 3, title: 'Activities', content: 'Cultural events, sports, mentoring programs, and community service' }
  ]
};

let studentCornerData = {
  title: 'Student Corner',
  subtitle: 'Resources and Support for Students',
  resources: [
    { id: 1, title: 'Academic Support', description: 'Peer tutoring and study groups', icon: '📚' },
    { id: 2, title: 'Career Guidance', description: 'Resume building and interview prep', icon: '💼' },
    { id: 3, title: 'Mentorship', description: 'Connect with seniors and alumni', icon: '👥' },
    { id: 4, title: 'Events & Workshops', description: 'Skill development and networking', icon: '🎓' }
  ],
  tips: [
    { id: 1, icon: '📱', tip: 'Join the HEIHA WhatsApp Group', desc: 'First thing to do. Your seniors are there 24/7 to help with any questions.' },
    { id: 2, icon: '🏠', tip: 'Hostel Application', desc: 'Apply for hostel as early as possible. Limited seats — NE students often get priority consideration.' },
    { id: 3, icon: '📚', tip: 'Academic Support', desc: "HEIHA runs peer tutoring sessions. Don't hesitate to ask seniors for notes and guidance." },
    { id: 4, icon: '🍛', tip: 'Food Adjustment', desc: "The food may be different. Many seniors cook NE food on weekends — join in! You'll also find good local food options." },
    { id: 5, icon: '🚌', tip: 'City Navigation', desc: 'Learn the BMTC bus routes and download the Namma Metro app. Bangalore is very navigable once you know the system.' },
    { id: 6, icon: '💰', tip: 'Budget Wisely', desc: 'Create a monthly budget. Bangalore can be expensive. Seniors will show you affordable options for food, transport, and shopping.' }
  ],
  collegeInfo: [
    {
      id: 1,
      title: 'Academic Calendar',
      items: ['Semester 1 & 2: Aug – May', 'Mid-term exams: October & March', 'End-term exams: December & May', 'Min. 75% attendance required', 'VTU exam registration is separate']
    },
    {
      id: 2,
      title: 'Key Offices',
      items: ["Principal's Office: Main Block, 1st Floor", 'Student Welfare: Admin Block', 'Hostel Office: Near Boys Hostel', 'Library: Central Block', 'Health Center: Near Girls Hostel']
    },
    {
      id: 3,
      title: 'Useful Apps & Websites',
      items: ['VTU Website: vtu.ac.in', 'UVCE Official: uvce.ac.in', 'Namma Metro App', 'BMTC Bus Tracker', 'Google Pay / PhonePe for payments']
    }
  ],
  faqs: [
    { id: 1, q: 'When should I arrive in Bangalore?', a: 'Try to arrive a week before classes start. This gives you time to settle in, explore the campus, and connect with HEIHA seniors who will help you get oriented.' },
    { id: 2, q: 'How do I get from the airport/railway station to UVCE?', a: 'Take the Metro (Purple Line) to KR Market or Majestic, then an auto-rickshaw to UVCE. Seniors in the HEIHA WhatsApp group can help you navigate. Always save the college address: Dr. Ambedkar Veedhi, Bengaluru - 560001.' },
    { id: 3, q: 'What should I bring from home?', a: 'Traditional foods/spices (hard to find locally), warm clothes (Bangalore gets cold Nov-Jan), all original documents (TC, mark sheets, birth certificate), and passport-size photos.' },
    { id: 4, q: 'How do I get a local SIM card?', a: 'Jio and Airtel are best for Bangalore. You will need your Aadhaar card or passport. HEIHA seniors can accompany you to the store to help with the process.' },
    { id: 5, q: 'Where can I find NE food in Bangalore?', a: 'There are several NE restaurants near UVCE in the Indiranagar, Koramangala, and Ejipura areas. HEIHA seniors maintain an updated list — ask in the WhatsApp group!' },
    { id: 6, q: 'What if I face any issue or discrimination?', a: 'Reach out to any HEIHA executive committee member immediately. We have protocols in place and connections with college administration. You are protected and supported.' },
    { id: 7, q: 'Civil nen campus khatah in awm em?', a: 'Civil engineering hi Jnanabharti campus-ah an awm a, hostelah an awm thei lo a, a nawlpuiin in an luah thin' },
    { id: 8, q: 'ZB Laipi tih in hria em ?', a: 'Aw hria e, UVCE Mizo Mech ah a thiam ber' },
    { id: 9, q: 'Gym a awm em?', a: 'Kan college ah hian gym chu a awm lo a, mahse hosteller tan hostel tang hla vak loh ah student tan gym tlawmte a awm, BU campus tan gym hi a free' }
  ],
  usefulLinks: [
    { id: 1, label: 'UVCE Official Website', url: 'http://uvce.ac.in', icon: '🏛️', description: '' },
    { id: 2, label: 'UUCMS', url: 'https://uucms.karnataka.gov.in/login/index', icon: '📋', description: 'Tah hian result en thin ani' },
    { id: 3, label: 'VTU Results', url: 'http://results.vtu.ac.in', icon: '📊', description: '' },
    { id: 4, label: 'NPTEL Courses', url: 'http://nptel.ac.in', icon: '🎓', description: '' },
    { id: 5, label: 'KVPY Fellowship', url: 'http://kvpy.iisc.ernet.in', icon: '🏆', description: '' },
    { id: 6, label: 'Internshala Jobs', url: 'http://internshala.com', icon: '💼', description: '' }
  ],
  contact: {
    email: 'heiha.uvce@gmail.com',
    whatsapp: 'Ask any HEIHA member for the group link',
    responseTime: 'We respond within 24 hours. For urgent matters, contact the President directly.'
  }
};

// Middleware: Check admin token
const checkAdminToken = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token || !ADMIN_TOKEN_MAP.has(token)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

// ────────────────────── AUTH ENDPOINTS ──────────────────────

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = 'admin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    ADMIN_TOKEN_MAP.set(token, true);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// ────────────────────── FILE UPLOAD ──────────────────────

app.post('/api/admin/upload', checkAdminToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  res.json({ success: true, filename: '/images/' + req.file.filename });
});

// ────────────────────── GALLERY ENDPOINTS ──────────────────────

app.get('/api/gallery', (req, res) => {
  res.json({ success: true, data: galleryData });
});

app.post('/api/admin/gallery', checkAdminToken, (req, res) => {
  const newItem = req.body;
  const id = Math.max(...galleryData.map(item => item.id || 0)) + 1;
  galleryData.push({ ...newItem, id });
  res.json({ success: true, data: galleryData });
});

app.put('/api/admin/gallery/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = galleryData.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  galleryData[index] = { ...galleryData[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: galleryData });
});

app.delete('/api/admin/gallery/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  galleryData = galleryData.filter(item => item.id !== parseInt(id));
  res.json({ success: true, data: galleryData });
});

// ────────────────────── ALUMNI ENDPOINTS ──────────────────────

app.get('/api/alumni', (req, res) => {
  res.json({ success: true, data: alumniData });
});

app.post('/api/admin/alumni', checkAdminToken, (req, res) => {
  const newItem = req.body;
  const id = Math.max(...alumniData.map(item => item.id || 0)) + 1;
  alumniData.push({ ...newItem, id });
  res.json({ success: true, data: alumniData });
});

app.put('/api/admin/alumni/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = alumniData.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  alumniData[index] = { ...alumniData[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: alumniData });
});

app.delete('/api/admin/alumni/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  alumniData = alumniData.filter(item => item.id !== parseInt(id));
  res.json({ success: true, data: alumniData });
});

// ────────────────────── EVENTS ENDPOINTS ──────────────────────

app.get('/api/events', (req, res) => {
  res.json({ success: true, data: eventsData });
});

app.post('/api/admin/events', checkAdminToken, (req, res) => {
  const newItem = req.body;
  const id = Math.max(...eventsData.map(item => item.id || 0)) + 1;
  eventsData.push({ ...newItem, id, images: newItem.images || [] });
  res.json({ success: true, data: eventsData });
});

app.put('/api/admin/events/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = eventsData.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  eventsData[index] = { ...eventsData[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: eventsData });
});

app.delete('/api/admin/events/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  eventsData = eventsData.filter(item => item.id !== parseInt(id));
  res.json({ success: true, data: eventsData });
});

// ────────────────────── HOME ENDPOINTS ──────────────────────

app.get('/api/home', (req, res) => {
  res.json({ success: true, data: homeData });
});

app.put('/api/admin/home', checkAdminToken, (req, res) => {
  homeData = { ...homeData, ...req.body };
  res.json({ success: true, data: homeData });
});

app.post('/api/admin/home/sections', checkAdminToken, (req, res) => {
  const newSection = req.body;
  const id = Math.max(...homeData.sections.map(s => s.id || 0)) + 1;
  homeData.sections.push({ ...newSection, id });
  res.json({ success: true, data: homeData });
});

app.put('/api/admin/home/sections/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = homeData.sections.findIndex(s => s.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  homeData.sections[index] = { ...homeData.sections[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: homeData });
});

app.delete('/api/admin/home/sections/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  homeData.sections = homeData.sections.filter(s => s.id !== parseInt(id));
  res.json({ success: true, data: homeData });
});

// ────────────────────── ABOUT ENDPOINTS ──────────────────────

app.get('/api/about', (req, res) => {
  res.json({ success: true, data: aboutData });
});

app.put('/api/admin/about', checkAdminToken, (req, res) => {
  aboutData = { ...aboutData, ...req.body };
  res.json({ success: true, data: aboutData });
});

app.post('/api/admin/about/sections', checkAdminToken, (req, res) => {
  const newSection = req.body;
  const id = Math.max(...aboutData.sections.map(s => s.id || 0)) + 1;
  aboutData.sections.push({ ...newSection, id });
  res.json({ success: true, data: aboutData });
});

app.put('/api/admin/about/sections/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = aboutData.sections.findIndex(s => s.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  aboutData.sections[index] = { ...aboutData.sections[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: aboutData });
});

app.delete('/api/admin/about/sections/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  aboutData.sections = aboutData.sections.filter(s => s.id !== parseInt(id));
  res.json({ success: true, data: aboutData });
});

// ────────────────────── STUDENT CORNER ENDPOINTS ──────────────────────

app.get('/api/student-corner', (req, res) => {
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner', checkAdminToken, (req, res) => {
  studentCornerData = { ...studentCornerData, ...req.body };
  res.json({ success: true, data: studentCornerData });
});

app.post('/api/admin/student-corner/resources', checkAdminToken, (req, res) => {
  const newResource = req.body;
  const id = Math.max(...studentCornerData.resources.map(r => r.id || 0)) + 1;
  studentCornerData.resources.push({ ...newResource, id });
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner/resources/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = studentCornerData.resources.findIndex(r => r.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  studentCornerData.resources[index] = { ...studentCornerData.resources[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: studentCornerData });
});

app.delete('/api/admin/student-corner/resources/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  studentCornerData.resources = studentCornerData.resources.filter(r => r.id !== parseInt(id));
  res.json({ success: true, data: studentCornerData });
});

// Tips CRUD
app.post('/api/admin/student-corner/tips', checkAdminToken, (req, res) => {
  const newTip = req.body;
  const id = Math.max(...studentCornerData.tips.map(t => t.id || 0)) + 1;
  studentCornerData.tips.push({ ...newTip, id });
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner/tips/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = studentCornerData.tips.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  studentCornerData.tips[index] = { ...studentCornerData.tips[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: studentCornerData });
});

app.delete('/api/admin/student-corner/tips/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  studentCornerData.tips = studentCornerData.tips.filter(t => t.id !== parseInt(id));
  res.json({ success: true, data: studentCornerData });
});

// College Info CRUD
app.post('/api/admin/student-corner/college-info', checkAdminToken, (req, res) => {
  const newInfo = req.body;
  const id = Math.max(...studentCornerData.collegeInfo.map(c => c.id || 0)) + 1;
  studentCornerData.collegeInfo.push({ ...newInfo, id });
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner/college-info/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = studentCornerData.collegeInfo.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  studentCornerData.collegeInfo[index] = { ...studentCornerData.collegeInfo[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: studentCornerData });
});

app.delete('/api/admin/student-corner/college-info/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  studentCornerData.collegeInfo = studentCornerData.collegeInfo.filter(c => c.id !== parseInt(id));
  res.json({ success: true, data: studentCornerData });
});

// FAQs CRUD
app.post('/api/admin/student-corner/faqs', checkAdminToken, (req, res) => {
  const newFaq = req.body;
  const id = Math.max(...studentCornerData.faqs.map(f => f.id || 0)) + 1;
  studentCornerData.faqs.push({ ...newFaq, id });
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner/faqs/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = studentCornerData.faqs.findIndex(f => f.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  studentCornerData.faqs[index] = { ...studentCornerData.faqs[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: studentCornerData });
});

app.delete('/api/admin/student-corner/faqs/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  studentCornerData.faqs = studentCornerData.faqs.filter(f => f.id !== parseInt(id));
  res.json({ success: true, data: studentCornerData });
});

// Useful Links CRUD
app.post('/api/admin/student-corner/links', checkAdminToken, (req, res) => {
  const newLink = req.body;
  const id = Math.max(...studentCornerData.usefulLinks.map(l => l.id || 0)) + 1;
  studentCornerData.usefulLinks.push({ ...newLink, id });
  res.json({ success: true, data: studentCornerData });
});

app.put('/api/admin/student-corner/links/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  const index = studentCornerData.usefulLinks.findIndex(l => l.id === parseInt(id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Not found' });
  studentCornerData.usefulLinks[index] = { ...studentCornerData.usefulLinks[index], ...req.body, id: parseInt(id) };
  res.json({ success: true, data: studentCornerData });
});

app.delete('/api/admin/student-corner/links/:id', checkAdminToken, (req, res) => {
  const { id } = req.params;
  studentCornerData.usefulLinks = studentCornerData.usefulLinks.filter(l => l.id !== parseInt(id));
  res.json({ success: true, data: studentCornerData });
});

// Contact Update
app.put('/api/admin/student-corner/contact', checkAdminToken, (req, res) => {
  studentCornerData.contact = { ...studentCornerData.contact, ...req.body };
  res.json({ success: true, data: studentCornerData });
});

// ────────────────────── HEALTH CHECK ──────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'UVCE HEIHA Server is running' });
});

app.listen(PORT, () => {
  console.log(`UVCE HEIHA Server running on port ${PORT}`);
});
