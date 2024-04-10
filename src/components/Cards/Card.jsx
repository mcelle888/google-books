import React, { useState } from 'react'
import styles from './Card.module.scss'
import Modal from '../Modal/Modal'

const Card = ( { book }) => {
  const authors = book.authors ? book.authors.join(', ') : 'No Authors'

  const [showModal, setShowModel] = useState(false)

  const toggleModal = () => {
    setShowModel(!showModal)
  }
  return (
    <>
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
        <p>Description:  {book.description ? book.description.slice(0, 100) + "..." : "n/a"}</p>
        <button onClick={toggleModal}>More Info</button>
      </div>

    </div>

    <div className={styles.modalContainer}>
      {showModal && <Modal toggle={toggleModal} content={"testing"} />}
    </div>
    </>
  )
}

export default Card


