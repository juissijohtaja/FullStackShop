import fire from '../fire'

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
  console.log('loginUser', user.username)
  console.log('loginUser', user.password)

  //fire.auth()
  //.signInWithEmailAndPassword(user.email, user.password)
  //.catch(error => console.log(error))
  //console.log('loggedInUser', loggedInUser)

  return async dispatch => {
    try {
      const response = await fire.auth().signInWithEmailAndPassword(user.username, user.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log('errorCode', errorCode)
          console.log('errorMessage', errorMessage)
        })

      console.log('loginReducer response', response)
      if (response) {
        console.log('loginReducer login ok')
        dispatch({
          type: 'ADD_USER',
          data: response
        })
      } else {
        console.log('loginReducer login failed')
        dispatch({
          type: 'LOGIN_DENIED',
          data: null
        })
      }


    } catch (e) {
      console.log(e)
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