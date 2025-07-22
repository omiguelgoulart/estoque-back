import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function listarLogs(req: Request, res: Response) {
  try {
    const logs = await prisma.logMovimentacao.findMany({
      orderBy: { data: 'desc' },
      include: {
        produto: { select: { nome: true, unidade: true } },
        usuario: { select: { nome: true, email: true } },
      },
    })

    return res.json(logs)
  } catch (error) {
    console.error('[ERRO LISTAR LOGS]', error)
    return res.status(500).json({ erro: 'Erro ao listar movimentações.' })
  }
}
