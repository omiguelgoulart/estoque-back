import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { entradaSchema } from '@/schemas/entradaSchema'

const prisma = new PrismaClient()

export async function registrarEntrada(req: Request, res: Response) {
  const parse = entradaSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { produtoId, usuarioId, quantidade } = parse.data

  try {
    const entrada = await prisma.entradaEstoque.create({
      data: {
        produtoId,
        usuarioId,
        quantidade,
      },
    })

    // Atualiza o estoque atual do produto
    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        estoqueAtual: {
          increment: quantidade,
        },
      },
    })

    // Registra log de movimentação
    await prisma.logMovimentacao.create({
      data: {
        produtoId,
        usuarioId,
        quantidade,
        tipo: 'ENTRADA',
      },
    })

    return res.status(201).json({ entrada })
  } catch (error) {
    console.error('[ERRO ENTRADA ESTOQUE]', error)
    return res.status(500).json({ erro: 'Erro ao registrar entrada de estoque.' })
  }
}
export async function listarEntradas(req: Request, res: Response) {
  try {
    const entradas = await prisma.entradaEstoque.findMany({
      include: {
        produto: true,
        usuario: true,
      },
      orderBy: { data: 'desc' },
    })

    return res.json(entradas)
  } catch (error) {
    console.error('[ERRO LISTAR ENTRADAS]', error)
    return res.status(500).json({ erro: 'Erro ao listar entradas de estoque.' })
  }
}

export async function deletarEntrada(req: Request, res: Response) {
  const { id } = req.params

  try {
    const entrada = await prisma.entradaEstoque.delete({
      where: { id },
    })

    // Atualiza o estoque atual do produto
    await prisma.produto.update({
      where: { id: entrada.produtoId },
      data: {
        estoqueAtual: {
          decrement: entrada.quantidade,
        },
      },
    })

    return res.json({ mensagem: 'Entrada de estoque deletada com sucesso.' })
  } catch (error) {
    console.error('[ERRO DELETAR ENTRADA]', error)
    return res.status(500).json({ erro: 'Erro ao deletar entrada de estoque.' })
  }
}

export async function atualizarEntrada(req: Request, res: Response) {
  const { id } = req.params
  const parse = entradaSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { produtoId, usuarioId, quantidade } = parse.data

  try {
    const entrada = await prisma.entradaEstoque.update({
      where: { id },
      data: {
        produtoId,
        usuarioId,
        quantidade,
      },
    })

    // Atualiza o estoque atual do produto
    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        estoqueAtual: {
          increment: quantidade,
        },
      },
    })

    return res.json(entrada)
  } catch (error) {
    console.error('[ERRO ATUALIZAR ENTRADA]', error)
    return res.status(500).json({ erro: 'Erro ao atualizar entrada de estoque.' })
  }
}
