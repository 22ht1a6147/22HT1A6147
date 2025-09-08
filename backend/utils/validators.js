const config = require('../config/config');

function isValidUrl(u) {
  if (!u || typeof u !== 'string') return false;
  const re = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  return re.test(u);
}

function isValidValidity(v) {
  return Number.isInteger(v) && v > 0 && v < 60 * 24 * 365;
}

function isValidShortcode(code) {
  if (!code || typeof code !== 'string') return false;
  const { SHORTCODE_MIN_LEN, SHORTCODE_MAX_LEN } = config;
  const re = /^[A-Za-z0-9]+$/;
  return re.test(code) && code.length >= SHORTCODE_MIN_LEN && code.length <= SHORTCODE_MAX_LEN;
}

module.exports = {
  isValidUrl,
  isValidValidity,
  isValidShortcode
};
