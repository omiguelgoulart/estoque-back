import { login } from '@/controllers/auth/authController'
import { Router } from 'express'

const router = Router()

// Login
router.post('/', login)

export default router
