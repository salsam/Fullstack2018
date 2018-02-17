import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (handleFieldChange, login, username, password) => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={login}>
            <div>
                username
        <input
                    name='username'
                    onChange={handleFieldChange}
                    type='text'
                    value={username}
                />
            </div>
            <div>
                password
        <input
                    name='password'
                    onChange={handleFieldChange}
                    type='password'
                    value={password}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}


export default LoginForm