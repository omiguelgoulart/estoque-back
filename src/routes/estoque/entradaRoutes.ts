import { Router } from 'express'
import { registrarEntrada, listarEntradas, atualizarEntrada, deletarEntrada } from '@/controllers/estoque/entradaController'

const router = Router()

router.post('/', registrarEntrada)
router.get('/', listarEntradas)
router.patch('/:id', atualizarEntrada)
router.delete('/:id', deletarEntrada)

export default router