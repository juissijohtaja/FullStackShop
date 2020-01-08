import React, { useState, useEffect } from 'react'
import fire from '../fire'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    let booksRef = fire.database().ref('books').orderByKey().limitToLast(100)
    booksRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let book = {
        title: snapshot.val().title,
        author: snapshot.val().author,
        published: snapshot.val().published,
        genres: snapshot.val().genres,
        id: snapshot.key
      }
      console.log('book', book)
      setBooks(books => [...books, book])
    })
  }, [])


  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <td>{a.genres.map(genre => <span key={genre}>{genre} </span> )}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books