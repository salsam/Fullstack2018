const initialNotification = 'Notifications will appear here!'

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SETNOTIFICATION':
    return state
  default:
    return state
  }
}

export default notificationReducer