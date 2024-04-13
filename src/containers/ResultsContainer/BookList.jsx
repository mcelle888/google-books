import React, { useState, useEffect } from 'react'
import Card from '../../components/Cards/Card'
import styles from './BookList.module.scss'
import { useSearchContext } from '../../context/SearchContext'
import { getBooksfromSearch } from "../../services/google-books-service"
import Nav from '../../components/Navigation/Nav'

const BookList = () => {
  const { searchTerm } = useSearchContext()
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showNav, setShowNav] = useState(false)  
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)

  const fetchBooks = async (searchTerm, page) => {
    try {
      const startIndex = (page - 1) * 16
      const newBooks = await getBooksfromSearch(searchTerm, startIndex, 16)
      if (page === 1 ) {
        setTotalResults(newBooks.totalItems)
      }
      setBooks(newBooks.items)
      setShowNav(true)  
      window.scrollTo(0, 0)

    } catch (error) {
      setBooks([])
      setShowNav(false)
      setError(`No results found for '${searchTerm}'`)
      setTotalResults(0)
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
      setCurrentPage(1)
      fetchBooks(searchTerm, 1)
    } else {
      setShowNav(false)
      setError(null)
      setTotalResults(0)
    }
    return () => {
      setError(null)
    }
  }, [searchTerm])

  return (
    <>
      <div className={styles.totalBox}>
        {!error && totalResults ? <p className={styles.total}>{totalResults} books found</p> : "" }
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.resultsBox}> 
        {books.map(book => (<Card key={book.id} book={book} />))}
      </div>
      <div className={styles.pagination}>
        {showNav && <Nav handleNextPage={handleNextClick} handlePrevPage={handlePrevClick} />}
        {totalResults > 0 && !error && (
        <p className={styles.pages}>Page {currentPage} of {Math.ceil(totalResults / 16)}</p>
      )}
      </div>
      
    </>
  )
}

export default BookList
