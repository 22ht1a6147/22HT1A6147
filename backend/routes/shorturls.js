const express = require('express');
const router = express.Router();
const controller = require('../controllers/shorturlController');
const store = require('../models/store');

// Create short URL
router.post('/shorten', controller.createShortUrl);

// Get all shortcodes (for Stats page dropdown)
router.get('/all', (req, res) => {
  res.json(store.all());
});

// Get statistics for a specific shortcode
router.get('/:shortcode/stats', controller.getStats);

// Redirect (must be last)
router.get('/:shortcode', controller.redirectShortUrl);

module.exports = router;
