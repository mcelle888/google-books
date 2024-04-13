import { useState, useEffect} from "react";
import styles from "./ModalContent.module.scss";
import { getBookById } from "../../services/google-books-service";


const ModalContent = ({ bookInfo }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const details = await getBookById(bookInfo.id);
        setBookDetails(details);
        console.log(details);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookInfo) {
      fetchBookDetails();
    }
  }, [bookInfo]);

  return (
    <div className={styles.modalContent}>
      {loading ? (
        <p>Loading book details...</p>
      ) : bookDetails ? (
        <>
          <div className={styles.image}>
            <img src={ bookDetails.volumeInfo.imageLinks === undefined
      ? ""
      : `${bookDetails.volumeInfo.imageLinks.thumbnail}`} />
           
          </div>
          <div className={styles.details}>
            <h2>{bookDetails.volumeInfo.title}</h2>
            <p>
              Authors:{" "}
              {bookDetails.volumeInfo.authors
                ? bookDetails.volumeInfo.authors.join(", ")
                : "No Authors"}
            </p>
            <p>Publisher: {bookDetails.volumeInfo.publisher || "N/A"}</p>
            <p>
              Published Date: {bookDetails.volumeInfo.publishedDate || "N/A"}
            </p>
            <p>Description: {bookDetails.volumeInfo.description || "N/A"}</p>

          </div>
        </>
      ) : (
        <p>No book details available</p>
      )}
    </div>
  );
};

export default ModalContent;
