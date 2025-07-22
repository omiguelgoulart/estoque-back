import { z } from 'zod'

export const retiradaSchema = z.object({
  produtoId: z.string().uuid('ID do produto inválido'),
  usuarioId: z.string().uuid('ID do usuário inválido'),
  quantidade: z.number().positive('Quantidade deve ser maior que zero'),
})
