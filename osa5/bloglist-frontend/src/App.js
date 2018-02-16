import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll()
      .then(blogs =>
        this.setState({ blogs })
      )

    const userLoggedIn = window.localStorage.getItem('loggedBlogUser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  create = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService.create(newBlog)
        .then(returnedBlog =>
          this.setState({ author: '', title: '', url: '', blogs: this.state.blogs.concat(returnedBlog) }))
    } catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser')
    this.setState({ user: null })
  }

  render() {
    console.log("render")
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username
          <input
              name='username'
              onChange={this.handleFieldChange}
              type='text'
              value={this.state.username}
            />
          </div>
          <div>
            password
          <input
              name='password'
              onChange={this.handleFieldChange}
              type='password'
              value={this.state.password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.map(blog => {
          return <Blog key={blog.title} blog={blog} />
        }
        )}
      </div>
    )

    const newBlogForm = () => (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={this.create}>
          <div>
            title
          <input
              name='title'
              onChange={this.handleFieldChange}
              type='text'
              value={this.state.title}
            />
          </div>
          <div>
            author
          <input
              name='author'
              onChange={this.handleFieldChange}
              type='text'
              value={this.state.author}
            />
          </div>
          <div>
            url
          <input
              name='url'
              onChange={this.handleFieldChange}
              type='text'
              value={this.state.url}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>Logged in as {this.state.user.name}
              <button onClick={this.logout}>Logout</button>
            </p>
            {blogForm()}
            {newBlogForm()}
          </div>}
      </div>
    )
  }
}

export default App
