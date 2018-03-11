import React from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { like, initializeBlogs, deleteBlog, comment } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, Container, Segment, Menu, Button, Form } from 'semantic-ui-react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import SingleBlogView from './components/SingleBlogView'
import UserView from './components/UserView'
import SingleUserView from './components/SingleUserView'

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

  handleComment = (id: string) => async (comment) => {
    await this.props.comment(id, comment)
    const blog = this.props.blogs.find(b => b._id === id)
    this.notify(`comment ${comment} added to blog ${blog.title}`)
  }

  notify = (message, type = 'info') => {
    this.props.setNotification(message, type, 10)
  }

  like = (liked) => async () => {
    await this.props.like(liked)
    this.notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  remove = (id: string) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    await this.props.deleteBlog(id)
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
    if (!this.props.user) {
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

  renderSingleBlogView = (id: string, history) => {
    const blog = this.props.blogs.find(b => b._id === id)
    if (!blog) {
      return <div></div>
    }
    return < SingleBlogView
      blog={blog}
      like={this.like(blog)}
      remove={this.remove(blog._id)}
      deletable={blog.user === undefined || this.props.user.username === blog.user.username}
      comment={this.handleComment(blog._id)}
      history={history}
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
            <Route exact path='/blogs/:id' render={({ match, history }) =>
              this.renderSingleBlogView(match.params.id, history)} />
            <Route exact path='/users/:id' render={({ match }) =>
              this.renderSingleUserView(match.params.id)} />
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
  setNotification, like, initializeBlogs, deleteBlog, comment, login, logout, initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)