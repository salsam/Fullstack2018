import React from 'react'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { Form, Button } from 'semantic-ui-react'

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
                <Form onSubmit={this.handleLogin}>
                    <Form.Field>
                        <label>käyttäjätunnus</label>
                        <input
                            type="text"
                            name="username"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>salasana</label>
                        <input
                            type="password"
                            name="password"
                        />
                    </Form.Field>
                    <Button type="submit">kirjaudu</Button>
                </Form>
            </div>
        )
    }
}

export default connect(null, { login, setNotification })(LoginForm)