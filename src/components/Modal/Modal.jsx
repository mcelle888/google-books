import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({ toggle, content }) => {
  
  return (

    <>
   
      <div className={styles.modalContainer}>
      <div className={styles.buttonBox}>
      <button onClick={toggle}>
          Close
        </button>
      </div>
      
      <div >{content}</div>
      
  </div>
  </>
)
  
    
  
}

export default Modal