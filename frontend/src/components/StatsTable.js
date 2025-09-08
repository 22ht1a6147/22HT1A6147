import React from 'react';

/**
 * Displays click events for a short URL
 * items: array of { shortcode, originalUrl, createdAt, expiryAt, totalClicks, clickEvents }
 */

export default function StatsTable({ items }) {
  if (!items || items.length === 0) {
    return <p>No stats to show.</p>;
  }

  return (
    <div>
      {items.map((it) => (
        <div key={it.shortcode} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
          <h4>{it.shortcode}</h4>
          <div>Original: <a href={it.originalUrl} target="_blank" rel="noreferrer">{it.originalUrl}</a></div>
          <div>Created: {it.createdAt || '—'}</div>
          <div>Expiry: {it.expiryAt || it.expiry || '—'}</div>
          <div>Total clicks: {it.totalClicks ?? (it.clicks ?? 0)}</div>

          <table style={{ width: '100%', marginTop: 8, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 6 }}>Timestamp</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 6 }}>Referrer</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 6 }}>Geo</th>
              </tr>
            </thead>
            <tbody>
              {it.clickEvents && it.clickEvents.length > 0 ? it.clickEvents.map((e, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 6 }}>{e.timestamp}</td>
                  <td style={{ padding: 6 }}>{e.referrer || '—'}</td>
                  <td style={{ padding: 6 }}>{e.geo || '—'}</td>
                </tr>
              )) : (
                <tr>
                  <td style={{ padding: 6 }} colSpan="3">No click events recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
