/**
 * Entry point for backend microservice
 * - mounts logging middleware
 * - mounts routes and error handler
 * - allows root-level short URL redirects
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/config');
const loggingMiddleware = require('../loginMiddleware/loggingMiddleware');
const errorHandler = require('../loginMiddleware/errorHandler');
const shorturlsRouter = require('./routes/shorturls');
const { redirectShortUrl } = require('./controllers/shorturlController');

const app = express();

// Security + JSON parsing
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json({ limit: '1mb' }));

// Logging middleware
app.use(loggingMiddleware);

// API routes
app.use('/api/shorturls', shorturlsRouter);

// Root-level redirect route (must come last)
app.get('/:shortcode', redirectShortUrl);

// Centralized error handler (must come last)
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  process.stdout.write(
    JSON.stringify({
      level: 'info',
      message: `Server running on port ${config.PORT}`,
      timestamp: new Date().toISOString(),
    }) + '\n'
  );
});
