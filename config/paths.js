const path = require('path');

// Get the root directory of the project
const rootDir = path.dirname(__dirname);

module.exports = {
  // Mock images directory
  mockImagesDir: path.join(rootDir, 'mock_image'),

  // Individual file paths can be added as needed
  getMockImagePath: filename => path.join(rootDir, 'mock_image', filename)
};
