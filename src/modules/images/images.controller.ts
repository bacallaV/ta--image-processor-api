import express from 'express'

import * as imagesService from './images.service'

const imagesRouter = express.Router()

imagesRouter.get('/', async (req, res) => {
  try {
    const records = await imagesService.getAll()

    res.json(records)
  } catch (error) {
    res.json({
      status: 500,
      error: 'Error getting images'
    })
  }
})

export default imagesRouter
