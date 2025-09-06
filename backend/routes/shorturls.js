/**
 * Defines routes:
 *  - POST /shorten          -> create short link (frontend expects this)
 *  - POST /shorturls        -> create short link (REST style)
 *  - GET  /shorturls/:code  -> get stats
 *  - GET  /:code            -> redirect
 */

const express = require('express');
const router = express.Router();

const controller = require('../controllers/shorturlController');

// Create short URL (frontend version)
router.post('/shorten', controller.createShortUrl);

// Create short URL (REST version)
router.post('/shorturls', controller.createShortUrl);

// Get statistics for a short URL
router.get('/:shortcode/stats', controller.getStats);

// Redirect shorthand route (must be last / more generic)
router.get('/:shortcode', controller.redirectShortUrl);

module.exports = router;
