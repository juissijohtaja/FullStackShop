import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import productReducer from './reducers/productReducer'
import messageReducer from './reducers/messageReducer'
import shoppingcartReducer from './reducers/shoppingcartReducer'
import loginReducer from './reducers/loginReducer'

import { loadState, saveState } from './localStorage'

const reducer = combineReducers({
  products: productReducer,
  messages: messageReducer,
  shoppingcart: shoppingcartReducer,
  loggeduser: loginReducer
})

const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  saveState({
    shoppingcart: store.getState().shoppingcart,
    loggeduser: store.getState().loggeduser
  })
})

export default store