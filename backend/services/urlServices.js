const store = require('../models/store');
const config = require('../config/config');

/**
 * Generate a random shortcode
 */
function generateRandomShortcode(length = config.GENERATED_SHORTCODE_LENGTH) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a new short URL entry
 */
async function createShortUrl({ url, validityMinutes, desiredShortcode }) {
  let shortcode = desiredShortcode || generateRandomShortcode();

  // Ensure shortcode is unique
  while (store.exists(shortcode)) {
    shortcode = generateRandomShortcode();
  }

  const expiryAt = new Date(Date.now() + validityMinutes * 60 * 1000).toISOString();
  const entry = {
    originalUrl: url,
    createdAt: new Date().toISOString(),
    expiryAt,
    clicks: 0
  };

  store.create(shortcode, entry, true);

  return {
    shortcode,
    shortUrl: `${config.BASE_URL}/${shortcode}`,
    expiryAt
  };
}

/**
 * Get statistics for a shortcode
 */
async function getStats(shortcode) {
  const entry = store.get(shortcode);
  return entry ? { ...entry } : null;
}

/**
 * Handle redirect for a shortcode
 */
async function handleRedirect(shortcode) {
  const entry = store.get(shortcode);
  if (!entry) return null;

  const now = new Date();
  if (new Date(entry.expiryAt) < now) {
    return { status: 'expired', expiryAt: entry.expiryAt };
  }

  entry.clicks = (entry.clicks || 0) + 1;
  store.update(shortcode, entry, true);

  return { status: 'ok', originalUrl: entry.originalUrl };
}

module.exports = {
  createShortUrl,
  getStats,
  handleRedirect
};
