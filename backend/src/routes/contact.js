const express = require('express');
const router  = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone)
      return res.status(400).json({ success: false, message: 'Name and phone required' });
    // In production: send email via nodemailer
    res.json({ success: true, message: 'Message received! We will reply within 24 hours.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
