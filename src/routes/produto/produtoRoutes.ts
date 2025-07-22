import { Router } from 'express'
import {
  criarProduto, listarProdutos, atualizarProduto, deletarProduto } from '@/controllers/produto/produtoController'

const router  = Router()

router.post('/', criarProduto)
router.get('/', listarProdutos)
router.patch('/:id', atualizarProduto)
router.delete('/:id', deletarProduto)

export default router
