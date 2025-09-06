/**
 * Entry point for backend microservice
 * - mounts logging middleware (must use pre-test logging implementation)
 * - mounts routes and error handler
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/config');

// ✅ Correct imports (middleware is in separate folder outside backend)
const loggingMiddleware = require('../loginMiddleware/loggingMiddleware');
const errorHandler = require('../loginMiddleware/errorHandler');

const shorturlsRouter = require('./routes/shorturls');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000' // frontend origin
}));
app.use(bodyParser.json({ limit: '1mb' }));

// Attach logging middleware
app.use(loggingMiddleware);

// Mount routes
// Mount routes
app.use('/api/shorturls', shorturlsRouter);


// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  // Use structured logging instead of console.log
  process.stdout.write(
    JSON.stringify({
      level: 'info',
      message: `Server running on port ${config.PORT}`,
      timestamp: new Date().toISOString(),
    }) + '\n'
  );
});
