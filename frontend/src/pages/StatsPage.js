import React from 'react';
import StatsTable from '../components/StatsTable';

/**
 * TODO: Implement retrieval of created short URLs (either session or via backend listing API)
 * For exam: backend does not require a "list all" endpoint, so StatsPage can ask the user to paste shortcode or show session items.
 */

export default function StatsPage() {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Use the UI to view individual short URL stats.</p>
      <StatsTable items={[]} />
    </div>
  );
}
