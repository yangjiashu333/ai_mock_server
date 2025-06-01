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

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Or start the production server:
```bash
npm start
```

The server will be running at `http://localhost:8101`

## API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server information |

### Health Check Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/health/detailed` | Detailed system information |
| GET | `/health/ready` | Readiness probe (Kubernetes) |
| GET | `/health/live` | Liveness probe (Kubernetes) |

### User Management (CRUD)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Utility & Testing

| Method | Endpoint | Description |
|--------|----------|-------------|
| ALL | `/api/echo` | Echo request details |
| GET | `/api/status` | API status information |
| GET | `/api/mock-data` | Sample mock data |
| GET | `/api/delay/:seconds` | Simulate response delay (0-10s) |
| GET | `/api/random/:type` | Generate random data |

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

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8101 |
| `NODE_ENV` | Environment mode | development |
| `ALLOWED_ORIGINS` | CORS allowed origins | * |

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

### Project Structure

```
ai_mock_server/
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
├── README.md          # This file
└── routes/            # Router modules
    ├── index.js       # Centralized router exports
    ├── users.js       # User management routes
    ├── api.js         # Utility and testing routes
    └── health.js      # Health check routes
```

### Router Organization

The application uses a modular router structure:

- **`routes/users.js`** - Complete CRUD operations for user management
- **`routes/api.js`** - Utility endpoints for testing and mock data
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