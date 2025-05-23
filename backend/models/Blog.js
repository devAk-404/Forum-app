const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  imageUrl:  { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
