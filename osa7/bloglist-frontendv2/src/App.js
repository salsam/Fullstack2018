import React from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { like, initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import blogView from './components/BlogView'
import { Table, Container } from 'semantic-ui-react'
import userService from './services/users'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()

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
      <Notification />
    </div>
  )

  BlogView = () => (
    <div>
      {this.props.user !== null && blogView(this.props.blogs, this.props.user, this.logout, this.like, this.remove)}
    </div>
  )

  UserView = async (users) => {
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

  render() {
    return (
      <Container>
        <Notification />
        {this.props.user !== null &&
          <div>
            {this.props.user.name} logged in <button onClick={this.logout}>logout</button>
          </div>}
        <Router>
          <div>
            {this.props.user === null && this.renderLoginPage()}
            <Route exact path='/' render={() => <this.BlogView />} />
            <Route exact path='/users' render={() => <this.UserView users={[]} />} />
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
  setNotification, like, initializeBlogs, deleteBlog, login, logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)