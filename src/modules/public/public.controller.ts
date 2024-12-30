import express from 'express'
import path from 'path'

const publicRouter = express.Router()

publicRouter.use('/:filename', async (req, res) => {
  const filename = req.params.filename

  const imagePath = path.join(__dirname, '..', '..', '..', 'public', filename)

  res.sendFile(imagePath)
})

export default publicRouter
