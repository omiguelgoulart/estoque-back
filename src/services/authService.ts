import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: string
  cargo: 'ADMIN' | 'ESTOQUISTA'
}

export function gerarToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  })
}

export function verificarToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload
}
