import express from 'express'

import * as authService from './auth.service'
import { HttpError, HttpStatusCode } from '@app/middlewares/error-handler/http-error'

const authRouter = express.Router()

authRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const record = await authService.create({ username, password })

    res.json({
      message: 'Success',
      data: record
    })
  } catch (error) {
    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Could not create user'))
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const token = await authService.login(username, password)

    res.json({
      message: 'Success',
      data: token
    })
  } catch (error) {
    next(error)
  }
})

export default authRouter
