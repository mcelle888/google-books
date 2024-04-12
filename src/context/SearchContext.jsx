import React, { createContext, useState, useContext } from "react"

const SearchContext = createContext()

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = async (search) => {
    setSearchTerm(search)
  }

  return (
    <SearchContext.Provider value={{ searchTerm, handleSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
