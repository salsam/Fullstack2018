const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app, server)
const Blog = require('../models/blog')
const helper = require('./test_helper')

afterAll(() => {
    server.close()
})

describe('when there is initially blogs in database', () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogs = helper.initialBlogs.map(blog => new Blog(blog))
        const promises = blogs.map(blog => blog.save())
        await Promise.all(promises)
    })

    test('blogs are returned as json by GET /api/blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs is returned by GET /api/blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs returned by GET /api/blogs contain all initial blogs', async () => {
        const blogs = await helper.blogsInDB()
        helper.initialBlogs.forEach(initialBlog => {
            expect(blogs).toContainEqual(initialBlog)
        })
    })
})

describe('test adding blogs to db', async () => {
    test('POST /api/blogs succeeds with valid data', async () => {
        const notesBeforeOperation = await helper.blogsInDB()

        const newBlog = {
            author: "test adding valid blogs",
            likes: 42,
            title: "test adding valid blogs",
            url: "test adding valid blogs"
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length + 1)
        expect(notesAfterOperation).toContainEqual(newBlog)
    })

    test('likes set to zero for valid blog if uninitialized for POST /api/blogs', async () => {
        const newBlog = {
            author: "likes initialized to zero",
            title: "likes initialized to zero",
            url: "likes initialized to zero"
        }

        await api.post('/api/blogs').send(newBlog)
        const notesAfterOperation = await helper.blogsInDB()
        const match = notesAfterOperation.find(blog => (
            blog.author === newBlog.author
            && blog.author === newBlog.author
            && blog.title === newBlog.title
            && blog.url === newBlog.url
        ))

        expect(match).toEqual({
            author: "likes initialized to zero",
            title: "likes initialized to zero",
            url: "likes initialized to zero",
            likes: 0
        })
    })

    test('response status 400 for POST /api/blogs if no url set', async () => {
        const newBlog = {
            author: "no url set",
            title: "no url set",
            likes: 7
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('response status 400 for POST /api/blogs if no title set', async () => {
        const newBlog = {
            author: "missing title",
            url: "missing title",
            likes: 0
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deleting blogs', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            author: "deleted with HTTP DELETE",
            title: "deleted with HTTP DELETE",
            url: "deleted with HTTP DELETE"
        })
        await addedBlog.save()
    })

    test('404 returned by DELETE /api/blogs/id to valid missing id', async () => {
        const validMissingId = await helper.nonExistingValidId()
        const notesBeforeOperation = await helper.blogsInDB()

        await api
            .delete(`/api/blogs/${validMissingId}`)
            .expect(404)

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length)
    })

    test('204 returned by successful DELETE to /api/blogs/id', async () => {
        const notesBeforeOperation = await helper.blogsInDB()


        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length - 1)
        expect(notesAfterOperation).not.toContainEqual(addedBlog)
    })

    test('400 returned by DELETE /api/blogs/id to malformatted id', async () => {
        const notesBeforeOperation = await helper.blogsInDB()

        const res = await api
            .delete(`/api/blogs/xyz`)
            .expect(400)

        expect(res.body.error).toBe('malformatted id')

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length)
    })
})

describe('updating blogs', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            author: "will be updated by HTTP UPDATE",
            title: "will be updated by HTTP UPDATE",
            url: "will be updated by HTTP UPDATE"
        })
        await api.post('/api/blogs').send(addedBlog)
    })

    test('PUT /api/blogs/id updates likes', async () => {
        const notesBeforeOperation = await helper.blogsInDB()

        const changedBlog = {
            author: 'updated with HTTP UPDATE',
            title: 'updated with HTTP UPDATE',
            url: 'updated with HTTP UPDATE',
            likes: 42,
            id: addedBlog._id
        }

        const res = await api
            .put(`/api/blogs/${addedBlog._id}`, changedBlog)
            .send(changedBlog)
            .expect(200)

        const notesAfterOperation = await helper.blogsInDB()
        await expect(notesAfterOperation.find(blog => {
            (blog.author === addedBlog.author
                && blog.title === addedBlog.title
                && blog.url === addedBlog.url)
        })).toBeUndefined()

        expect(notesAfterOperation.find(blog => 
            (blog.url===changedBlog.url && blog.title===changedBlog.title)).likes).toBe(42)
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length)
    })

    test('400 returned by PUT /api/blogs/id to malformatted id', async () => {
        const notesBeforeOperation = await helper.blogsInDB()

        const res = await api
            .put(`/api/blogs/xyzasd`)
            .send(addedBlog)
            .expect(400)

        expect(res.body.error).toBe('malformatted id')

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length)
    })

    test('404 returned by PUT /api/blogs/id to missing id', async () => {
        const validMissingId = await helper.nonExistingValidId()
        const notesBeforeOperation = await helper.blogsInDB()

        await api
            .put(`/api/blogs/${validMissingId}`, addedBlog)
            .send(addedBlog)
            .expect(404)

        const notesAfterOperation = await helper.blogsInDB()
        expect(notesAfterOperation.length).toBe(notesBeforeOperation.length)
    })
})