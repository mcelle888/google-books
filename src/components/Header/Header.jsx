import React from 'react'
import { useSearchContext } from '../../context/SearchContext'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Header.module.scss'

const Header = () => {
  const { handleSearch } = useSearchContext()

  return (
    <div className={styles.searchContainer}>
       <h1>Google Books API Search Engine</h1>
        <p>Search for your favourite books or explore something new!🕯️ </p>
      <SearchBar buttonText="Search" placeholder="Search" onSearch={handleSearch} />
    </div>
  )
}

export default Header