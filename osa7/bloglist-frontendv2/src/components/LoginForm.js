import React from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

class LoginForm extends React.Component {
    notify = (message, type = 'info') => {
        this.props.setNotification(message, type, 10)
    }

    handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: event.target.username.value,
                password: event.target.password.value
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            this.props.login(user)
            blogService.setToken(user.token)
            this.notify('Welcome back!')
        } catch (exception) {
            this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
        }
    }

    render() {
        return (
            <div>
                <h2>Kirjaudu sovellukseen</h2>
                <form onSubmit={this.handleLogin}>
                    <div>
                        käyttäjätunnus
              <input
                            type="text"
                            name="username"
                        />
                    </div>
                    <div>
                        salasana
              <input
                            type="password"
                            name="password"
                        />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { login, setNotification })(LoginForm)