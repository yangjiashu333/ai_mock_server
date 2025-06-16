import express, { Express, Request, Response } from 'express';
import http from 'http';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Placeholder for routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Global error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// A new comment to force a change
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
