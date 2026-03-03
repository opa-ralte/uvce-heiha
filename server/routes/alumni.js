const express = require('express');
const Alumni = require('../models/Alumni');
const protect = require('../middleware/auth');

const router = express.Router();

// GET all alumni (public)
router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.json({ success: true, data: alumni });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST create (admin)
router.post('/', protect, async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    res.status(201).json({ success: true, data: alumni });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!alumni) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: alumni });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
