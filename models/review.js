// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
