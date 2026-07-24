import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { getSales } from '../controllers/salesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router: ExpressRouter = Router();

router.get('/', authMiddleware, getSales);

export default router;
