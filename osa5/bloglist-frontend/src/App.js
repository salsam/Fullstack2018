import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Togglable from './components/Togglable'
import newBlogForm from './components/newBlogForm'
import loginForm from './components/loginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: '',
      notification: '',
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
          this.setState({
            author: '', title: '', url: '', blogs: this.state.blogs.concat(returnedBlog),
            notification: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          }))
        .then(() => {
          setTimeout(() => {
            this.setState({ notification: '' })
          }, 5000)
        })
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
      this.setState({
        notification: `Logged in as ${user.name}`
      })
      setTimeout(() => {
        this.setState({
          notification: ''
        })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser')
    this.setState({ user: null, notification: 'Successfully logged out' })
  }

  addLike = async (id) => {
    const blogs = this.state.blogs
    const changed = blogs.find(blo => blo._id === id)
    changed.likes++
    //console.log(changed)
    //console.log(blogs)
    const changedBlogs = blogs.filter(blo => blo._id !== id).concat(changed)
    //console.log(changed)
    //console.log(this.state.blogs.sort((a, b) => b.likes - a.likes))
    this.setState({ blogs: changedBlogs.sort((a, b) => b.likes - a.likes) })
  }

  handleDelete = async (id) => {
    if (window.confirm(`delete?`)) {
      this.setState({ blogs: this.state.blogs.filter(a => a._id !== id) })
    }
  }

  render() {
    //console.log("render")
    const userId = this.state.user === null ? -1 : this.state.user.id.toString()

    const blogForm = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.map(blog => {
          return <Blog key={blog._id} blog={blog}
            updateBlogs={this.addLike}
            handleDelete={this.handleDelete}
            showDelete={userId === blog.user._id.toString()}
          />
        })}
      </div>
    )

    const notification = () => {
      if (this.state.notification !== '') {
        return (
          <div className='notification'>
            {this.state.notification}
          </div>
        )
      }
    }

    const error = () => {
      if (this.state.error !== '') {
        return (
          <div className='error'>
            {this.state.error}
          </div>
        )
      }
    }

    return (
      <div>
        {notification()}
        {error()}
        {this.state.user === null ?
          <Togglable buttonLabel='Login'>
            {loginForm(this.handleFieldChange, this.login, this.state.username, this.state.password)}
          </Togglable> :
          <div>
            <p>Logged in as {this.state.user.name}
              <button onClick={this.logout}>Logout</button>
            </p>
            {blogForm()}
            {newBlogForm(this.create, this.handleFieldChange, this.state.author, this.state.title, this.state.url)}
          </div>}
      </div>
    )
  }
}

export default App
