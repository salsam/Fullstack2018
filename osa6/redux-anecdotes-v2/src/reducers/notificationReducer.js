const initialNotification = 'Notifications will appear here!'

const notificationReducer = (state = initialNotification, action) => {
  console.log(action)
  if (action.type === 'SET') {
    return action.content
  }
  return state
}

export const notifyWith = (content, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'SET',
        content: ''
      })
    }, 1000 * delay)
  }
}

export default notificationReducer