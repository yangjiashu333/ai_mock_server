# Prettier Setup Documentation

## Overview

This project uses Prettier as an opinionated code formatter to ensure consistent code style across the entire codebase. Prettier works alongside ESLint to provide comprehensive code quality and formatting.

## Configuration

### Prettier Version

- Prettier: v3.x (latest)
- Configuration file: `.prettierrc.js`
- Integration: Works seamlessly with ESLint

### Key Features

- **Automatic Formatting**: Consistent code style across all files
- **Zero Configuration**: Works out of the box with sensible defaults
- **Editor Integration**: Real-time formatting in popular editors
- **Team Consistency**: Eliminates style debates and ensures uniform formatting

## Formatting Rules

### Basic Formatting

- **Semicolons**: Always required (`;`)
- **Quotes**: Single quotes (`'`) preferred
- **Trailing Commas**: None (matches ESLint)
- **Quote Props**: Only when necessary

### Indentation & Spacing

- **Tab Width**: 2 spaces
- **Use Tabs**: False (spaces only)
- **Bracket Spacing**: Enabled (`{ foo: bar }`)
- **Bracket Same Line**: False (closing bracket on new line)

### Line Wrapping

- **Print Width**: 80 characters
- **Line Endings**: LF (Unix style)
- **Prose Wrap**: Preserve (for Markdown)

### Function Formatting

- **Arrow Parens**: Avoid when possible (`x => x` instead of `(x) => x`)

## Available NPM Scripts

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check

# Format all files (same as format)
npm run format:fix

# Run both ESLint and Prettier checks
npm run code:check

# Fix both ESLint and Prettier issues
npm run code:fix
```

## Integration with ESLint

Prettier and ESLint work together seamlessly:

- **ESLint**: Handles code quality and logic rules
- **Prettier**: Handles code formatting and style
- **No Conflicts**: Formatting rules in ESLint are disabled to avoid conflicts
- **Unified Workflow**: Use `npm run code:fix` for comprehensive code cleanup

## Supported File Types

Prettier automatically formats:

- **JavaScript** (`.js`, `.mjs`, `.cjs`)
- **JSON** (`.json`)
- **Markdown** (`.md`)
- **YAML** (`.yml`, `.yaml`)
- **CSS** (`.css`)
- **HTML** (`.html`)
- **TypeScript** (`.ts`, `.tsx`) - if added later

## Ignored Files

The following files are ignored by Prettier (see `.prettierignore`):

- `node_modules/`
- Build outputs (`dist/`, `build/`)
- Log files
- Package lock files
- Binary files (images, fonts)
- Generated files

## Editor Integration

### VS Code

1. Install the Prettier extension: `esbenp.prettier-vscode`
2. Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "prettier.requireConfig": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm/IntelliJ

1. Go to `Settings > Languages & Frameworks > JavaScript > Prettier`
2. Enable "Automatic Prettier configuration"
3. Enable "Run on save for files"

### Vim/Neovim

Install `prettier/vim-prettier` plugin and configure auto-format on save.

## Development Workflow

### Before Committing

```bash
# Quick check and fix
npm run code:fix

# Verify everything is clean
npm run code:check
```

### Recommended Git Hooks

Add to your `package.json` with Husky:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run code:check",
      "pre-push": "npm run code:check"
    }
  }
}
```

## Team Guidelines

### 1. Never Commit Unformatted Code

Always run `npm run format` before committing.

### 2. Use Editor Integration

Set up your editor to format on save for instant feedback.

### 3. Don't Disable Prettier

Avoid adding `// prettier-ignore` comments unless absolutely necessary.

### 4. Consistent Configuration

All team members should use the same `.prettierrc.js` configuration.

## Common Use Cases

### Format Specific Files

```bash
# Format a single file
npx prettier --write app.js

# Format specific directory
npx prettier --write routes/

# Format specific file types
npx prettier --write "**/*.js"
```

### Check Without Fixing

```bash
# Check specific files
npx prettier --check app.js

# Check all JavaScript files
npx prettier --check "**/*.js"
```

### Integration with Other Tools

```bash
# Format and then lint
npm run format && npm run lint

# Complete code cleanup
npm run code:fix
```

## Configuration Options

To modify Prettier behavior, edit `.prettierrc.js`:

```javascript
module.exports = {
  // Change line width to 100
  printWidth: 100,

  // Use double quotes
  singleQuote: false,

  // Add trailing commas
  trailingComma: 'es5',

  // Use 4 spaces for indentation
  tabWidth: 4
};
```

## Troubleshooting

### Prettier Not Working?

1. Ensure Prettier is installed: `npm list prettier`
2. Check configuration file exists: `.prettierrc.js`
3. Verify file isn't in `.prettierignore`
4. Restart your editor

### Conflicts with ESLint?

1. Ensure `eslint-config-prettier` is installed
2. Check ESLint configuration disables formatting rules
3. Run `npm run code:fix` to resolve both

### Editor Not Formatting?

1. Install Prettier extension for your editor
2. Enable "format on save" in editor settings
3. Set Prettier as default formatter
4. Restart editor

### Performance Issues?

1. Add more patterns to `.prettierignore`
2. Use `--cache` flag for CI environments
3. Format only changed files in large projects

## Best Practices

### 1. Format Early and Often

- Format before every commit
- Use editor auto-formatting
- Format entire codebase periodically

### 2. Consistent Team Setup

- Share editor configurations
- Use same Prettier version
- Document any custom rules

### 3. CI/CD Integration

```bash
# In your CI pipeline
npm run format:check
```

### 4. Documentation

- Keep this documentation updated
- Document any configuration changes
- Share formatting guidelines with new team members

## Advanced Usage

### Custom File Extensions

Add to `.prettierrc.js`:

```javascript
module.exports = {
  // ... other options
  overrides: [
    {
      files: '*.test.js',
      options: {
        printWidth: 120
      }
    }
  ]
};
```

### Ignore Specific Code Blocks

```javascript
// prettier-ignore
const uglyMatrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
```

For questions or issues with the Prettier setup, please reach out to the development team.
