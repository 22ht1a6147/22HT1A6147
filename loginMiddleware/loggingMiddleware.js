/**
 * Shared logging middleware
 * Assigns a requestId, logs request/response info in structured JSON
 * DO NOT use console.log in final exam code.
 */

module.exports = function loggingMiddleware(req, res, next) {
  // Unique request ID for tracking
  req.requestId =
    req.headers['x-request-id'] ||
    (Date.now().toString(36) + Math.random().toString(36).slice(2));

  const start = Date.now();

  res.on('finish', () => {
    const logEntry = {
      level: 'info',
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };

    // Output structured log
    process.stdout.write(JSON.stringify(logEntry) + '\n');
  });

  next();
};
