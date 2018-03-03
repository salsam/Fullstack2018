const userReducer = (state = null, action) => {
    if (action.type === 'LOGIN') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return null
    }
    return state
}

export const login = (user) => {
    return {
        type: 'LOGIN',
        data: user
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer