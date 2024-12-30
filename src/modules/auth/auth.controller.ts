import express from 'express'
import { validationResult } from 'express-validator'

import { HttpError, HttpStatusCode } from '@app/middlewares/error-handler/http-error'

import * as authService from './auth.service'
import { userValidator } from './auth.validator'

const authRouter = express.Router()

authRouter.post('/', userValidator(), async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR', 'Invalid parameters', validationErrors.mapped())
    }

    const { username, password } = req.body

    const record = await authService.create({ username, password })

    res.json({
      message: 'Success',
      data: record
    })
  } catch (error) {
    if (error instanceof HttpError) {
      next(error)
    }

    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Could not create user'))
  }
})

authRouter.post('/login', userValidator(), async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR', 'Invalid parameters', validationErrors.mapped())
    }

    const { username, password } = req.body

    const token = await authService.login(username, password)

    res.json({
      message: 'Success',
      data: token
    })
  } catch (error) {
    if (error instanceof HttpError) {
      next(error)
    }

    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Could not login'))
  }
})

export default authRouter
