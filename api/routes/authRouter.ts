import express from 'express';
import { loginUser, registerUser, getUser } from '../controllers/authController.ts';
import { authenticateToken } from '../utils/helpers.ts';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/user', authenticateToken, getUser);

export default authRouter;