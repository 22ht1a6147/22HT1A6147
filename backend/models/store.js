/**
 * In-memory store model with optional persistence
 */

const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(__dirname, '..', 'data', 'store.json');

let store = {};

function loadFromDisk() {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, 'utf8');
      store = JSON.parse(raw || '{}');
    }
  } catch (err) {
    store = {};
  }
}

function persistToDisk() {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    // ignore in exam project
  }
}

function exists(shortcode) {
  return Object.prototype.hasOwnProperty.call(store, shortcode);
}

function get(shortcode) {
  return store[shortcode] || null;
}

function create(shortcode, entry, persist = false) {
  store[shortcode] = entry;
  if (persist) persistToDisk();
  return store[shortcode];
}

function update(shortcode, entry, persist = false) {
  store[shortcode] = entry;
  if (persist) persistToDisk();
  return store[shortcode];
}

function all() {
  return store;
}

loadFromDisk();

module.exports = {
  exists,
  get,
  create,
  update,
  all,
  persistToDisk
};
