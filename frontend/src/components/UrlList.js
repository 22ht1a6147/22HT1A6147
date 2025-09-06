import React from 'react';

/**
 * Displays list of shortened links returned from server.
 * Each item: originalUrl, shortLink, expiry
 */

export default function UrlList({ items }) {
  if (!items || items.length === 0) return <p>No shortened URLs yet.</p>;

  return (
    <div>
      <h3>Results</h3>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>
            <div><strong>Original:</strong> {it.originalUrl}</div>
            <div><strong>Short:</strong> <a href={it.shortLink} target="_blank" rel="noreferrer">{it.shortLink}</a></div>
            <div><strong>Expiry:</strong> {it.expiry}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
