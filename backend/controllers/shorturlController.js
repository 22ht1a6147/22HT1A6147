const validators = require('../utils/validators');
const urlService = require('../services/urlServices');
const config = require('../config/config');

function sendError(res, status, message, details) {
  const payload = { error: message };
  if (details) payload.details = details;
  return res.status(status).json(payload);
}

exports.createShortUrl = async function createShortUrl(req, res, next) {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url || !validators.isValidUrl(url)) {
      return sendError(res, 400, 'Invalid input', 'url missing or not valid');
    }

    if (validity !== undefined && !validators.isValidValidity(validity)) {
      return sendError(res, 400, 'Invalid input', 'validity must be a positive integer');
    }

    if (shortcode !== undefined && !validators.isValidShortcode(shortcode)) {
      return sendError(res, 400, 'Invalid input', 'shortcode must be alphanumeric and length constraints');
    }

    const minutes = Number.isInteger(validity) ? validity : config.DEFAULT_VALIDITY_MINUTES;

    const result = await urlService.createShortUrl({
      url,
      validityMinutes: minutes,
      desiredShortcode: shortcode
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async function getStats(req, res, next) {
  try {
    const { shortcode } = req.params;
    if (!validators.isValidShortcode(shortcode)) {
      return sendError(res, 400, 'Invalid shortcode format');
    }

    const stats = await urlService.getStats(shortcode);
    if (!stats) {
      return sendError(res, 404, 'Shortcode not found');
    }

    return res.json(stats);
  } catch (err) {
    next(err);
  }
};

exports.redirectShortUrl = async function redirectShortUrl(req, res, next) {
  try {
    const { shortcode } = req.params;
    if (!validators.isValidShortcode(shortcode)) {
      return sendError(res, 400, 'Invalid shortcode format');
    }

    const result = await urlService.handleRedirect(shortcode, req);

    if (!result) {
      return sendError(res, 404, 'Shortcode not found');
    }

    if (result.status === 'expired') {
      return sendError(res, 410, 'Shortcode expired', { expiryAt: result.expiryAt });
    }

    return res.redirect(302, result.originalUrl);
  } catch (err) {
    next(err);
  }
};
