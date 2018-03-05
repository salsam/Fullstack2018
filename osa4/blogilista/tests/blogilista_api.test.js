const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app, server)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingValidId, blogsInDb, usersInDb } = require('./test_helper')

afterAll(() => {
    server.close()
})

describe('when there is initially blogs in database', () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogs = initialBlogs.map(blog => new Blog(blog))
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
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('blogs returned by GET /api/blogs contain all initial blogs', async () => {
        const blogs = await blogsInDb()
        let match
        initialBlogs.forEach(initialBlog => {
            match = blogs.find(b => b.title === initialBlog.title && b.author === initialBlog.author)
            expect(match).not.toBeNull()
            expect(match.url).toBe(initialBlog.url)
            expect(match.likes).toBe(initialBlog.likes)
        })
    })
})

describe('test adding blogs to db', async () => {
    test('POST /api/blogs succeeds with valid data', async () => {
        const blogsBeforeOperation = await blogsInDb()

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

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1)
        expect(blogsAfterOperation.find(blog => (
            blog.author === newBlog.author &&
            blog.likes === newBlog.likes &&
            blog.title === newBlog.title &&
            blog.url === newBlog.url
        ))).not.toBeUndefined()
    })

    test('likes set to zero for valid blog if uninitialized for POST /api/blogs', async () => {
        const newBlog = {
            author: "likes initialized to zero",
            title: "likes initialized to zero",
            url: "likes initialized to zero"
        }

        await api.post('/api/blogs').send(newBlog)
        const blogsAfterOperation = await blogsInDb()
        const match = blogsAfterOperation.find(blog => (
            blog.author === newBlog.author
            && blog.author === newBlog.author
            && blog.title === newBlog.title
            && blog.url === newBlog.url
        ))


        Object.keys(newBlog).forEach(key => {
            expect(match.key).toBe(newBlog.key)
        })

        expect(match.likes).toBe(0)
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
        const validMissingId = await nonExistingValidId()
        const blogsBeforeOperation = await blogsInDb()

        await api
            .delete(`/api/blogs/${validMissingId}`)
            .expect(404)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })

    test('204 returned by successful DELETE to /api/blogs/id', async () => {
        const blogsBeforeOperation = await blogsInDb()


        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length - 1)
        expect(blogsAfterOperation).not.toContainEqual(addedBlog)
    })

    test('400 returned by DELETE /api/blogs/id to malformatted id', async () => {
        const blogsBeforeOperation = await blogsInDb()

        const res = await api
            .delete(`/api/blogs/xyz`)
            .expect(400)

        expect(res.body.error).toBe('malformatted id')

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })
})

describe('updating blogs', async () => {
    let addedBlog

    beforeEach(async () => {
        await Blog.remove({})
        addedBlog = new Blog({
            author: "will be updated by HTTP UPDATE",
            title: "will be updated by HTTP UPDATE",
            url: "will be updated by HTTP UPDATE"
        })
        await api.post('/api/blogs').send(addedBlog)
    })

    test('PUT /api/blogs/id updates likes', async () => {
        const blogsBeforeOperation = await blogsInDb()

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

        const blogsAfterOperation = await blogsInDb()
        await expect(blogsAfterOperation.find(blog => {
            (blog.author === addedBlog.author
                && blog.title === addedBlog.title
                && blog.url === addedBlog.url)
        })).toBeUndefined()

        expect(blogsAfterOperation.find(blog =>
            (blog.url === changedBlog.url && blog.title === changedBlog.title)).likes).toBe(42)
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })

    test('400 returned by PUT /api/blogs/id to malformatted id', async () => {
        const blogsBeforeOperation = await blogsInDb()

        const res = await api
            .put(`/api/blogs/xyzasd`)
            .send(addedBlog)
            .expect(400)

        expect(res.body.error).toBe('malformatted id')

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })

    test('404 returned by PUT /api/blogs/id to missing id', async () => {
        const validMissingId = await nonExistingValidId()
        const blogsBeforeOperation = await blogsInDb()

        await api
            .put(`/api/blogs/${validMissingId}`, addedBlog)
            .send(addedBlog)
            .expect(404)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })

    test('Comments can be added to exsiting blogs POST /api/blogs/id/comment', async () => {
        const blogsBeforeOperation = await blogsInDb()
        const comment = 'commenting works'

        await api.post(`/api/blogs/${addedBlog._id}/comment`)
            .send({ comment })
            .expect(200)


        const blogsAfterOperation = await blogsInDb()
        const updated = blogsAfterOperation.find(blog => blog.url === addedBlog.url)
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
        expect(updated).not.toBeNull()
        expect(JSON.stringify(updated.comments)).toEqual(JSON.stringify([comment]))
    })

    test('addding comments to non-existing blog POST /api/blogs/id/comment returns 404', async () => {
        const validMissingId = await nonExistingValidId()
        const blogsBeforeOperation = await blogsInDb()
        const comment = 'commenting works'

        await api
            .post(`/api/blogs/${validMissingId}/comment`)
            .send({ comment })
            .expect(404)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })

    test('400 returned by POST /api/blogs/id/comment to malformatted id', async () => {
        const blogsBeforeOperation = await blogsInDb()
        const comment = 'commenting works'

        const res = await api
            .post(`/api/blogs/xyzasd/comment`)
            .send({ comment })
            .expect(400)

        expect(res.body.error).toBe('malformatted id')

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    })
})

describe('Testing users with one user in db beforehand', async () => {
    beforeAll(async () => {
        await User.remove({})
        const testUser = new User({
            username: 'test user',
            name: 'tester',
            passwordHash: 'fh9afhhfhag',
            adult: true
        })
        await testUser.save()
    })

    test('POST /api/users fails with proper status code and message if username taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const takenUser = {
            username: 'test user',
            name: 'testah',
            password: 'testword',
            adult: true
        }

        const response = await api.post('/api/users')
            .send(takenUser)
            .expect(400)

        expect(response.body.error).toBe('Username must be unique.')
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails with proper status code and message if password too short', async () => {
        const usersBeforeOperation = await usersInDb()

        const tooShort = {
            username: 'too short pass',
            name: 'too short pass',
            password: 'lo',
            adult: true
        }

        const response = await api.post('/api/users')
            .send(tooShort)
            .expect(400)

        expect(response.body.error).toBe('Password must be at least 3 characters long!')
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users defaults to adult if not specified', async () => {
        const usersBeforeOperation = await usersInDb()

        const defaultToTrue = {
            username: 'adult defaults to true',
            name: 'adult defaults to true',
            password: 'adults defauts to true'
        }

        const response = await api.post('/api/users')
            .send(defaultToTrue)
            .expect(200)

        const usersAfterOperation = await usersInDb()
        const addedUser = await User.find({ username: defaultToTrue.username })
        expect(addedUser[0].adult).toBe(true)
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    })
})