import { Request, Response, NextFunction } from 'express'
import { HttpError } from './http-error'

export function handleError (err: HttpError | undefined, _req: Request, res: Response, _next: NextFunction): void {
  res.status(err?.statusCode ?? 500).json({
    message: 'Ocurrió un error',
    error: (err != null)
      ? {
          name: err.name,
          message: err.description,
          errors: err?.errors ?? {}
        }
      : null
  })
}
