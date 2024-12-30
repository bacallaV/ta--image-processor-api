import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function Auth (req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]
  if (token === undefined) {
    res.status(401).json('Unauthorized')
    return
  }

  const jwtPayload = jwt.verify(token, process.env.JWT_KEY ?? '')

  if (jwtPayload === '') {
    res.status(403).json('Invalid token')
    return
  }

  next()
}
