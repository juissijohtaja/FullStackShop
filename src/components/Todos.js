import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export default function Todos() {
  useFirebaseConnect([
    'todos' // { path: '/todos' } // object notation
  ])

  const todos = useSelector(state => state.firebase.ordered.todos)

  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(todos)) {
    return <div>Todos List Is Empty</div>
  }

  const TodoItem = (key, id, todo) => <li id={key}>{todo}</li>

  return (
    <div>
      <ul>
        {
          Object.keys(todos).map(
            (key, id) => (
              <TodoItem key={key} id={id} todo={todos[key]}/>
            )
          )
        }
      </ul>
    </div>
  )
}