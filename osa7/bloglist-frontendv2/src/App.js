import React from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { like, initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { login, logout, initializeUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import { NavLink, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlogView from './components/BlogView'
import { Table, Container, Segment, Menu } from 'semantic-ui-react'
import userService from './services/users'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const SingleBlogView = ({ blog, like, remove, deletable }) => {
  const adder = blog.user ? blog.user.name : 'anonymous'

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
          {blog.likes} likes <button onClick={like}>like</button>
        </div>
        <div>
          added by {adder}
        </div>
        {deletable && <div><button onClick={remove}>delete</button></div>}
      </div>
    </div>
  )
}

const UserView = ({ users }) => {
  return (
    <div>
      <h2>users</h2>
      <Table striped celled>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              {user.name}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

class MenuComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'blogs',
      user: props.user
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, user } = this.state
    console.log(this.state)
    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='blogs' active={activeItem === 'blogs'} onClick={this.handleItemClick} color='red'>
            <NavLink exact to='/'>blogs</NavLink>
          </Menu.Item>
          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} color='red'>
            <NavLink exact to='/users'>users</NavLink>
          </Menu.Item>
          {user !== null && <Menu.Item>Logged in as {user.name}</Menu.Item>}
        </Menu>
      </Segment>
    )
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.login(user)
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    this.props.setNotification(message, type, 10)
  }

  like = (liked) => async () => {
    await this.props.like(liked)
    this.notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    this.props.deleteBlog(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.logout()
    this.notify('logged out')
  }

  renderLoginPage = () => (
    <div>
      <LoginForm />
    </div>
  )

  renderBlogView = () => {
    if (this.props.user === null) {
      return <div></div>
    }
    return (
      <Table striped celled>
        <Table.Body>
          {this.props.blogs.map(blog =>
            <Table.Row key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }

  renderSingleBlogView = (id) => {
    const blog = this.props.blogs.find(b => b._id === id)
    if (blog === undefined) {
      return <div></div>
    }
    return < SingleBlogView
      blog={blog}
      like={this.like}
      remove={this.remove}
      deletable={blog.user === undefined || this.props.user === blog.user}
    />
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h3>blog app</h3>
            <MenuComponent user={this.props.user} />
            <Notification />
            {this.props.user !== null &&
              <div>
                {this.props.user.name} logged in <button onClick={this.logout}>logout</button>
                <Togglable buttonLabel='uusi blogi'>
                  <BlogForm />
                </Togglable>
              </div>}
            {this.props.user === null && this.renderLoginPage()}
            <Route exact path='/' render={() => this.renderBlogView()} />
            <Route exact path='/users' render={() => <UserView users={[]} />} />
            <Route exact path='/blogs/:id' render={({ match }) => this.renderSingleBlogView(match.params.id)} />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification, like, initializeBlogs, deleteBlog, login, logout, initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)