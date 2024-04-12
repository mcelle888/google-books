import React, { useState } from 'react';
import styles from './Card.module.scss';
import Modal from '../Modal/Modal';
import ModalContent from '../ModalContent/ModalContent';
import { getBookById } from "../../services/google-books-service";

const Card = ({ book }) => {
  const authors = book.authors ? book.authors.join(', ') : 'No Authors';
  const [showModal, setShowModal] = useState(false);
  const [selectedBookInfo, setSelectedBookInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = async () => {
    try {
      setLoading(true);
      const bookInfo = await getBookById(book.id);  
      setSelectedBookInfo(bookInfo);
      setShowModal(!showModal);
    } catch (error) {
      console.error("Error fetching book info:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.cardBox}>
        <div className={styles.image}>
          <img
            src={book.volumeInfo.imageLinks === undefined ? '' : `${book.volumeInfo.imageLinks.thumbnail}`}
            alt=""
          />
        </div>
        <div>
          <p className={styles.bookTitle}>Title: {book.volumeInfo.title} </p>
          <p>Authors: {authors}</p>
          <p>Published: {book.volumeInfo.publishedDate}</p>
          <p>
            Description: {book.volumeInfo.description ? book.volumeInfo.description.slice(0, 100) + '...' : 'n/a'}
          </p>
          <p>Book id: {book.id}</p>
          <button onClick={toggleModal} disabled={loading}>More Info</button>
        </div>
      </div>

      <div className={styles.modalContainer}>
        {showModal && (
          <Modal
            toggle={toggleModal}
            content={<ModalContent bookInfo={selectedBookInfo} />}
          />
        )}
      </div>
    </>
  )
}

export default Card;
