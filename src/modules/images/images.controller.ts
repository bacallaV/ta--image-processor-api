import express from 'express'

import { Auth } from '@app/middlewares/auth'

import * as imagesService from './images.service'
import { HttpError, HttpStatusCode } from '@app/middlewares/error-handler/http-error'
import { upload } from '@app/middlewares/multer'
import { uploadImageValidator } from './images.validator'
import { validationResult } from 'express-validator'

const imagesRouter = express.Router()

imagesRouter.get('/', Auth, async (_req, res, next) => {
  try {
    const records = await imagesService.getAll()

    res.json({
      message: 'Success',
      data: records
    })
  } catch (error) {
    if (error instanceof HttpError) {
      next(error)
    }

    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Error getting images'))
  }
})

imagesRouter.post('/resize', Auth, upload.single('image'), uploadImageValidator(), async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR', 'Invalid parameters', validationErrors.mapped())
    }

    const { width, height } = req.body

    if (req.file === undefined) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR', 'Missing file')
    }

    const record = await imagesService.resize(req.file, width, height)

    res.json({
      message: 'Success',
      data: record
    })
  } catch (error) {
    if (error instanceof HttpError) {
      next(error)
    }

    next(new HttpError(HttpStatusCode.INTERNAL_SERVER, 'INTERNAL_SERVER_ERROR', 'Error resizing image'))
  }
})

export default imagesRouter
