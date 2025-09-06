import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <div>
      <header>
        <nav style={{ padding: 12 }}>
          <Link to="/" style={{ marginRight: 12 }}>Shorten</Link>
          <Link to="/stats">Stats</Link>
        </nav>
      </header>

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  );
}
