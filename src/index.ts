import express from 'express'
import cors from 'cors'

import { handleError } from './middlewares/error-handler/error-handler'

import imagesRouter from './modules/images/images.controller'
import authRouter from './modules/auth/auth.controller'
import publicRouter from './modules/public/public.controller'

const app = express()
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3000

app.use('/images', imagesRouter)
app.use('/auth', authRouter)
app.use('/public', publicRouter)

app.use(handleError)

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`)
})
