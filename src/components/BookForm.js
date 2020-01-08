import React, { useState } from 'react'
import fire from '../fire'

const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  //let booksRef = fire.database().ref('books').orderByKey().limitToLast(100)

  const AddBook = (e) => {
    e.preventDefault() // <- prevent form submit from reloading the page

    if (title && published && author) {
      const newBook = { title, published, author, genres }
      console.log('newBook', newBook)
      /* Send the message to Firebase */
      fire.database().ref('books').push( newBook )

      //clear the input
      setTitle('')
      setPublished('')
      setAuhtor('')
      setGenres([])
      setGenre('')

    } else {
      alert('Error: title, author or year missing')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={AddBook}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default BookForm