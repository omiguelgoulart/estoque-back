import { PrismaClient, Cargo } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { usuarioSchema } from '@/schemas/usuarioSchema'
import { validaSenha } from '@/utils/validaSenha'

const prisma = new PrismaClient()

// ✅ Criar usuário com validação Zod + validação de senha externa
export async function criarUsuario(req: Request, res: Response) {
  const parse = usuarioSchema.safeParse(req.body)

  if (!parse.success) {
    const erros = parse.error.format()
    return res.status(400).json({ erros })
  }

  const { nome, email, senha, cargo } = parse.data

  const senhaValida = validaSenha(senha)
  if (senhaValida !== true) {
    return res.status(400).json({ erro: senhaValida })
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        cargo: cargo as Cargo,
      },
    })

    return res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      cargo: novoUsuario.cargo,
    })
  } catch (error) {
    console.error('[ERRO CRIAR USUÁRIO]', error)
    return res.status(500).json({ erro: 'Erro ao criar usuário.' })
  }
}

// ✅ Listar usuários (sem mostrar senha)
export async function listarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
        criadoEm: true,
      },
    })

    return res.json(usuarios)
  } catch (error) {
    console.error('[ERRO LISTAR USUÁRIOS]', error)
    return res.status(500).json({ erro: 'Erro ao listar usuários.' })
  }
}
