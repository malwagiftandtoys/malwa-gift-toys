const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');

// POST /api/orders - Place new order
router.post('/', async (req, res) => {
  try {
    const { name, phone, address, pincode, items, paymentMethod } = req.body;
    if (!name || !phone || !address || !pincode || !items?.length)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const orderId = 'MGT' + Date.now();
    res.status(201).json({ success: true, orderId, message: 'Order placed! We will confirm on WhatsApp.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders - Admin
router.get('/', protect, async (req, res) => {
  res.json({ success: true, data: [], message: 'Connect MongoDB for live orders' });
});

module.exports = router;
