const express = require('express');
const router = express.Router();

// Echo endpoint - useful for testing and debugging
router.all('/echo', (req, res) => {
  res.json({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params,
    timestamp: new Date().toISOString()
  });
});

// Simulate delay endpoint - useful for testing loading states
router.get('/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds) || 1;
  const delay = Math.min(Math.max(seconds, 0), 10); // Limit to 0-10 seconds
  
  setTimeout(() => {
    res.json({
      success: true,
      message: `Response delayed by ${delay} seconds`,
      delay: delay,
      timestamp: new Date().toISOString()
    });
  }, delay * 1000);
});

module.exports = router; 