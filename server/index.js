require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const alumniRoutes = require('./routes/alumni');
const galleryRoutes = require('./routes/gallery');
const eventsRoutes = require('./routes/events');
const adminAuthRoutes = require('./routes/adminAuth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate limiters
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});

// Routes
app.use('/api/alumni', apiLimiter, alumniRoutes);
app.use('/api/gallery', apiLimiter, galleryRoutes);
app.use('/api/events', apiLimiter, eventsRoutes);
app.use('/api/admin', authLimiter, adminAuthRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'UVCE HEIHA Server is running', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Connect to MongoDB then start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/uvce-heiha';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`UVCE HEIHA Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
