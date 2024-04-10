import React, { useState } from "react"
import "./App.scss"
import Header from "./components/Header/Header"
import BookList from "./containers/ResultsContainer/BookList"
import { getBooksfromSearch } from "./services/google-books-service"
import Nav from "./components/Navigation/Nav"

function App() {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const onSearch = async (searchTerm) => {
    try {
      setSearchTerm(searchTerm)
      setCurrentPage(1)
      fetchBooks(searchTerm, 1)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

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
    fetchBooks(searchTerm, currentPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      fetchBooks(searchTerm, currentPage - 1)
    }
  }

  console.log(books)
  console.log(currentPage)

  return (
    <section>
      <Header onSearch={onSearch} />
      <BookList books={books} />
      <Nav handleNextPage={handleNext} handlePrevPage={handlePrev} />
    </section>
  )
}

export default App

