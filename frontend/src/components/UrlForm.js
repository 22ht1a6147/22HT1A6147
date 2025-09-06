import React, { useState } from 'react';

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call backend API here
    const newShortUrl = {
      originalUrl: url,
      shortLink: shortcode || 'generated_code',
      expiry: validity,
    };
    onSuccess([newShortUrl]); // send back result
    setUrl('');
    setValidity('');
    setShortcode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Long URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Validity (minutes)</label>
        <input
          type="number"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
      </div>
      <div>
        <label>Preferred Shortcode (optional)</label>
        <input
          type="text"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
      </div>
      <button type="submit">Shorten</button>
    </form>
  );
}
