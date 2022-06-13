import { useEffect, useState } from 'react'
import { generateTestUI } from '../components/test'
import TKeyboard from '../components/TKeyboard'
import VerticalSettings from '../components/VerticalSettings'
import styles from '../styles/Test.module.css'

export default function TypeTest() {
    const [KBPosition, setKBPosition] = useState('LeftUP')
    const [KBVisibility, setKBVisibility] = useState(false)
    const [KBOpacity, setKBOpacity] = useState(1)
    const changePosition = (position: string) => {
        setKBPosition(position)
    }
    const changeVisibility = (visibility: boolean) => {
        setKBVisibility(visibility)
    }
    const changeOpacity = (opacity: number) => {
        setKBOpacity(opacity)
    }


    useEffect(() => {
        generateTestUI()
    }, [])

    return (<>
        <div className={styles.testContainer}>
            <div className={styles.terminal_test} id="terminal_test"></div>
            <TKeyboard position={KBPosition} hidden={!KBVisibility} opacity={KBOpacity} />
            <VerticalSettings changeOpacity={changeOpacity} currentVisibility={KBVisibility} changeVisibility={changeVisibility} changePosition={changePosition} />
        </div>

    </>
    )
}
