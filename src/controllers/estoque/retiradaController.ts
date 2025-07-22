import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { retiradaSchema } from '@/schemas/retiradaSchema'

const prisma = new PrismaClient()

export async function registrarRetirada(req: Request, res: Response) {
  const parse = retiradaSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { produtoId, usuarioId, quantidade } = parse.data

  try {
    // Verifica se há estoque suficiente
    const produto = await prisma.produto.findUnique({ where: { id: produtoId } })
    if (!produto || produto.estoqueAtual < quantidade) {
      return res.status(400).json({ erro: 'Estoque insuficiente para retirada.' })
    }

    const retirada = await prisma.retiradaEstoque.create({
      data: {
        produtoId,
        usuarioId,
        quantidade,
      },
    })

    // Atualiza estoque
    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        estoqueAtual: {
          decrement: quantidade,
        },
      },
    })

    // Log de movimentação
    await prisma.logMovimentacao.create({
      data: {
        produtoId,
        usuarioId,
        quantidade,
        tipo: 'RETIRADA',
      },
    })

    return res.status(201).json({ retirada })
  } catch (error) {
    console.error('[ERRO RETIRADA ESTOQUE]', error)
    return res.status(500).json({ erro: 'Erro ao registrar retirada de estoque.' })
  }
}
export async function listarRetiradas(req: Request, res: Response) {
  try {
    const retiradas = await prisma.retiradaEstoque.findMany({
      include: {
        produto: true,
        usuario: true,
      },
      orderBy: { data: 'desc' },
    })

    return res.json(retiradas)
  } catch (error) {
    console.error('[ERRO LISTAR RETIRADAS]', error)
    return res.status(500).json({ erro: 'Erro ao listar retiradas de estoque.' })
  }
}

export async function deletarRetirada(req: Request, res: Response) {
  const { id } = req.params

  try {
    const retirada = await prisma.retiradaEstoque.delete({
      where: { id },
    })

    // Atualiza o estoque atual do produto
    await prisma.produto.update({
      where: { id: retirada.produtoId },
      data: {
        estoqueAtual: {
          increment: retirada.quantidade,
        },
      },
    })

    return res.status(200).json({ mensagem: 'Retirada deletada com sucesso.' })
  } catch (error) {
    console.error('[ERRO DELETAR RETIRADA]', error)
    return res.status(500).json({ erro: 'Erro ao deletar retirada de estoque.' })
  }
}

export async function atualizarRetirada(req: Request, res: Response) {
  const { id } = req.params
  const parse = retiradaSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { produtoId, usuarioId, quantidade } = parse.data

  try {
    // Verifica se a retirada existe
    const retiradaExistente = await prisma.retiradaEstoque.findUnique({ where: { id } })
    if (!retiradaExistente) {
      return res.status(404).json({ erro: 'Retirada não encontrada.' })
    }

    // Atualiza a retirada
    const retiradaAtualizada = await prisma.retiradaEstoque.update({
      where: { id },
      data: {
        produtoId,
        usuarioId,
        quantidade,
      },
    })

    // Atualiza o estoque do produto
    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        estoqueAtual: {
          increment: retiradaExistente.quantidade - quantidade,
        },
      },
    })

    return res.json(retiradaAtualizada)
  } catch (error) {
    console.error('[ERRO ATUALIZAR RETIRADA]', error)
    return res.status(500).json({ erro: 'Erro ao atualizar retirada de estoque.' })
  }
}