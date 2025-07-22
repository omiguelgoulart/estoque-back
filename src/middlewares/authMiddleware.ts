

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: string
  cargo: 'ADMIN' | 'ESTOQUISTA'
  iat: number
  exp: number
}

// Extende o tipo Request para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        cargo: 'ADMIN' | 'ESTOQUISTA'
      }
    }
  }
}

export function autenticarJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload

    // Anexa as infos do usuário autenticado à request
    req.user = {
      id: decoded.id,
      cargo: decoded.cargo,
    }

    return next()
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' })
  }
}
