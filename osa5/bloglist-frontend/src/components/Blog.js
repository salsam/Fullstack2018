import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsOn: false,
      blog: props.blog,
      updateBlogs: props.updateBlogs,
      handleDelete: props.handleDelete
    }
  }

  toggleDetails = () => {
    this.setState({ detailsOn: !this.state.detailsOn })
  }

  likeBlog = async () => {
    const blog = this.state.blog
    const newBlog = {
      '_id': blog._id,
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
      'user': blog.user,
    }

    await blogService.update(blog._id, newBlog)
    this.setState({ blog: newBlog })
    this.state.updateBlogs()
  }

  handleDelete = async () => {
    const blog = this.state.blog
    const response = await blogService.remove(blog._id)
    this.state.handleDelete(blog._id)
  }

  render() {
    const showWhenDetailsOn = { display: this.state.detailsOn ? '' : 'none' }
    const showWhenDetailsOff = { display: this.state.detailsOn ? 'none' : '' }
    const addedBy = this.state.blog.user === undefined ? 'unknown' : this.state.blog.user.name

    const blogStyle = {
      color: 'blue',
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div>
        <div style={Object.assign({}, blogStyle, showWhenDetailsOff)} onClick={this.toggleDetails}>
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={Object.assign({}, blogStyle, showWhenDetailsOn)}>
          <h3 onClick={this.toggleDetails}>{this.state.blog.title} {this.state.blog.author}</h3>
          <div>{this.state.blog.url}</div>
          <div>likes {this.state.blog.likes}
            <button onClick={this.likeBlog}>like</button>
          </div>

          <div>added by {addedBy}</div>
          <button onClick={this.handleDelete}>delete</button>
        </div>
      </div>
    )
  }
}

export default Blog