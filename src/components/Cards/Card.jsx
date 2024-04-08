import React from 'react'
import styles from './Card.module.scss'

const Card = ( { book }) => {
  const authors = book.authors ? book.authors.join(', ') : 'No Authors'
  return (
    <div className={styles.cardBox}>
      <div className={styles.image}>
        <img src={
      book.imageLinks === undefined
        ? ""
        : `${book.imageLinks.thumbnail}`
  } alt="" />
      </div>
      <div>
        <p className={styles.bookTitle}>Title: {book.title} </p>
        <p>Authors: {authors}</p>
        <p>Published: {book.publishedDate}</p>
        <p>Description: {book.description}</p>
        <button>More Info</button>
      </div>

    </div>
  )
}

export default Card


