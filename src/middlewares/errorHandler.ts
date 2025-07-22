import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('[ERRO INTERNO]', err)

  const status = err.status || 500
  const message = err.message || 'Erro interno do servidor.'

  res.status(status).json({ erro: message })
}
