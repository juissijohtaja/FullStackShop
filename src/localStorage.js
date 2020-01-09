export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('WebShopApp')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log('loadState error', err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('WebShopApp', serializedState)
  } catch (err) {
    // ignore write errors
    console.log('saveStateerror', err)
  }
}