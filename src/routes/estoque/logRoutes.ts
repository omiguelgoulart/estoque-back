import { Router } from 'express'
import { listarLogs } from '@/controllers/estoque/logController'

const router = Router()

router.get('/', listarLogs)

export default router
