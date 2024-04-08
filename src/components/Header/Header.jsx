import React, { useState } from 'react'
import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { getBooksfromSearch } from '../../services/google-books-service'
import BookList from '../../containers/ResultsContainer/BookList'

const Header = () => {

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
    <div className={styles.headingContainer}> 
        <h1>Google Books API Search Engine</h1>
        <p>Search for your favourite books!</p>
        <SearchBar buttonText="Search" placeholder="Search" onSearch={onSearch}  />

        <BookList books={books} />

    </div>
  )
}

export default Header