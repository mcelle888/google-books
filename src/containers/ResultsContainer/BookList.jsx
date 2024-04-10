import React from 'react'
import Card from '../../components/Cards/Card'
import styles from './BookList.module.scss'

const BookList = ({ books }) => {
  return (
    <>

 <div className={styles.resultsBox}>
    {books.map(book => (<Card key={book.id} book={book.volumeInfo} />) )}
    
 </div>
  </>
 
  )}
export default BookList