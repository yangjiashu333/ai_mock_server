# AI Mock Server

A robust Express.js mock server application with built-in security, validation, and error handling.

## Features

- 🚀 Express.js server running on port 8101
- 🔒 Security middleware (Helmet, CORS, Rate limiting)
- ✅ Input validation using Joi
- 📝 Request logging with Morgan
- 🏥 Health check endpoint
- 🛡️ Comprehensive error handling
- 🎯 Sample API endpoints for testing
- 📁 Modular router structure
- 🔍 ESLint for code quality and consistency
- 🎨 Prettier for automatic code formatting
- 🪝 Git hooks for automated quality checks
- 🌍 Environment-based configuration with dotenv

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp env.example .env
```

Edit the `.env` file with your preferred configuration.

3. Start the development server:

```bash
npm run dev
```

4. Or start the production server:

```bash
npm start
```

The server will be running at `http://localhost:8101`

## Environment Configuration

The application uses environment variables for configuration. Copy `env.example` to `.env` and customize the values:

```bash
cp env.example .env
```

### Available Environment Variables

| Variable                  | Description                            | Default          | Example                                      |
| ------------------------- | -------------------------------------- | ---------------- | -------------------------------------------- |
| `NODE_ENV`                | Application environment                | `development`    | `development`, `production`, `test`          |
| `PORT`                    | Server port                            | `8101`           | `3000`, `8080`                               |
| `ALLOWED_ORIGINS`         | CORS allowed origins (comma-separated) | `*`              | `http://localhost:3000,https://example.com`  |
| `SECRET_KEY`              | Application secret key                 | (none)           | `your-secret-key-change-in-production`       |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit time window (milliseconds)  | `900000`         | `900000` (15 minutes)                        |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per time window           | `100`            | `200`, `50`                                  |
| `LOG_LEVEL`               | Morgan logging level                   | `combined`       | `combined`, `common`, `dev`, `short`, `tiny` |
| `APP_NAME`                | Application name                       | `AI Mock Server` | `My Custom Server`                           |
| `APP_VERSION`             | Application version                    | `1.0.0`          | `2.1.0`                                      |
| `MAX_FILE_SIZE`           | Maximum file upload size               | `10mb`           | `50mb`, `1gb`                                |

### Example .env file:

```env
NODE_ENV=development
PORT=8101
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
SECRET_KEY=my-secret-key-for-development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=combined
APP_NAME=AI Mock Server
APP_VERSION=1.0.0
MAX_FILE_SIZE=10mb
```

### Security Notes:

- Never commit `.env` files to version control
- Change `SECRET_KEY` in production environments
- Use restrictive `ALLOWED_ORIGINS` in production
- Adjust rate limiting based on your needs

## API Endpoints

### Core Endpoints

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/`      | Server information |

### Health Check Endpoints

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/health`          | Basic health check           |
| GET    | `/health/detailed` | Detailed system information  |
| GET    | `/health/ready`    | Readiness probe (Kubernetes) |
| GET    | `/health/live`     | Liveness probe (Kubernetes)  |

### User Management (CRUD)

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/:id` | Get user by ID  |
| POST   | `/api/users`     | Create new user |
| PUT    | `/api/users/:id` | Update user     |
| DELETE | `/api/users/:id` | Delete user     |

### Utility & Testing

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| ALL    | `/api/echo`           | Echo request details            |
| GET    | `/api/status`         | API status information          |
| GET    | `/api/mock-data`      | Sample mock data                |
| GET    | `/api/delay/:seconds` | Simulate response delay (0-10s) |
| GET    | `/api/random/:type`   | Generate random data            |

## Request Examples

### Get all users

```bash
curl http://localhost:8101/api/users
```

### Get user by ID

```bash
curl http://localhost:8101/api/users/1
```

### Create a new user

```bash
curl -X POST http://localhost:8101/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Update a user

```bash
curl -X PUT http://localhost:8101/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "email": "john.updated@example.com", "age": 31}'
```

### Delete a user

```bash
curl -X DELETE http://localhost:8101/api/users/1
```

### Health check

```bash
curl http://localhost:8101/health
```

### Generate random data

