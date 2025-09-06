import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

/**
 * Page that allows up to 5 concurrent entries.
 * The heavy lifting (shortening) MUST be done by backend API.
 *
 * TODO: Implement client-side validation using utils/validators.js
 * TODO: Replace "fake" calls with real calls to /shorturls via services/api.js
 */

export default function ShortenerPage() {
  const [results, setResults] = useState([]); // array of { originalUrl, shortLink, expiry }

  return (
    <div>
      <h2>URL Shortener</h2>
      <UrlForm onSuccess={(resObjects) => setResults(resObjects)} />
      <UrlList items={results} />
    </div>
  );
}
