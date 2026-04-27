const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId:       { type: String, unique: true, required: true },
  customer: {
    name:        { type: String, required: true },
    phone:       { type: String, required: true, match: /^[6-9]\d{9}$/ },
    email:       { type: String, lowercase: true },
    address:     { type: String, required: true },
    city:        { type: String, default: 'Bathinda' },
    state:       { type: String, default: 'Punjab' },
    pincode:     { type: String, required: true, match: /^\d{6}$/ },
  },
  items: [{
    productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:        String,
    price:       Number,
    qty:         Number,
  }],
  subtotal:      { type: Number, required: true },
  deliveryCharge:{ type: Number, default: 0 },
  total:         { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod','upi','card','razorpay','whatsapp'] },
  paymentStatus: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  orderStatus:   { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  razorpayOrderId: String,
  notes:         String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
