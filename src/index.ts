import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from '@/routes/auth/authRoutes'
import usuarioRoutes from '@/routes/usuario/usuarioRoutes'
import produtoRoutes from '@/routes/produto/produtoRoutes'
import entradaRoutes from '@/routes/estoque/entradaRoutes'
import retiradaRoutes from '@/routes/estoque/retiradaRoutes'
import logRoutes from '@/routes/estoque/logRoutes'
import { errorHandler } from '@/middlewares/errorHandler'

dotenv.config()

const app = express()

// Middlewares globais
app.use(cors())
app.use(express.json())

// Rotas principais
app.use('/login', authRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/produtos', produtoRoutes)
app.use('/estoque/entradas', entradaRoutes)
app.use('/estoque/retiradas', retiradaRoutes)
app.use('/estoque/logs', logRoutes)

// Rota raiz
app.get('/', (req, res) => {
  res.send('API de Estoque - Backend')
})

// Middleware global de erros (sempre por último)
app.use(errorHandler)

// Inicialização do servidor
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})

export default app