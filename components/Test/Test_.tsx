import React, { useEffect } from 'react'
import { generateTestUI } from './test'
// import TKeyboard from '@components/TKeyboard'
import styles from '@styles/Test.module.css'
export default function Test() {
    useEffect(() => {
        generateTestUI();
    }, [])
    return (
        <div className={styles.testContainer}>
            <div className={styles.terminal_test} id="terminal_test"></div>
            {/* <TKeyboard position={KBPosition} hidden={!KBVisibility} opacity={KBOpacity} /> */}
        </div>
    )
}
