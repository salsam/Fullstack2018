import userService from '../services/users'

const usersReducer = (state = null, action) => {
    if (action.type === 'INITIALIZE_USERS') {
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

export default usersReducer