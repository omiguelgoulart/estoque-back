import { Router } from 'express'
import { criarUsuario, listarUsuarios } from '@/controllers/usuario/usuarioController'
import { autenticarJWT } from '@/middlewares/authMiddleware'

const router = Router()

// Middleware para autenticação JWT
router.use(autenticarJWT)

// Criar novo usuário (apenas admin deveria ter acesso, ideal usar middleware depois)
router.post('/', criarUsuario)

// Listar usuários
router.get('/', listarUsuarios)

export default router
