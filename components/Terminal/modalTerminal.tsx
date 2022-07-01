import React, { useEffect, useState } from "react";
import Terminal_ from "./Terminal_";
import styles from "@styles/ModalTerminal.module.css";
// import { motion } from "framer-motion";


export default function ModalTerminal() {
  let temp_show = false
  const [show, setShow] = useState(temp_show)

  const keyDownHandleShow = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      temp_show = !temp_show
      setShow(temp_show)
    }
  }


  useEffect(() => {
    temp_show = false
    globalThis.addEventListener('keydown', keyDownHandleShow)
  }, [])
  return (
    <>

      <div className={`${show ? styles.modalTerminal : styles.hidden}`}>
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
