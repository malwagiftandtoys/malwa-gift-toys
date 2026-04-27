const express = require('express');
const router  = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@'))
      return res.status(400).json({ success: false, message: 'Valid email required' });
    res.json({ success: true, message: 'Subscribed successfully! Welcome to Malwa Gift & Toys.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
