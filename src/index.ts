import express from 'express'
import imagesRouter from './modules/images/images.controller'
import authRouter from './modules/auth/auth.controller'
import { handleError } from './middlewares/error-handler/error-handler'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3000

app.use('/images', imagesRouter)
app.use('/auth', authRouter)

app.use(handleError)

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`)
})
