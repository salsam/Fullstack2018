import React from 'react'
import { Button, Form } from 'semantic-ui-react'

let count = 1

const genId = () => {
  count += 1
  return count - 1
}
const SingleBlogView = ({ blog, like, remove, deletable, comment, history }) => {
  const adder = blog.user ? blog.user.name : 'anonymous'
  const handleSubmit = (e) => {
    e.preventDefault()
    comment(e.target.comment.value)
    e.target.comment.value = ''
  }
  return (
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div className='content'>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <Button onClick={like}>like</Button>
        </div>
        <div>
          added by {adder}
        </div>
        {deletable && <div><Button onClick={() => { remove(); history.push('/') }}>delete</Button></div>}
      </div>
      <h2>comments</h2>
      <ul>
        {blog.comments.map(comment =>
          <li key={genId()}>{comment}</li>)}
      </ul>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input name="comment" />
          <Button type='submit'>add comment</Button>
        </Form.Field>
      </Form>
    </div>
  )
}

export default SingleBlogView