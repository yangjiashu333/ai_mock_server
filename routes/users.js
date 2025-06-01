const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Input validation schema for users
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120).optional()
});

// Get all users
router.get('/', (req, res) => {
  // Mock user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
  ];

  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Input validation
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID. Must be a positive integer.'
    });
  }

  // Mock user lookup
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    age: 25 + userId
  };

  res.json({
    success: true,
    data: user
  });
});

// Create new user
router.post('/', (req, res) => {
  // Validate request body
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  // Mock user creation
  const newUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    ...value,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// Update user (PUT)
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Input validation for ID
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID. Must be a positive integer.'
    });
  }

  // Validate request body
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  // Mock user update
  const updatedUser = {
    id: userId,
    ...value,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Input validation
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID. Must be a positive integer.'
    });
  }

  // Mock user deletion
  res.json({
    success: true,
    message: `User ${userId} deleted successfully`,
    data: { id: userId, deletedAt: new Date().toISOString() }
  });
});

module.exports = router;
