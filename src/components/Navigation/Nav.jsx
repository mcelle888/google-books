import React from 'react'
import styles from './Nav.module.scss'

const Nav = ({ handleNextPage, handlePrevPage }) => {
  return (
    <div className={styles.navContainer}>
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default Nav