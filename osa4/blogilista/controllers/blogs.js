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

    if (!request.body.likes) {
      request.body['likes']=0
    }
    const newBlog = new Blog(request.body)
    const blog = await newBlog.save()
    response.status(200).json(blog)
  })

  module.exports = blogsRouter