/**
 * API wrappers for backend calls using axios.
 */

import axios from 'axios';

// Base URL for backend API
// Make sure your backend server is running on this port (backend/server.js).
const API_BASE = 'http://localhost:5000';

// Create a new short URL
export async function createShortUrl(payload) {
  // payload: { originalUrl, validity, shortcode }
  try {
    const response = await axios.post(`${API_BASE}/shorturls`, payload);
    // Expect backend to return something like:
    // { shortcode: "abcd", originalUrl: "...", expiry: "...", createdAt: "...", shortUrl: "/abcd" }
    return response.data;
  } catch (error) {
    // normalize message
    const msg = error.response?.data || error.message;
    console.error('Error creating short URL:', msg);
    throw error;
  }
}

// Get stats for a specific shortcode
export async function getStats(shortcode) {
  try {
    const response = await axios.get(`${API_BASE}/shorturls/${shortcode}`);
    // Expect backend to return stats object
    return response.data;
  } catch (error) {
    const msg = error.response?.data || error.message;
    console.error('Error fetching stats:', msg);
    throw error;
  }
}

// Utility to build the public redirect URL that user clicks to be redirected.
// This points to backend redirect route.
export function buildRedirectUrl(shortcode) {
  return `http://localhost:5000/${shortcode}`;
}
