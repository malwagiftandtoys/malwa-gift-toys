const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true, maxlength: 200 },
  category:      { type: String, enum: ['toys','gifts','kids','seasonal'], required: true },
  price:         { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true },
  description:   { type: String, maxlength: 1000 },
  emoji:         { type: String, default: '🎁' },
  tag:           { type: String },
  stock:         { type: Number, default: 0 },
  rating:        { type: Number, default: 0, min: 0, max: 5 },
  reviews:       { type: Number, default: 0 },
  isActive:      { type: Boolean, default: true },
  bgColor:       { type: String, default: '#FFF3EC' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
