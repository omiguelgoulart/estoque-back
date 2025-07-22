import { z } from 'zod'

export const usuarioSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  cargo: z.enum(['ADMIN', 'ESTOQUISTA']),
})
