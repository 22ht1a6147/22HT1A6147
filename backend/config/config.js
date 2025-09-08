module.exports = {
  PORT: process.env.PORT || 5000,
  BASE_URL: process.env.BASE_URL || "http://localhost:5000", //  Added for shortLink generation
  DEFAULT_VALIDITY_MINUTES: 30,
  SHORTCODE_MIN_LEN: 4,
  SHORTCODE_MAX_LEN: 12,
  GENERATED_SHORTCODE_LENGTH: 6,
  CLICK_EVENTS_LIMIT: 1000
};
