import React from 'react';

/**
 * Displays click events for a short URL
 * items: array of { shortcode, originalUrl, createdAt, expiryAt, totalClicks, clickEvents }
 *
 * TODO: implement
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
          <div>Original: {it.originalUrl}</div>
          <div>Created: {it.createdAt}</div>
          <div>Expiry: {it.expiryAt}</div>
          <div>Total clicks: {it.totalClicks}</div>

          <table style={{ width: '100%', marginTop: 8 }}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Referrer</th>
                <th>Geo</th>
              </tr>
            </thead>
            <tbody>
              {it.clickEvents && it.clickEvents.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.timestamp}</td>
                  <td>{e.referrer}</td>
                  <td>{e.geo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
