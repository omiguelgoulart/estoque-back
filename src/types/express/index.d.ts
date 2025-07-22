import { Cargo } from '@prisma/client'

declare namespace Express {
  export interface Request {
    user?: {
      id: string
      cargo: Cargo
    }
  }
}
