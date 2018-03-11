import React from 'react'
import Blog from './Blog'

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