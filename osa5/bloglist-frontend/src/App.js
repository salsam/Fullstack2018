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
      error: ''
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

  handleLoginFieldChange = (event) => {
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
              onChange={this.handleLoginFieldChange}
              type='text'
              value={this.state.username}
            />
          </div>
          <div>
            password
          <input
              name='password'
              onChange={this.handleLoginFieldChange}
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
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
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
          </div>}
      </div>
    )
  }
}

export default App
