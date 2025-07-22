import { Request, Response } from 'express'
import { PrismaClient, Unidade } from '@prisma/client'
import { produtoSchema } from '@/schemas/produtoSchema'

const prisma = new PrismaClient()

// ✅ Criar produto
export async function criarProduto(req: Request, res: Response) {
  const parse = produtoSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { nome, unidade } = parse.data

  try {
    const produto = await prisma.produto.create({
      data: {
        nome,
        unidade: unidade as Unidade,
      },
    })

    return res.status(201).json(produto)
  } catch (error) {
    console.error('[ERRO CRIAR PRODUTO]', error)
    return res.status(500).json({ erro: 'Erro ao criar produto.' })
  }
}

// ✅ Listar produtos
export async function listarProdutos(req: Request, res: Response) {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { nome: 'asc' },
    })

    return res.json(produtos)
  } catch (error) {
    console.error('[ERRO LISTAR PRODUTOS]', error)
    return res.status(500).json({ erro: 'Erro ao listar produtos.' })
  }
}
// ✅ Atualizar produto
export async function atualizarProduto(req: Request, res: Response) {
  const { id } = req.params
  const parse = produtoSchema.safeParse(req.body)

  if (!parse.success) {
    return res.status(400).json({ erros: parse.error.format() })
  }

  const { nome, unidade } = parse.data

  try {
    const produto = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        unidade: unidade as Unidade,
      },
    })

    return res.json(produto)
  } catch (error) {
    console.error('[ERRO ATUALIZAR PRODUTO]', error)
    return res.status(500).json({ erro: 'Erro ao atualizar produto.' })
  }
}

// ✅ Deletar produto
export async function deletarProduto(req: Request, res: Response) {
  const { id } = req.params

  try {
    await prisma.produto.delete({
      where: { id },
    })

    return res.status(204).send()
  } catch (error) {
    console.error('[ERRO DELETAR PRODUTO]', error)
    return res.status(500).json({ erro: 'Erro ao deletar produto.' })
  }
}