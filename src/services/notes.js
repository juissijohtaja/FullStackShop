const addedState = [
  {
    content: 'kokkeli vekkulit',
    important: false,
    id: 1,
  },
  {
    content: 'kikkelis kokkelis vaan',
    important: false,
    id: 2,
  },
]

const getAll = async () => {
  //const response = await axios.get(url)
  //return response.data
  const response = addedState
  return response
}

const createNew = async (content) => {
  const object = { content, important: false }
  //const response = await axios.post(url, object)
  const response = null
  return response.data
}

export default {
  getAll,
  createNew,
}