import React, { useState } from 'react'
import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'

const Header = ({onSearch}) => {

  return (
    <div className={styles.headingContainer}> 
        <h1>Google Books API Search Engine</h1>
        <p>Search for your favourite books or explore something new!🕯️ </p>
        <SearchBar buttonText="Search" placeholder="Search" onSearch={onSearch} />
    </div>
  )
}

export default Header