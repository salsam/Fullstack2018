import React from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { like, initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, Container, Segment, Menu, Button } from 'semantic-ui-react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const SingleBlogView = ({ blog, like, remove, deletable }) => {
  const adder = blog.user ? blog.user.name : 'anonymous'
  console.log(deletable)

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

const SingleUserView = ({ user }) => {
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

const UserView = ({ users }) => {
  if (!users) return <div></div>
  return (
    <div>
      <h2>users</h2>
      <Table striped celled columns={2}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>username</Table.HeaderCell>
            <Table.HeaderCell>blogs added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
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
      user: props.user,
      logout: props.logout
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, user } = this.state
    console.log(this.state)
    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='blogs' active={activeItem === 'blogs'}
            onClick={this.handleItemClick} color='red' as={Link} to='/'>
            blogs
          </Menu.Item>
          <Menu.Item name='users' active={activeItem === 'users'}
            onClick={this.handleItemClick} color='red' as={Link} to='/users'>
            users
          </Menu.Item>
          {user !== null && <Menu.Item>Logged in as {user.name}</Menu.Item>}
          {user !== null && <Menu.Item><Button onClick={this.state.logout}>logout</Button></Menu.Item>}
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
              <Table.Cell>
                <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
              </Table.Cell>
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

  renderSingleUserView = (id) => {
    if (!this.props.users) return <div></div>
    const user = this.props.users.find(u => u.id === id)
    if (!user) return <div></div>
    return <SingleUserView user={user} />
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h3>blog app</h3>
            {this.props.user !== null && <MenuComponent user={this.props.user} logout={this.logout} />}
            <Notification />
            {this.props.user !== null &&
              <div>
                <Togglable buttonLabel='uusi blogi'>
                  <BlogForm />
                </Togglable>
              </div>}
            {this.props.user === null && this.renderLoginPage()}
            <Route exact path='/' render={() => this.renderBlogView()} />
            <Route exact path='/users' render={() => <UserView users={this.props.users} />} />
            <Route exact path='/blogs/:id' render={({ match }) => this.renderSingleBlogView(match.params.id)} />
            <Route exact path='/users/:id' render={({ match }) => this.renderSingleUserView(match.params.id)} />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification, like, initializeBlogs, deleteBlog, login, logout, initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)