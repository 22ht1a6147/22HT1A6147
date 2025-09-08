import React from 'react';
import { buildRedirectUrl } from '../services/api';

/**
 * Displays list of shortened links returned from server.
 * Each item: originalUrl, shortcode, expiry, createdAt
 */

export default function UrlList({ items }) {
  if (!items || items.length === 0) return <p>No shortened URLs yet.</p>;

  return (
    <div>
      <h3>Results</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {items.map((it, idx) => {
          // Some backends return different fields; normalize:
          const shortcode = it.shortcode || it.shortLink || it.code || it.shortCode;
          const originalUrl = it.originalUrl || it.url || it.original;
          const expiry = it.expiry || it.expiryAt || it.expiresAt || '';
          const createdAt = it.createdAt || it.created || '';

          const redirectUrl = shortcode ? buildRedirectUrl(shortcode) : (it.shortLink || '#');

          return (
            <li key={idx} style={{ border: '1px solid #eee', padding: 12, marginBottom: 8 }}>
              <div><strong>Original:</strong> <a href={originalUrl} target="_blank" rel="noreferrer">{originalUrl}</a></div>
              <div>
                <strong>Short:</strong>{' '}
                {shortcode ? (
                  <a href={redirectUrl} target="_blank" rel="noreferrer">{redirectUrl}</a>
                ) : (
                  <span>{it.shortLink || 'generated_code'}</span>
                )}
              </div>
              <div><strong>Expiry:</strong> {expiry || '—'}</div>
              <div><strong>Created:</strong> {createdAt || '—'}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
