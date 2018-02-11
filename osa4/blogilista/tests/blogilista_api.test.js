const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app, server)
const Blog = require('../models/blog')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeAll(async () => {
    await Blog.remove({})

    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
})

afterAll(() => {
    server.close()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('returned blogs contains all initial blogs', async () => {
    const response = await api.get('/api/blogs')

    initialBlogs.forEach(initialBlog => {
        expect(response.body).toContainEqual(initialBlog)
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        __v: 0,
        _id: "5a806b77aae20e63a60664af",
        author: "testauthor",
        likes: 42,
        title: "testitle",
        url: "testurl"
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(response.body).toContainEqual(newBlog)
})

test('likes set to zero for new blogs if uninitialized', async () => {
    const newBlog = {
        __v: 0,
        _id: "5a806b77aae20e63a60664af",
        author: "testauthor",
        title: "testitle",
        url: "testurl"
    }

    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    const match = response.body.find(blog => blog._id === newBlog._id)

    expect(match).toEqual({
        __v: 0,
        _id: "5a806b77aae20e63a60664af",
        author: "testauthor",
        title: "testitle",
        url: "testurl",
        likes: 0
    })
})