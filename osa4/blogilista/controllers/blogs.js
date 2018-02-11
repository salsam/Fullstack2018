const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.url || !request.body.title) {
    return response.status(400).end()
  }
  try {
    if (!request.body.likes) {
      request.body['likes'] = 0
    }
    const newBlog = new Blog(request.body)
    const blog = await newBlog.save()
    response.status(200).json(blog)
  } catch (exception) {
    response.status(400).send({ error: exception.toString() }).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
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