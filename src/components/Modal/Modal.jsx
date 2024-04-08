import React from 'react'
// import styles from './Modal.module.scss'

const Modal = ({ close, content }) => {
  return (
    <div>
      <div  >
        <button onClick={close}>
          Close
        </button>
        <div  >{content}</div>
      </div>
    </div>
  )
}

export default Modal