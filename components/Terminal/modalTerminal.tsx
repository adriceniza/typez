import React, { useEffect, useState } from "react";
import Terminal_ from "./Terminal_";
import styles from "@styles/ModalTerminal.module.css";


export default function ModalTerminal() {
  let temp_show = false
  const [show, setShow] = useState(temp_show)
  const [hidden, setHidden] = useState(true)

  const keyDownHandleShow = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      temp_show = !temp_show
      if (temp_show) {
        setHidden(false)
        setTimeout(() => {
          setShow(true)
        }, 50)
      } else {
        setShow(false)
        setTimeout(() => {
          setHidden(true)
        }, 300)
      }
    }
  }

  useEffect(() => {
    temp_show = false
    globalThis.addEventListener('keydown', keyDownHandleShow)
  }, [])
  return (
    <>

      <div data-show={show} data-hidden={hidden} className={`${styles.modalTerminal}`}>
        <div
          className={styles.modalTerminal__screen}>
          <div className={styles.modalTerminal__commands}>
            <Terminal_ modal show={show} />
          </div>
        </div>
      </div>
    </>
  );
}
