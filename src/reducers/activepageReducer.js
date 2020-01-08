
const activepageReducer = (state = null, action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'UPDATE_ACTIVEPAGE':
    return action.data
  default:
    return state
  }
}

export const updateActivePage = (page) => {
  return async dispatch => {
    console.log('updateRouter')
    dispatch({
      type: 'UPDATE_ACTIVEPAGE',
      data: page
    })
  }
}


export default activepageReducer