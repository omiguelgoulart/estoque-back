import { Router } from 'express'
import { registrarRetirada, listarRetiradas, atualizarRetirada, deletarRetirada } from '@/controllers/estoque/retiradaController'

const router = Router()

router.post('/', registrarRetirada)
router.get('/', listarRetiradas)
router.patch('/:id', atualizarRetirada)
router.delete('/:id', deletarRetirada)

export default router