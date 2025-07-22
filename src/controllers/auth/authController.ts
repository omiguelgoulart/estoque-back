import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' })
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } })

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta.' })
    }

    const token = jwt.sign(
      { id: usuario.id, cargo: usuario.cargo },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: 'Erro interno no login.' })
  }
}
