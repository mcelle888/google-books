import React, { useState } from "react";
import styles from "./Card.module.scss";
import Modal from "../Modal/Modal";
import ModalContent from "../../containers/ModalContent/ModalContent";
import { getBookById } from "../../services/google-books-service";

const Card = ({ book }) => {
  const authors = book.volumeInfo.authors
    ? book.volumeInfo.authors.join(", ")
    : "N/A";
  const title = book.volumeInfo.title ? book.volumeInfo.title : "N/A";
  const year = book.volumeInfo.publishedDate
    ? book.volumeInfo.publishedDate.slice(0, 4)
    : "N/A";
  const description = book.volumeInfo.description
    ? book.volumeInfo.description.slice(0, 100) + "..."
    : "N/A";
  const image =
    book.volumeInfo.imageLinks === undefined
      ? ""
      : `${book.volumeInfo.imageLinks.thumbnail}`;

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
  };

  return (
    <>
      <div className={styles.cardBox}>
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
        <div>
          <p className={styles.bookTitle}>{title} </p>
          <p>Authors: {authors}</p>
          <p>Published: {year}</p>
          <p>Description: {description}</p>
          <button onClick={toggleModal} disabled={loading}>
            More Info
          </button>
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
  );
};

export default Card;
