# Git Hooks Setup Documentation

## Overview

This project uses Git hooks powered by **Husky** and **lint-staged** to automatically enforce code quality and formatting standards before commits and pushes. This ensures that only properly formatted, linted, and tested code enters the repository.

## Components

### Husky

- **Purpose**: Manages Git hooks
- **Version**: v9.x (latest)
- **Configuration**: `.husky/` directory with hook scripts

### lint-staged

- **Purpose**: Runs linters only on staged files (not entire codebase)
- **Performance**: Fast execution by processing only changed files
- **Configuration**: `lint-staged` section in `package.json`

## Git Hooks Configured

### Pre-commit Hook (`.husky/pre-commit`)

Runs **before** each commit to ensure code quality:

```bash
npx lint-staged
```

**What it does:**

- Runs ESLint with auto-fix on staged `.js`, `.mjs`, `.cjs` files
- Runs Prettier formatting on staged JavaScript files
- Runs Prettier on staged JSON, Markdown, YAML files
- Formats `package.json` if modified

### Pre-push Hook (`.husky/pre-push`)

Runs **before** each push for comprehensive checks:

```bash
npm run code:check
```

**What it does:**

- Runs ESLint on entire codebase with zero warnings tolerance
- Runs Prettier check on entire codebase
- Ensures no formatting or linting issues exist

## lint-staged Configuration

Located in `package.json`:

```json
{
  "lint-staged": {
    "*.{js,mjs,cjs}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"],
    "package.json": ["prettier --write"]
  }
}
```

### File Type Handling

| File Types                          | Actions                      |
| ----------------------------------- | ---------------------------- |
| `*.js`, `*.mjs`, `*.cjs`            | ESLint fix + Prettier format |
| `*.json`, `*.md`, `*.yml`, `*.yaml` | Prettier format only         |
| `package.json`                      | Prettier format              |

## Workflow Examples

### Normal Commit Process

```bash
# 1. Make code changes
echo "console.log('test')" >> app.js

# 2. Stage files
git add app.js

# 3. Commit (hooks run automatically)
git commit -m "Add test log"
# ✔ Running tasks for staged files...
# ✔ ESLint fixes applied
# ✔ Prettier formatting applied
# ✔ Commit successful

# 4. Push (pre-push hook runs)
git push
# ✔ Running code quality checks...
# ✔ Push successful
```

### Hook Failure Example

```bash
# Add problematic code
echo "var badCode = true" >> app.js

# Try to commit
git commit -m "Bad code"
# ✖ ESLint found errors that couldn't be auto-fixed
# ✖ Commit blocked

# Fix issues manually or run:
npm run code:fix

# Then commit again
git commit -m "Fixed code"
# ✔ Commit successful
```

## Benefits

### 1. **Automatic Code Quality**

- No manual linting/formatting needed
- Consistent code style across team
- Prevents bad code from entering repository

### 2. **Performance Optimized**

- `lint-staged` only processes changed files
- Fast execution even in large codebases
- No unnecessary processing of unchanged files

### 3. **Team Consistency**

- All team members have same standards
- No "format wars" or style discussions
- Automated enforcement of project rules

### 4. **CI/CD Integration**

- Reduces failed CI builds
- Catches issues before code review
- Faster feedback loop

## Available Commands

```bash
# Manual operations (hooks run these automatically)
npm run lint:fix      # Fix ESLint issues
npm run format:fix    # Fix Prettier formatting
npm run code:fix      # Fix both ESLint + Prettier

# Check operations (used by pre-push hook)
npm run lint:check    # Check ESLint (zero warnings)
npm run format:check  # Check Prettier formatting
npm run code:check    # Check both (used by pre-push)

# Test lint-staged manually
npx lint-staged       # Run on currently staged files
```

## Troubleshooting

### Hook Not Running?

1. Check if Husky is initialized:

   ```bash
   ls -la .husky/
   ```

2. Ensure hooks are executable:

   ```bash
   chmod +x .husky/pre-commit .husky/pre-push
   ```

3. Verify Git hooks are installed:
   ```bash
   git config core.hooksPath
   # Should show: .husky
   ```

### Hook Failing?

1. **ESLint errors**: Fix manually or run `npm run lint:fix`
2. **Prettier errors**: Run `npm run format:fix`
3. **Both**: Run `npm run code:fix`

### Skipping Hooks (Emergency Only)

```bash
# Skip pre-commit hook (NOT RECOMMENDED)
git commit -m "Emergency fix" --no-verify

# Skip pre-push hook (NOT RECOMMENDED)
git push --no-verify
```

**⚠️ Warning**: Only use `--no-verify` in genuine emergencies. This bypasses all quality checks.

### Performance Issues?

1. **Large files**: Add patterns to `.prettierignore` or ESLint ignores
2. **Many files**: lint-staged processes incrementally
3. **Slow ESLint**: Consider disabling heavy rules for hooks

## Customization

### Adding New File Types

Edit `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"]
  }
}
```

### Adding New Hooks

Create new hook files:

```bash
# Add commit-msg hook for message validation
echo '#!/bin/sh' > .husky/commit-msg
echo 'npx commitlint --edit $1' >> .husky/commit-msg
chmod +x .husky/commit-msg
```

### Modifying Existing Hooks

Edit files in `.husky/` directory:

```bash
# Add additional checks to pre-commit
echo 'npm run test:unit' >> .husky/pre-commit
```

## Team Setup

### New Team Member Setup

1. Clone repository
2. Run `npm install` (installs Husky automatically via `prepare` script)
3. Hooks are ready to use!

### Sharing Configuration

- All hook configuration is in version control
- Team members get identical setup automatically
- No manual configuration required

## Best Practices

### 1. **Commit Frequently**

- Small commits = faster hook execution
- Easier to fix issues when they occur
- Better Git history

### 2. **Run Checks Locally**

```bash
# Before making large changes
npm run code:check

# Fix issues proactively
npm run code:fix
```

### 3. **Don't Disable Hooks**

- Hooks ensure code quality
- Temporary bypasses can become permanent bad habits
- Fix issues instead of skipping checks

### 4. **Keep Hooks Fast**

- Use lint-staged for incremental processing
- Avoid heavy operations in hooks
- Consider moving slow tests to CI

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Code Quality
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run code:check
```

### Pre-deployment Checks

```bash
# In deployment script
npm run code:check || exit 1
npm run test || exit 1
```

## Maintenance

### Updating Dependencies

```bash
# Update Husky
npm update husky

# Update lint-staged
npm update lint-staged
```

### Monitoring Hook Performance

```bash
# Time hook execution
time git commit -m "Test performance"
```

## Migration Guide

### From Manual Linting

1. Remove manual lint/format commands from documentation
2. Update team workflows to rely on automatic hooks
3. Add hook documentation to onboarding

### From Other Hook Systems

1. Remove old hook systems (e.g., pre-commit, lefthook)
2. Install Husky: `npm install --save-dev husky`
3. Initialize: `npx husky init`
4. Configure as documented above

For questions or issues with Git hooks, please reach out to the development team.
