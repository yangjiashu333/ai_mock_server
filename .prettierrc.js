module.exports = {
  // Basic formatting
  semi: true, // Add semicolons (matches ESLint)
  singleQuote: true, // Use single quotes (matches ESLint)
  quoteProps: "as-needed", // Only quote object props when needed
  trailingComma: "none", // No trailing commas (matches ESLint)

  // Spacing and indentation
  tabWidth: 2, // 2 spaces for indentation (matches ESLint)
  useTabs: false, // Use spaces, not tabs
  bracketSpacing: true, // Spaces in object literals { foo: bar }
  bracketSameLine: false, // Put > on new line in multi-line JSX

  // Line wrapping
  printWidth: 80, // Wrap lines at 80 characters
  endOfLine: "lf", // Use LF line endings (Unix style)

  // Arrow functions
  arrowParens: "avoid", // Avoid parentheses when possible: x => x

  // File handling
  insertPragma: false, // Don't insert @format pragma
  requirePragma: false, // Format all files, not just those with pragma

  // Prose wrapping (for markdown, etc.)
  proseWrap: "preserve", // Don't wrap prose

  // HTML/JSX specific (for future use)
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: "auto",
};
