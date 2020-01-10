import fire from '../fire'
import friendlyUrl from 'friendly-url'

const orderReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'CREATE_ORDER':
    return state
  case 'FETCH_ORDERS':
    return action.data
  case 'REMOVE_ORDER':
    return state
  default:
    return state
  }
}

const snapshotToArray = (snapshot) => {
  var returnArr = []
  snapshot.forEach((childSnapshot) => {
    const order = {
      customer: childSnapshot.val().customer,
      shoppingcart: childSnapshot.val().shoppingcart,
      id: childSnapshot.key
    }
    returnArr.push(order)
  })
  return returnArr
}

const ordersRef = fire.database().ref('orders')

export const fetchOrders = () => {
  return async dispatch => {
    ordersRef.orderByKey().limitToLast(100).on('value', snapshot => {
      const orders = snapshotToArray(snapshot)
      console.log('fetchOrders', orders)
      dispatch({
        type: 'FETCH_ORDERS',
        data: orders
      })
    })
  }
}

export const createOrder = (order) => {
  return async dispatch => {
    ordersRef.push(order)
    console.log('createOrder', order)
    dispatch({
      type: 'CREATE_ORDER',
      data: order
    })
  }
}

export const removeOrder = (order) => {
  return async dispatch => {
    ordersRef.child(order.id).remove()
    console.log('removeOrder', order)
    dispatch({
      type: 'REMOVE_ORDER',
      data: order
    })
  }
}

export default orderReducer