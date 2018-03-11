import React from 'react'
import { connect } from 'react-redux'
import type { NotificationType } from '../flowtypes'

type funArg = { notification: Notification };
const Notification = ({ notification }: ?funArg) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)