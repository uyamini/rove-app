// models/activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  category: {
    type: String,
    enum: ['food', 'social', 'health and fitness', 'sights', 'parties'],
  },
  date: Date,
  location: String,
  cost: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Activity', activitySchema);
