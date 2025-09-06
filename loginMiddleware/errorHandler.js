/**
 * Centralized error handling middleware
 * Sends JSON responses, logs errors in structured format
 */

function errorHandler(err, req, res, next) {
  const logMessage = {
    level: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    method: req.method,
    path: req.originalUrl,
    requestId: req.requestId,
    timestamp: new Date().toISOString(),
  };

  // Write error log to stderr
  process.stderr.write(JSON.stringify(logMessage) + '\n');

  // Send safe JSON response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Something went wrong',
  });
}

module.exports = errorHandler;
