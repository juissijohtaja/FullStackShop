import fire from '../fire'
import friendlyUrl from 'friendly-url'

const productReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'CREATE_PRODUCT':
    return state
  case 'FETCH_PRODUCTS':
    return action.data
  case 'REMOVE_PRODUCT':
    return state
  default:
    return state
  }
}

const snapshotToArray = (snapshot) => {
  var returnArr = []
  snapshot.forEach((childSnapshot) => {
    const product = {
      name: childSnapshot.val().name,
      description: childSnapshot.val().description,
      image: childSnapshot.val().image,
      price: childSnapshot.val().price,
      rating: childSnapshot.val().rating,
      category: childSnapshot.val().category,
      friendlyUrl: friendlyUrl(childSnapshot.val().name),
      publishDate: childSnapshot.val().publishDate,
      id: childSnapshot.key
    }
    returnArr.push(product)
  })
  return returnArr
}

const productsRef = fire.database().ref('products')

export const fetchProducts = () => {
  return async dispatch => {
    productsRef.orderByKey().limitToLast(100).on('value', snapshot => {
      const products = snapshotToArray(snapshot)
      console.log('fetchProducts', products)
      dispatch({
        type: 'FETCH_PRODUCTS',
        data: products
      })
    })
  }
}

export const createProduct = (product) => {
  return async dispatch => {
    productsRef.push(product)
    console.log('createProduct', product)
    dispatch({
      type: 'CREATE_PRODUCT',
      data: product
    })
  }
}

export const removeProduct = (product) => {
  return async dispatch => {
    productsRef.child(product.id).remove()
    console.log('removeProduct', product)
    dispatch({
      type: 'REMOVE_PRODUCT',
      data: product
    })
  }
}

export default productReducer