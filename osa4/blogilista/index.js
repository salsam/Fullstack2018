//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://fullstack:sekred@ds223578.mlab.com:23578/fullstack-notes'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use('/api/blogs', blogsRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})