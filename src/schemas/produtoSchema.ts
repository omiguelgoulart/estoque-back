import { z } from 'zod'

export const produtoSchema = z.object({
  nome: z.string().min(2, 'Nome do produto é obrigatório'),
  unidade: z.enum(['UNIDADE', 'LITRO', 'GRAMA'], 'Unidade é obrigatória'),
})
