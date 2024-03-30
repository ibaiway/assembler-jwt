import { Router } from 'express';
import { handleRegister } from '../controllers/auth-controller.js'

const authRouter = Router();

authRouter.post('/register', handleRegister);

export default authRouter