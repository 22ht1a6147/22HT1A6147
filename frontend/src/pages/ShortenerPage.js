import React, { useState } from 'react';
import axios from 'axios';

export default function ShortenerPage() {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [shortened, setShortened] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/shorturls/shorten', {
        url: longUrl,
        validity: Number(validity),
        shortcode: shortcode || undefined,
      });
      setShortened(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Request failed');
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          placeholder="Long URL"
          required
        />
        <input
          type="number"
          value={validity}
          onChange={e => setValidity(e.target.value)}
          placeholder="Validity (minutes)"
        />
        <input
          value={shortcode}
          onChange={e => setShortcode(e.target.value)}
          placeholder="Preferred Shortcode (optional)"
        />
        <button type="submit">Shorten</button>
      </form>

      {shortened && (
        <div style={{ marginTop: 12 }}>
          <div>
            Short URL: <a href={shortened.shortUrl} target="_blank" rel="noopener noreferrer">{shortened.shortUrl}</a>
          </div>
          <div>Expires at: {shortened.expiryAt}</div>
        </div>
      )}
    </div>
  );
}
