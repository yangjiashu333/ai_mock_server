// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routers
const usersRouter = require('./routes/users');
const utilRouter = require('./routes/util');
const healthRouter = require('./routes/health');
const aiMockRouter = require('./routes/ai-mock');

const app = express();
const PORT = process.env.PORT || 8101;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : '*',
    credentials: true
  })
);

// Enhanced Rate limiting configuration
// Global rate limiter - more permissive for general use
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5000, // 5000 requests per 15 minutes
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(
      (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000
    )
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests to certain endpoints
  skip: (req, res) => {
    // Skip rate limiting for health checks and static content
    return req.path === '/health' || req.path === '/';
  },
  // Custom key generator for more granular control
  keyGenerator: req => {
    // Use forwarded IP if behind proxy, otherwise use connection IP
    return req.ip || req.connection.remoteAddress;
  }
});

// Strict rate limiter for AI endpoints (more resource intensive)
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: parseInt(process.env.AI_RATE_LIMIT_MAX) || 100, // 100 AI requests per minute
  message: {
    error: 'Too many AI requests from this IP, please try again later.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Lenient rate limiter for utility endpoints
const utilLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: parseInt(process.env.UTIL_RATE_LIMIT_MAX) || 200, // 200 utility requests per minute
  message: {
    error: 'Too many utility requests from this IP, please try again later.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false
});

// User operations rate limiter
const userLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: parseInt(process.env.USER_RATE_LIMIT_MAX) || 300, // 300 user requests per minute
  message: {
    error: 'Too many user requests from this IP, please try again later.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply global rate limiter
app.use(globalLimiter);

// Logging middleware
app.use(morgan(process.env.LOG_LEVEL || 'combined'));

// Body parsing middleware
const maxFileSize = process.env.MAX_FILE_SIZE || '10mb';
app.use(express.json({ limit: maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: maxFileSize }));

// Root endpoint (no additional rate limiting)
app.get('/', (req, res) => {
  res.json({
    message: 'AI Mock Server is running!',
    name: process.env.APP_NAME || 'AI Mock Server',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    port: PORT,
    endpoints: {
      health: '/health',
      util: '/api/util',
      users: '/api/users',
      aiMock: '/api/ai-mock'
    },
    rateLimits: {
      global: `${parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5000} requests per ${Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 60000)} minutes`,
      ai: `${parseInt(process.env.AI_RATE_LIMIT_MAX) || 100} requests per minute`,
      util: `${parseInt(process.env.UTIL_RATE_LIMIT_MAX) || 200} requests per minute`,
      user: `${parseInt(process.env.USER_RATE_LIMIT_MAX) || 300} requests per minute`
    }
  });
});

// Mount routers with specific rate limiters
app.use('/health', healthRouter); // No additional rate limiting for health checks
app.use('/api/users', userLimiter, usersRouter);
app.use('/api/util', utilLimiter, utilRouter);
app.use('/api/ai-mock', aiLimiter, aiMockRouter);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle rate limit errors specifically
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      message: err.message,
      retryAfter: err.retryAfter
    });
  }

  // Handle different types of errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON in request body'
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Request entity too large'
    });
  }

  // Generic error response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 AI Mock Server is running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`🔧 Utility API: http://localhost:${PORT}/api/util`);
  console.log(`🤖 AI Mock API: http://localhost:${PORT}/api/ai-mock`);
  console.log(`📊 Rate Limits:`);
  console.log(
    `   Global: ${parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5000} req/15min`
  );
  console.log(
    `   AI: ${parseInt(process.env.AI_RATE_LIMIT_MAX) || 100} req/min`
  );
  console.log(
    `   Util: ${parseInt(process.env.UTIL_RATE_LIMIT_MAX) || 200} req/min`
  );
  console.log(
    `   User: ${parseInt(process.env.USER_RATE_LIMIT_MAX) || 300} req/min`
  );
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;
