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

  const fetchBooks = async (searchTerm, page) => {
    try {
      const startIndex = (page - 1) * 16
      const newBooks = await getBooksfromSearch(searchTerm, startIndex, 16)
      setBooks(newBooks)
      setShowNav(true)  
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
    } else {
      setShowNav(false)
    }
  }, [searchTerm, currentPage])


  return (
    <>
      <div className={styles.resultsBox}>
        {books.map(book => (<Card key={book.id} book={book} />))}
      </div>
      <div className={styles.pagination}>
        {showNav && <Nav handleNextPage={handleNextClick} handlePrevPage={handlePrevClick} />}
        <span>Page {currentPage}</span>
      </div>
    </>
  )
}

export default BookList
