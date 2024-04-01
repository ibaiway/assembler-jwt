import { Router } from 'express'
import {
	handleRegister,
	handleLogin,
	handleRefreshToken,
	handleLogout,
} from '../controllers/auth-controller.js'

const authRouter = Router()

authRouter.post('/register', handleRegister)
authRouter.post('/login', handleLogin)
authRouter.get('/refresh', handleRefreshToken)
authRouter.get('/logout', handleLogout)

export default authRouter