```bash
# Get 10 random numbers
curl http://localhost:8101/api/random/numbers?count=10

# Get 5 random names
curl http://localhost:8101/api/random/names?count=5

# Get random colors
curl http://localhost:8101/api/random/colors
```

### Test with delay

```bash
# 3 second delay
curl http://localhost:8101/api/delay/3
```

## Environment Variables

| Variable          | Description          | Default     |
| ----------------- | -------------------- | ----------- |
| `PORT`            | Server port          | 8101        |
| `NODE_ENV`        | Environment mode     | development |
| `ALLOWED_ORIGINS` | CORS allowed origins | \*          |

## Input Validation

The server includes comprehensive input validation for API endpoints:

- **User creation**: Validates name (3-30 chars), email format, and age (18-120)
- **User ID**: Validates positive integers for user lookup
- **Request size**: Limited to 10MB for security
- **Delay parameter**: Limited to 0-10 seconds
- **Random data count**: Limited to 1-100 items

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **Error Handling**: Comprehensive error responses

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (placeholder)
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run lint:check` - Run ESLint with zero warnings tolerance
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run code:check` - Run both ESLint and Prettier checks
- `npm run code:fix` - Fix both ESLint and Prettier issues

### Code Quality & Formatting

This project uses a comprehensive code quality setup:

#### ESLint (Code Quality)

- **Configuration**: Modern flat config format in `eslint.config.js`
- **Rules**: Tailored for Express.js and Node.js development
- **Purpose**: Catches bugs, enforces best practices
- **Documentation**: See [ESLINT_SETUP.md](ESLINT_SETUP.md)

#### Prettier (Code Formatting)

- **Configuration**: `.prettierrc.js` with Express.js optimized settings
- **Rules**: Consistent formatting (2 spaces, single quotes, semicolons)
- **Purpose**: Automatic code formatting and style consistency
- **Documentation**: See [PRETTIER_SETUP.md](PRETTIER_SETUP.md)

#### Git Hooks (Automated Quality)

- **Tool**: Husky + lint-staged for Git hook management
- **Pre-commit**: Runs ESLint and Prettier on staged files only
- **Pre-push**: Runs comprehensive code quality checks
- **Purpose**: Prevents bad code from entering the repository
- **Documentation**: See [GIT_HOOKS_SETUP.md](GIT_HOOKS_SETUP.md)

#### Integration

- **No Conflicts**: ESLint and Prettier work together seamlessly
- **Unified Commands**: Use `npm run code:fix` for comprehensive cleanup
- **Automatic Enforcement**: Git hooks ensure quality without manual intervention
- **Editor Support**: Works with VS Code, WebStorm, and other popular editors

**Development workflow:**

```bash
# The hooks handle quality automatically, but you can run manually:
npm run code:fix    # Fix both linting and formatting issues
npm run code:check  # Verify code quality and formatting

# Git operations trigger hooks automatically:
git commit -m "Your changes"  # Runs pre-commit hook (lint-staged)
git push                      # Runs pre-push hook (full code check)
```

### Project Structure

```
ai_mock_server/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── eslint.config.js       # ESLint configuration
├── .prettierrc.js         # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── .husky/                # Git hooks directory
│   ├── pre-commit         # Pre-commit hook script
│   └── pre-push           # Pre-push hook script
├── README.md             # This file
├── ESLINT_SETUP.md       # ESLint documentation
├── PRETTIER_SETUP.md     # Prettier documentation
├── GIT_HOOKS_SETUP.md    # Git hooks documentation
└── routes/               # Router modules
    ├── index.js          # Centralized router exports
    ├── users.js          # User management routes
    ├── util.js           # Utility and testing routes
    ├── ai-mock.js        # AI mock endpoints
    └── health.js         # Health check routes
```

### Router Organization

The application uses a modular router structure:

- **`routes/users.js`** - Complete CRUD operations for user management
- **`routes/util.js`** - Utility endpoints for testing and mock data
- **`routes/health.js`** - Health check and monitoring endpoints
- **`routes/index.js`** - Centralized exports for clean imports

## Error Handling

The server includes comprehensive error handling:

- **400 Bad Request**: Invalid input or malformed JSON
- **404 Not Found**: Route not found
- **413 Payload Too Large**: Request body exceeds limit
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC
