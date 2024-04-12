import React, { useState, useEffect } from 'react'
import Card from '../../components/Cards/Card'
import styles from './BookList.module.scss'
import { useSearchContext } from '../../context/SearchContext'
import { getBooksfromSearch } from "../../services/google-books-service"

const BookList = () => {
  const { searchTerm } = useSearchContext()
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchBooks = async (searchTerm, page) => {
    try {
      const startIndex = (page - 1) * 16
      const newBooks = await getBooksfromSearch(searchTerm, startIndex, 16)
      setBooks(newBooks)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const handleNextClick = () => {
    handleNext()
    fetchBooks(searchTerm, currentPage + 1)
  }

  const handlePrevClick = () => {
    handlePrev()
    if (currentPage > 1) {
      fetchBooks(searchTerm, currentPage - 1)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      fetchBooks(searchTerm, currentPage)
    }
  }, [searchTerm, currentPage])

  return (
    <>
      <div className={styles.resultsBox}>
        {books.map(book => (<Card key={book.id} book={book.volumeInfo} />))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextClick}>Next Page</button>
      </div>
    </>
  )
}

export default BookList
