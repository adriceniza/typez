import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { banner } from '../../constants'
import updInputBefore from '@hooks/updInputBefore'
import { loopLines } from '@components/Terminal/Terminal_lines'
import * as TERMINAL_UTILS from '@components/Terminal/Terminal_utils'
import ITerminal from '@interfaces/ITerminal'
import styles from '@styles/Terminal.module.css'
import input_styles from '@styles/Input.module.css'
export default function Terminal(props: ITerminal) {
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()
    const inputElement = useRef(null);

    const handleInput = async (e: any) => {
        if (e.key === 'Enter') {
            if (e.target.value.length !== '') {
                let command = e.target.value
                await TERMINAL_UTILS.commandHandler(command, router, props.close && props.close)
                setInputValue('')
                e.target.value = ''
            } else {
                return false
            }
        }
    }
    // Use effect to set focus when its visible (only used in modal terminal)
    useEffect(() => {
        if (inputElement['current']) {
            if (props.show) {
                (inputElement['current'] as HTMLInputElement).focus();
            } else {
                (inputElement['current'] as HTMLInputElement).blur();
            }
        }
    }, [props.show])

    useEffect(() => {
        loopLines(banner, 0, 50, true);
        const hidden_input = document.getElementById('hidden_input')
        hidden_input?.addEventListener('keydown', handleInput)
        updInputBefore();

        if (inputElement['current']) {
            (inputElement['current'] as HTMLInputElement).focus();
        }
    }, [])
    return (
        <div className={`${styles.container} ${styles.terminal_focus} ${props.modal && styles.modalTerminal__terminal}`} id="terminal">
            <div className={`${styles.lines} ${props.modal && styles.modalTerminal__lines}`} id="terminal_lines"/>
            <div className={input_styles.new_line}>
                <div
                    id="fake_input"
                    className={`${props.modal && input_styles.modal_input} ${input_styles.input}`} >
                        {inputValue}
                </div>
                <input
                    id="hidden_input"
                    autoComplete='off'
                    type="text"
                    className={styles.hidden_input}
                    onChange={(e) => { setInputValue(e.target.value) }}
                    onBlur={(e) => { e.target.focus() }} ref={inputElement}/>
            </div>
        </div>
    )
}
