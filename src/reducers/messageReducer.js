import fire from '../fire'
import friendlyUrl from 'friendly-url'

const messageReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'CREATE_MESSAGE':
    return state
  case 'FETCH_MESSAGES':
    return action.data
  case 'REMOVE_MESSAGE':
    return state
  default:
    return state
  }
}

const snapshotToArray = (snapshot) => {
  var returnArr = []
  snapshot.forEach((childSnapshot) => {
    //console.log('childSnapshot' ,childSnapshot)
    const item = { text: childSnapshot.val(), friendlyUrl: friendlyUrl(childSnapshot.val()), id: childSnapshot.key }
    //console.log('childSnapshot item' ,item)
    returnArr.push(item)
  })
  return returnArr
}

let messagesRef = fire.database().ref('messages')

export const fetchMessages = () => {
  return async dispatch => {
    messagesRef.orderByKey().limitToLast(100).on('value', snapshot => {
      const messages = snapshotToArray(snapshot)
      console.log('fetchMessages', messages)
      dispatch({
        type: 'FETCH_MESSAGES',
        data: messages
      })
    })
  }
}

/* export const matchMessage = (id) => {
  return async dispatch => {
    console.log('matchMessage', id)
    messagesRef.orderByKey().limitToLast(100).on('value', snapshot => {
      const messages = snapshotToArray(snapshot)
      const message = messages.find(message => message.id === id)
      console.log('matchMessage kakka', message)
      dispatch({
        type: 'MATCH_MESSAGE',
        data: message
      })
    })
  }
}
 */
export const createMessage = (message) => {
  return async dispatch => {
    messagesRef.push(message)
    console.log('createMessage', message)
    dispatch({
      type: 'CREATE_MESSAGE',
      data: message
    })
  }
}

export const removeMessage = (message) => {
  return async dispatch => {
    messagesRef.child(message.id).remove()
    console.log('removeMessage', message)
    dispatch({
      type: 'REMOVE_MESSAGE',
      data: message
    })
  }
}

export default messageReducer