import { Router } from 'express';
import { deleteMe } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const userRouter = Router();

userRouter.delete('/me', requireAuth, deleteMe);
