// Centralized router exports
const usersRouter = require('./users');
const utilRouter = require('./util');
const healthRouter = require('./health');
const aiMockRouter = require('./ai-mock');

module.exports = {
  users: usersRouter,
  util: utilRouter,
  health: healthRouter,
  aiMock: aiMockRouter
};
