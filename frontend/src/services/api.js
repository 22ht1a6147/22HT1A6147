/**
 * API wrappers for backend calls.
 */

import axios from 'axios';

// Base URL for backend API
const API_BASE = 'http://localhost:5000/api/shorturls';

// Create a new short URL
export async function createShortUrl(payload) {
  // payload: { url, validity, shortcode }
  try {
    const response = await axios.post(`${API_BASE}/shorten`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating short URL:', error.response?.data || error.message);
    throw error;
  }
}

// Get stats for a specific shortcode
export async function getStats(shortcode) {
  try {
    const response = await axios.get(`${API_BASE}/${shortcode}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error.response?.data || error.message);
    throw error;
  }
}
