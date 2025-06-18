import { Router, Request, Response } from 'express';
import { chunk } from 'lodash';

const router = Router();

router.get('/chunk', (req: Request, res: Response) => {
  const arr = ['a', 'b', 'c', 'd'];
  const result = chunk(arr, 3);
  res.json(result);
});

export default router;
