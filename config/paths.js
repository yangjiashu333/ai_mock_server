const path = require('path');

// Get the root directory of the project
const rootDir = path.dirname(__dirname);

module.exports = {
  // Mock images directory
  mockImagesDir: path.join(rootDir, 'mock_image'),
  // Mock txt files directory
  mockTxtFilesDir: path.join(rootDir, 'mock_txt'),

  // Individual file paths can be added as needed
  getMockImagePath: filename => path.join(rootDir, 'mock_image', filename),
  getMockTxtFilePath: filename => path.join(rootDir, 'mock_txt', filename)
};
