import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import helmet from 'helmet';
import routes from './routes';
import logger from './logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: process.env.CORS_METHODS?.split(',') || ['GET', 'POST'],
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') || [
    'Content-Type',
  ],
  credentials: process.env.CORS_CREDENTIALS === 'true',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  logger.error(
    `[${new Date().toISOString()}] Error: ${err.message}\nStack: ${err.stack}`,
  );
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

app.use(errorHandler);

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
