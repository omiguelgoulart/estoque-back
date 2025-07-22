import { Router } from 'express'
import { criarUsuario, listarUsuarios } from '@/controllers/usuario/usuarioController'

const router = Router()

// Criar novo usuário (apenas admin deveria ter acesso, ideal usar middleware depois)
router.post('/', criarUsuario)

// Listar usuários
router.get('/', listarUsuarios)

export default router
