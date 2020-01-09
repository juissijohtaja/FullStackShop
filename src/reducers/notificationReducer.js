const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const notificationChange = notification => {
  console.log('notificationChange launched',notification)
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationClear = () => {
  console.log('notificationClear launched')
  return {
    type: 'CLEAR_NOTIFICATION',
    notification: null,
  }
}

export const notificationSet = (text, style, time) => {
  console.log('notificationSetter launched')
  console.log('notification timeOut in seconds:',time)
  const notificationItem = { text, style }
  return async dispatch => {
    dispatch(notificationChange(notificationItem))
    setTimeout(() => {
      dispatch(notificationClear())
      console.log('notification cleared')
    }, time * 1000)
  }
}

export default notificationReducer