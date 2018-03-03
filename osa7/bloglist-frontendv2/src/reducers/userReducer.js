import userService from '../services/users'

const userReducer = (state = null, action) => {
    if (action.type === 'LOGIN') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return null
    } else if (action.type === 'INITIALIZE_USERS') {
        return action.data
    }
    return state
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            data: users
        })
    }
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