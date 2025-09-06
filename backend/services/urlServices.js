const storeModel = require('../models/store');
const shortcodeUtils = require('../utils/shortcode');
const config = require('../config/config');

async function createShortUrl({ url, validityMinutes, desiredShortcode }) {
  let shortcode = desiredShortcode || shortcodeUtils.generateUniqueShortcode(storeModel.all());

  if (storeModel.exists(shortcode)) {
    throw new Error('Shortcode already exists');
  }

  const now = new Date();
  const expiryAt = new Date(now.getTime() + validityMinutes * 60 * 1000);

  const entry = {
    shortcode,
    originalUrl: url,
    createdAt: now,
    expiryAt,
    totalClicks: 0,
    clickEvents: []
  };

  storeModel.create(shortcode, entry, true);

  return {
    shortLink: `${config.BASE_URL}/${shortcode}`,
    expiry: expiryAt
  };
}

async function getStats(shortcode) {
  return storeModel.get(shortcode);
}

async function handleRedirect(shortcode, req) {
  const entry = storeModel.get(shortcode);
  if (!entry) return null;

  const now = new Date();
  if (now > new Date(entry.expiryAt)) {
    return { status: 'expired', expiryAt: entry.expiryAt };
  }

  entry.totalClicks += 1;
  entry.clickEvents.push({
    timestamp: now,
    referrer: req.get('referer') || null,
    userAgent: req.get('user-agent') || null
  });

  storeModel.update(shortcode, entry, true);

  return { status: 'ok', originalUrl: entry.originalUrl };
}

module.exports = { createShortUrl, getStats, handleRedirect };
