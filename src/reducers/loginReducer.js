
const loginReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'ADD_USER':
    return action.data
  case 'REMOVE_USER':
    return action.data
  case 'LOGIN_DENIED':
    return state
  default:
    return state
  }
}

export const loginUser = (user) => {
  console.log('loginUser', user)
  //const item = { userid: user.userid, password: user.password }
  if (user.password === 'admin') {
    return async dispatch => {
      dispatch({
        type: 'ADD_USER',
        data: user
      })
    }
  } else {
    return async dispatch => {
      dispatch({
        type: 'LOGIN_DENIED',
        data: null
      })
    }
  }
}

export const logoutUser = () => {
  console.log('logoutUser')
  return async dispatch => {
    dispatch({
      type: 'REMOVE_USER',
      data: []
    })
  }
}

export default loginReducer