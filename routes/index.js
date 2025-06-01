// Centralized router exports
const usersRouter = require('./users');
const utilRouter = require('./util');
const healthRouter = require('./health');

module.exports = {
  users: usersRouter,
  util: utilRouter,
  health: healthRouter
}; 