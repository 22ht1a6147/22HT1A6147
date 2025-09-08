import React, { useState } from 'react';
import { isValidUrl, isValidValidity, isValidShortcode } from '../utils/validators';
import { createShortUrl } from '../services/api';

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setUrl('');
    setValidity('');
    setShortcode('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // client-side validation
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://).');
      return;
    }
    if (validity && !isValidValidity(validity)) {
      setError('Validity must be a positive integer (minutes).');
      return;
    }
    if (!isValidShortcode(shortcode)) {
      setError('Shortcode (optional) must be 4-12 alphanumeric characters.');
      return;
    }

    const payload = {
      originalUrl: url,
      validity: validity ? Number(validity) : undefined,
      shortcode: shortcode || undefined
    };

    try {
      setLoading(true);
      const created = await createShortUrl(payload);
      // created should be an object returned by backend
      onSuccess(created ? [created] : []);
      resetForm();
    } catch (err) {
      // show server error if available
      const msg = err.response?.data?.error || err.message || 'Failed to create short URL';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Long URL</label>
        <input
          type="text"
          placeholder="https://example.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', padding: 8 }}
          required
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Validity (minutes)</label>
        <input
          type="number"
          min="1"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{ width: '200px', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Preferred Shortcode (optional)</label>
        <input
          type="text"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          style={{ width: '300px', padding: 8 }}
        />
      </div>

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
        {loading ? 'Shortening...' : 'Shorten'}
      </button>
    </form>
  );
}
