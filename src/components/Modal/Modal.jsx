import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({ toggle, content }) => {
  
  return (
    <div className={styles.modalContainer}>
      <div>
        <div >{content}</div>
        <button onClick={toggle}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal