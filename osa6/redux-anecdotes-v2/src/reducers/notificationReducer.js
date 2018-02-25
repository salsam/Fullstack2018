const initialNotification = 'Notifications will appear here!'

const notificationReducer = (state = initialNotification, action) => {
  console.log(action)
  if (action.type === 'SET') {
    return action.content
  } else if (action.type === 'CREATE') {
    return `created ${action.content}`
  }
  return state
}

export const notificationCreation = (content) => {
  return {
    type: 'SET',
    content
  }
}

export default notificationReducer