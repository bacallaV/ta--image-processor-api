import express from 'express'
import imagesRouter from './modules/images/images.controller'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.use('/images', imagesRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`)
})
