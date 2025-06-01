const express = require('express');
const router = express.Router();

router.get('datasets', (req, res) => {
  res.json({
    success: true,
    message: 'Datasets',
    data: [
      {
        id: 1,
        name: 'Dataset 1'
      }
    ]
  });
});

module.exports = router;
