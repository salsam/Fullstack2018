import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogView = ({ blogs, user, like, remove }) => {
    return (
        <div>
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

export default BlogView