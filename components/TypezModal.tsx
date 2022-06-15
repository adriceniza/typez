import React, { useEffect } from 'react'
import ITypezModal from '../Interfaces/ITypezModal'
import styles from '../styles/TModal.module.css'
import SpinnerLoader from './SpinnerLoader'
export default function TypezModal({
  show,
  form,
  text,
  isQuestion,
  customConfirmButtonText,
  customCancelButtonText,
  customOKButtonText,
  icon,
  loader = false,
  onCancel,
  onOK,
  onConfirm
}: ITypezModal) {
  const [showModal, setShowModal] = React.useState(show)

  const defaultCancel = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setShowModal(show)
  }, [show])
  return (
    <div className={`${showModal && styles.fadeIn} ${!showModal && styles.hidden} ${styles.typezmodal}`} id='TypezModal'>
      <div className={`${styles.typezmodal_body} ${showModal && styles.popIn}`}>
        {<SpinnerLoader loading={loader} />}
        <div className={`${styles.text} ${text === 'undefined' && styles.hidden}`}><span>{text}</span></div>
        {form && <div className={`${styles.form}`}>{form}</div>}
        <div className={`${styles.buttons}`}>
          {isQuestion &&
            <>
              <button className={styles.cancel} onClick={onCancel || defaultCancel}>{customCancelButtonText ? customCancelButtonText : 'Cancel'}</button>
              <button className={styles.confirm} onClick={onConfirm}>{customConfirmButtonText ? customConfirmButtonText : 'Confirm'}</button>
            </>
          }
        </div>

        <button onClick={() => { setShowModal(false) }} className={`${styles.closeModal} ${styles.button}`}>x
        </button>

      </div>

    </div>
  )
}
