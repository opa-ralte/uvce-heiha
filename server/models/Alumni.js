const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    message: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alumni', alumniSchema);
