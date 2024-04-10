import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import BookList from './containers/ResultsContainer/BookList'
import { getBooksfromSearch } from './services/google-books-service'

function App() {
  const [books, setBooks] = useState([])

  const onSearch = async (searchTerm) => {
    try {
      const books = await getBooksfromSearch(searchTerm)
      setBooks(books)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  return (
    <>
    <section>
      <Header onSearch = {onSearch} />
      <BookList books={books} />
    </section>

    </>
  )
}
export default App
