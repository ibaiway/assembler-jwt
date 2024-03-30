import { Router } from 'express'
import { handleRegister, handleLogin } from '../controllers/auth-controller.js'

const authRouter = Router()

authRouter.post('/register', handleRegister)
authRouter.post('/login', handleLogin)

export default authRouter
