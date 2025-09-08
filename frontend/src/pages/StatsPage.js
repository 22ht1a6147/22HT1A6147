import React, { useEffect, useState } from 'react';
import StatsTable from '../components/StatsTable';
import axios from 'axios';

const SESSION_KEY = 'createdShortUrls_v1';

export default function StatsPage() {
  const [sessionItems, setSessionItems] = useState([]);
  const [allShortcodes, setAllShortcodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [statsItems, setStatsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load session shortcodes
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) setSessionItems(JSON.parse(raw));
    } catch (err) {
      console.warn('Failed to load session items', err);
    }
  }, []);

  // Fetch all shortcodes from backend
  useEffect(() => {
    const fetchAllShortcodes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shorturls/all');
        setAllShortcodes(Object.keys(res.data));
      } catch (err) {
        console.warn('Failed to fetch all shortcodes', err);
      }
    };
    fetchAllShortcodes();
  }, []);

  const handleFetchStats = async (code) => {
    if (!code) return;
    setError('');
    setLoading(true);
    setStatsItems([]);
    try {
      const res = await axios.get(`http://localhost:5000/api/shorturls/${code}/stats`);
      const data = res.data;

      const item = {
        shortcode: code,
        originalUrl: data.originalUrl || data.url,
        createdAt: data.createdAt,
        expiryAt: data.expiryAt,
        totalClicks: data.clicks ?? 0,
        clickEvents: data.clickEvents || []
      };

      setStatsItems([item]);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to fetch stats';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    const code = e.target.value;
    setSelectedCode(code);
    if (code) handleFetchStats(code);
    else setStatsItems([]);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (selectedCode) handleFetchStats(selectedCode);
  };

  // Combine session shortcodes and backend shortcodes for dropdown
  const dropdownShortcodes = Array.from(
    new Set([
      ...sessionItems.map(it => it.shortcode || it.shortLink || it.code || it.shortCode).filter(Boolean),
      ...allShortcodes
    ])
  );

  return (
    <div style={{ padding: 12 }}>
      <h2>Statistics</h2>
      <p>Use the UI to view individual short URL stats. You can select one of the shortcodes created in this session or paste a shortcode below.</p>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Shortcodes created in this session / backend:</label>
        <select value={selectedCode} onChange={handleSelect} style={{ padding: 8, width: 320 }}>
          <option value="">-- choose one --</option>
          {dropdownShortcodes.map((code, idx) => (
            <option key={idx} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleManualSubmit} style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 6 }}>Or paste a shortcode</label>
        <input
          type="text"
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          placeholder="e.g. abcd"
          style={{ padding: 8, width: 320, marginRight: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
          {loading ? 'Loading...' : 'Get stats'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <StatsTable items={statsItems} />
    </div>
  );
}
