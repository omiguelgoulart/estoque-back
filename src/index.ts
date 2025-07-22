import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from '@/routes/auth/authRoutes'
import usuarioRoutes from '@/routes/usuario/usuarioRoutes'
import produtoRoutes from '@/routes/produto/produtoRoutes'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rotas
app.use('/login', authRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/produtos', produtoRoutes)

//Rota raiz
app.get('/', (req, res) => {
    res.send('API de Estoque - Backend')
    })

// Porta
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})
