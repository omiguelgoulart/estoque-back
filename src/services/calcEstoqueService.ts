import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Atualiza o estoque (entrada ou retirada)
export async function atualizarSaldoEstoque(produtoId: string, quantidade: number, tipo: 'increment' | 'decrement') {
  return prisma.produto.update({
    where: { id: produtoId },
    data: {
      estoqueAtual: {
        [tipo]: quantidade,
      },
    },
  })
}

// Calcula o consumo médio de um produto
export async function calcularConsumoMedio(produtoId: string): Promise<number> {
  const retiradas = await prisma.retiradaEstoque.findMany({
    where: { produtoId },
    orderBy: { data: 'desc' },
    take: 30, // últimos 30 registros
  })

  if (retiradas.length === 0) return 0

  const total = retiradas.reduce((soma, r) => soma + r.quantidade, 0)
  return total / retiradas.length
}
