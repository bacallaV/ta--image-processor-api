import express from 'express'

import { Auth } from '@app/middlewares/auth'

import * as imagesService from './images.service'
import { HttpError, HttpStatusCode } from '@app/middlewares/error-handler/http-error'

const imagesRouter = express.Router()

imagesRouter.get('/', Auth, async (_req, res, next) => {
  try {
    const records = await imagesService.getAll()

    res.json({
      message: 'Success',
      data: records
    })
  } catch (error) {
    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Error getting images'))
  }
})

export default imagesRouter
