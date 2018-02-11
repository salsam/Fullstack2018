const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({})
      response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
    if (!newBlog.likes) {
      newBlog.likes=0
    }
    const blog = await newBlog.save()
    response.status(200).json(blog)
  })

  module.exports = blogsRouter