import fire from '../fire'

const signupReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'ADD_USER':
    return action.data
  case 'REMOVE_USER':
    return action.data
  case 'SIGNUP_DENIED':
    return state
  default:
    return state
  }
}

export const signupUser = (user) => {
  console.log('loginUser', user)
  const newUser = fire.auth()
    .createUserWithEmailAndPassword(user.username, user.password)
    .catch(error => console.log(error))
  console.log('newUser', newUser)
  return async dispatch => {
    dispatch({
      type: 'ADD_USER',
      data: user
    })
  }
}

export default signupReducer