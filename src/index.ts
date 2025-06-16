import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import routes from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// Global error handler
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
