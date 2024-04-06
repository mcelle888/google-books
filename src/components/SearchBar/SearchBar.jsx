import React from 'react'
import styles from './SearchBar.module.scss'

const SearchBar = ( {onSearch, placeholder, buttonText}) => {
    const onSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const searchTerm = new FormData(form).get("search")
        onSearch(searchTerm)
        form.reset()
    }
  return (
    <div className={styles.searchContainer}>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={placeholder} name="search" />
            <button>{buttonText}</button>
        </form>
    </div>
  )
}

export default SearchBar