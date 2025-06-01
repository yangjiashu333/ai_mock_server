# ESLint Setup Documentation

## Overview

This project uses ESLint to maintain code quality and consistency across the Express.js application. The configuration follows modern JavaScript best practices and includes specific rules for Node.js and Express.js development.

## Configuration

### ESLint Version

- ESLint: Latest (v9.x)
- Configuration format: Flat config (`eslint.config.js`)

### Key Features

- **JavaScript Best Practices**: Enforces modern ES6+ syntax and patterns
- **Code Style**: Consistent formatting with 2-space indentation
- **Express.js Specific**: Tailored rules for Express route handlers
- **Error Prevention**: Catches common mistakes and potential bugs
- **Automatic Fixing**: Most issues can be auto-fixed

## Rules Overview

### Code Style Rules

- **Indentation**: 2 spaces (with switch case handling)
- **Quotes**: Single quotes preferred (template literals allowed)
- **Semicolons**: Required
- **Trailing Commas**: Not allowed
- **Spacing**: Consistent object/array spacing

### JavaScript Best Practices

- **Variables**: Prefer `const`, no `var`
- **Unused Variables**: Error (except common Express params like `req`, `res`, `next`, `err`)
- **Arrow Functions**: Preferred for callbacks
- **No Console**: Warning (allowed in routes and main app)

### Node.js/Express Specific

- **Process Exit**: Warning for `process.exit()`
- **Sync Operations**: Warning (allowed in Express setup)
- **Express Patterns**: Supports common Express middleware patterns

## Available NPM Scripts

```bash
# Run ESLint to check for issues
npm run lint

# Auto-fix fixable issues
npm run lint:fix

# Check with zero warnings tolerance (for CI)
npm run lint:check
```

## File-Specific Configurations

### Express Routes (`routes/**/*.js`, `app.js`)

- Console statements allowed
- Sync operations allowed for setup

### Test Files (`**/*.test.js`, `**/*.spec.js`)

- Test framework globals available (Jest, Mocha)
- Console statements allowed
- Relaxed expression rules

### Configuration Files (`*.config.js`)

- Console statements allowed

## Integration with Development Workflow

### Pre-commit Hooks (Recommended)

Add to your `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:check"
    }
  }
}
```

### VS Code Integration

Install the ESLint extension and add to your `.vscode/settings.json`:

```json
{
  "eslint.workingDirectories": ["."],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false
}
```

## Common Issues and Solutions

### 1. Trailing Spaces Error

**Issue**: `Trailing spaces not allowed`
**Solution**: Run `npm run lint:fix` or enable "trim trailing whitespace" in your editor

### 2. Missing Semicolons

**Issue**: `Missing semicolon`
**Solution**: Run `npm run lint:fix` to auto-add semicolons

### 3. Indentation Issues

**Issue**: `Expected indentation of X spaces`
**Solution**: Configure your editor to use 2 spaces, or run `npm run lint:fix`

### 4. Unused Variables in Express

**Issue**: `'req' is defined but never used`
**Solution**: Use underscore prefix: `_req` or ensure the variable follows the ignore pattern

## Customizing Rules

To modify rules, edit `eslint.config.js`:

```javascript
// Example: Change indentation to 4 spaces
rules: {
  'indent': ['error', 4, { SwitchCase: 1 }]
}
```

## Best Practices

1. **Run `npm run lint:fix`** before committing code
2. **Configure your editor** to show ESLint errors in real-time
3. **Don't disable rules** without good reason
4. **Use meaningful variable names** to avoid unused variable errors
5. **Follow the established patterns** in existing code

## Ignored Files

The following are automatically ignored:

- `node_modules/`
- `dist/`, `build/`
- Log files (`*.log`)
- Coverage reports
- Package lock files

## Troubleshooting

### ESLint not working?

1. Ensure you're using Node.js 18+ and npm 9+
2. Run `npm install` to ensure all dependencies are installed
3. Check if `eslint.config.js` exists in the project root
4. Verify your editor ESLint extension is enabled

### Performance Issues?

- ESLint may be slow on large projects
- Consider using `eslint.config.js` ignores for temporary files
- Use `--cache` flag for better performance in CI environments

## Contributing

When adding new rules:

1. Test the rule on existing codebase
2. Run `npm run lint:fix` to see auto-fix behavior
3. Update this documentation
4. Consider impact on team workflow

For questions or issues with the ESLint setup, please reach out to the development team.
