import noteService from '../services/notes'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: false,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
  case 'NEW_NOTE':
    return [...state, action.data]
  case 'TOGGLE_IMPORTANCE':
    const id = action.data.id
    const noteToChange = state.find(n => n.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    return state.map(note =>
      note.id !== id ? note : changedNote
    )
  case 'INIT_NOTES':
    return action.data
  default:
    return state
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    //const notes = initialState
    console.log('initializeNotes notes', notes)
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

/* export const createNote = content => {
    return async dispatch => {
      const newNote = await noteService.createNew(content)
      dispatch({
        type: 'NEW_NOTE',
        data: newNote,
      })
    }
  } */

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer