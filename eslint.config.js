const js = require('@eslint/js');

module.exports = [
  // Base recommended configuration
  js.configs.recommended,

  // Global configuration for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly'
      }
    },

    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.log',
      '.git/**',
      'coverage/**',
      '.nyc_output/**',
      'package-lock.json',
      'yarn.lock'
    ],

    rules: {
      // JavaScript best practices
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(req|res|next|err|_)',
          varsIgnorePattern: '^_'
        }
      ],
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // Code style (Prettier will handle most formatting)
      // Keep only essential non-formatting rules
      indent: 'off', // Prettier handles this
      quotes: 'off', // Prettier handles this
      semi: 'off', // Prettier handles this
      'comma-dangle': 'off', // Prettier handles this
      'object-curly-spacing': 'off', // Prettier handles this
      'array-bracket-spacing': 'off', // Prettier handles this
      'key-spacing': 'off', // Prettier handles this
      'space-before-function-paren': 'off', // Prettier handles this
      'space-in-parens': 'off', // Prettier handles this
      'no-trailing-spaces': 'off', // Prettier handles this
      'eol-last': 'off', // Prettier handles this
      'comma-spacing': 'off', // Prettier handles this
      'brace-style': 'off', // Prettier handles this

      // Functions and arrow functions
      'arrow-spacing': 'off', // Prettier handles this
      'prefer-arrow-callback': [
        'warn',
        {
          allowNamedFunctions: true
        }
      ],
      'func-call-spacing': 'off', // Prettier handles this

      // Error prevention
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',

      // Node.js specific
      'no-process-exit': 'warn',
      'no-sync': 'warn',

      // Express.js patterns
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ]
    }
  },

  // Specific configuration for Express route files
  {
    files: ['routes/**/*.js', 'app.js'],
    rules: {
      'no-console': 'off', // Allow console in routes and main app for logging
      'no-sync': 'off' // Allow sync operations in Express setup
    }
  },

  // Specific configuration for test files
  {
    files: ['**/*.test.js', '**/*.spec.js', 'test/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        test: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-expressions': 'off'
    }
  },

  // Configuration files
  {
    files: ['eslint.config.js', '*.config.js', '.eslintrc.js'],
    rules: {
      'no-console': 'off'
    }
  }
];
