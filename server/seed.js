require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Alumni = require('./models/Alumni');
const Gallery = require('./models/Gallery');
const Event = require('./models/Event');

const alumniData = [
  { name: 'Lalthansanga Pachuau', batch: '2015', field: 'Software Engineering', company: 'Infosys', message: 'UVCE gave me the foundation to build my career. Cherish every moment!' },
  { name: 'Malsawmi Hmar', batch: '2016', field: 'Civil Engineering', company: 'L&T Construction', message: 'The HEIHA community was my home away from home. Stay strong and united!' },
  { name: 'Zothansanga Ralte', batch: '2017', field: 'Electronics', company: 'ISRO', message: 'Dream big, work hard. The journey at UVCE is worth every challenge.' },
  { name: 'Lalnunpuii Chhangte', batch: '2018', field: 'Computer Science', company: 'Google', message: 'Leverage every opportunity UVCE offers. The connections you make here last a lifetime.' },
  { name: 'Vanlalruata Sailo', batch: '2019', field: 'Mechanical Engineering', company: 'BHEL', message: 'Trust the process and lean on your HEIHA family for support.' },
];

const galleryData = [
  { title: 'Chapchar Kut Celebration 2023', category: 'Cultural Events', color: '#8B0000', description: 'Annual spring festival celebration with traditional dances and songs' },
  { title: 'Annual Freshers Welcome 2023', category: 'Annual Fest', color: '#1a237e', description: 'Welcoming new students from Northeast India to the HEIHA family' },
  { title: 'Mizo Night 2022', category: 'Cultural Events', color: '#4a148c', description: 'A magical evening of Mizo cultural performances and traditional food' },
  { title: 'Sports Day 2023', category: 'Sports', color: '#1b5e20', description: 'Inter-community sports competition and team building activities' },
  { title: 'Farewell Party 2023', category: 'Annual Fest', color: '#e65100', description: 'Bidding farewell to our graduating seniors with love and memories' },
  { title: 'NE Food Festival', category: 'Cultural Events', color: '#880e4f', description: 'A showcase of northeastern Indian cuisines and culinary traditions' },
  { title: 'Community Meeting 2023', category: 'General', color: '#006064', description: 'Annual general body meeting and elections for new executive committee' },
  { title: 'Tech Fest Participation', category: 'Academic', color: '#37474f', description: 'HEIHA members showcasing projects at the annual college tech fest' },
];

const eventsData = [
  { title: 'Freshers Welcome 2024', date: '2024-08-15', category: 'Annual', description: 'Grand welcome ceremony for new students joining UVCE' },
  { title: 'Chapchar Kut Celebration', date: '2024-03-10', category: 'Cultural', description: 'Traditional Mizo spring festival celebration' },
  { title: 'Career Guidance Session', date: '2024-09-20', category: 'Academic', description: 'Senior students and alumni sharing career insights' },
  { title: 'NE Cultural Night', date: '2024-10-05', category: 'Cultural', description: 'Evening of northeastern India cultural performances' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Seed admin
  const exists = await Admin.findOne({ username: 'admin' });
  if (!exists) {
    await Admin.create({ username: 'admin', password: process.env.ADMIN_INIT_PASSWORD || 'Admin@123' });
    console.log('Admin user created (username: admin, password: Admin@123)');
  } else {
    console.log('Admin user already exists');
  }

  // Seed collections
  const alumniCount = await Alumni.countDocuments();
  if (alumniCount === 0) {
    await Alumni.insertMany(alumniData);
    console.log(`Seeded ${alumniData.length} alumni`);
  }

  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany(galleryData);
    console.log(`Seeded ${galleryData.length} gallery items`);
  }

  const eventCount = await Event.countDocuments();
  if (eventCount === 0) {
    await Event.insertMany(eventsData);
    console.log(`Seeded ${eventsData.length} events`);
  }

  await mongoose.disconnect();
  console.log('Seeding complete');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
