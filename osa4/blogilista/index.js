const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const config = require('./utils/config')
const tokenExtractor = require('./controllers/middleware')

app.use(cors())
app.use(bodyParser.json())
app.use(tokenExtractor)

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}