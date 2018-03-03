import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const blogView = (blogs, user, logout, like, remove) => {
    return (
        <div>
            <Togglable buttonLabel='uusi blogi'>
                <BlogForm />
            </Togglable>

            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog
                    key={blog._id}
                    blog={blog}
                    like={like(blog)}
                    remove={remove(blog._id)}
                    deletable={blog.user === undefined || blog.user.username === user.username}
                />
            )}
        </div>
    );
}

export default blogView