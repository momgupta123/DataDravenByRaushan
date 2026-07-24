import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { signup, login } from '../controllers/authController.js';

const router: ExpressRouter = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
