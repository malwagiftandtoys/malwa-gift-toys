const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');

// GET /api/products - Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    // In production: fetch from MongoDB
    res.json({ success: true, data: [], message: 'Connect MongoDB for live data' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/products - Admin only
router.post('/', protect, async (req, res) => {
  try {
    const { name, category, price, originalPrice, stock, description, emoji, tag } = req.body;
    if (!name || !price || !category)
      return res.status(400).json({ success: false, message: 'Name, price, category required' });
    res.status(201).json({ success: true, message: 'Product created (connect MongoDB)' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
