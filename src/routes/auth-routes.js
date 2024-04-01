import { Router } from 'express'
import {
	handleRegister,
	handleLogin,
	handleRefreshToken,
} from '../controllers/auth-controller.js'

const authRouter = Router()

authRouter.post('/register', handleRegister)
authRouter.post('/login', handleLogin)
authRouter.get('/refresh', handleRefreshToken)

export default authRouter
