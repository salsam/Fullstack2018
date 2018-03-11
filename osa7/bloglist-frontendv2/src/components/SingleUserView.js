//@flow
import React from 'react'
import type { Blog, User } from '../flowtypes'

type funcArg = {user: User};
const SingleUserView = ({ user }: funcArg) => {
  if (!user) return <div></div>
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs </h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog._id}>{blog.title} by {blog.author}</li>
        )}
      </ul>
    </div>
  )
}

export default SingleUserView