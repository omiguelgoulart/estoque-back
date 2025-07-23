import express from 'express'
import cors from 'cors'

import authRoutes from './src/routes/auth/authRoutes'
import usuarioRoutes from './src/routes/usuario/usuarioRoutes'
import produtoRoutes from './src/routes/produto/produtoRoutes'
import entradaRoutes from './src/routes/estoque/entradaRoutes'
import retiradaRoutes from './src/routes/estoque/retiradaRoutes'
import logRoutes from './src/routes/estoque/logRoutes'
import { errorHandler } from './src/middlewares/errorHandler'


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