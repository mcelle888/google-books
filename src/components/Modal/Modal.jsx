import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({ close, content }) => {
  
  return (
    <div className={styles.modalContainer}>
      <div>
        <div >{content}</div>
        <button onClick={close}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal