import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('GET ping request')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`)
})
