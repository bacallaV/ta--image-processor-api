import { Request, Response, NextFunction } from 'express'
import { HttpError } from './http-error'

export function handleError (err: HttpError, _req: Request, res: Response, _next: NextFunction): void {
  res.status(err.statusCode).json({
    message: 'Ocurrió un error',
    error: {
      name: err.name,
      message: err.description
    }
  })
}
