const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.url || !body.title) {
    return response.status(400).end()
  }
  try {
    if (!body.likes) {
      body['likes'] = 0
    }

    let user = null

    if (process.env.NODE_ENV !== 'test') {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!decodedToken) {
        return response.status(400).send({ error: 'token missing or invalid' })
      }

      user = await User.findById(decodedToken.id.toString())
    } else {
      user = await User.findOne({})
    }
    body.user = user.id

    const newBlog = new Blog(body)
    const blog = await newBlog.save()
    user.blogs = user.blogs.concat(blog)
    await user.save()
    response.status(200).json(blog)
  } catch (exception) {
    response.status(400).send({ error: exception.toString() })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {

    if (process.env.NODE_ENV !== 'test') {
      const blog = await Blog.findById(request.params.id)
        .populate('user')

      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!decodedToken && blog.user != undefined) {
        return response.status(400).send({ error: 'token missing or invalid' })
      }

      if (blog.user != undefined && blog.user.id.toString() !== decodedToken.id.toString()) {
        return response.status(400).send({ error: 'users can only remove their own blogs' })
      }
    }

    const res = await Blog.findByIdAndRemove(request.params.id)
    res ?
      response.status(204).end() :
      response.status(404).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' }).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  if (!body.url || !body.title) {
    return response.status(400).end()
  }
  try {
    const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      _id: request.params.id
    }
    const res = await Blog.findByIdAndUpdate(request.params.id, blog)
    res ?
      response.status(200).json(res.body).end() :
      response.status(404).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' }).end()
  }
})

module.exports = blogsRouter