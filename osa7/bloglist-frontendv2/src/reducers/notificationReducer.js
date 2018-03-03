

const notificationReducer = (state = null, action) => {
    if (action.type === 'SETNOTIFICATION') {
        return action.data
    } else if (action.type === 'CLEAR') {
        return null
    }
    return state
}

export const setNotification = (message, type, delay) => {
    return async (dispatch) => {
        dispatch({
            type: 'SETNOTIFICATION',
            data: { message, type }
        })
        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, delay * 1000)
    }
}

export default notificationReducer