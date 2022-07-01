import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { banner } from '../../constants'
import updInputBefore from '@hooks/updInputBefore'
import { loopLines } from '@components/Terminal/terminal_lines'
import * as TERMINAL_UTILS from '@components/Terminal/Terminal_utils'
import styles from '@styles/Terminal.module.css'
import input_styles from '@styles/Input.module.css'
import ITerminal from '@interfaces/ITerminal'
export default function Terminal(props: ITerminal) {
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()
    const inputElement = useRef(null);
    let inCD = false

    const handleInput = (e: any) => {
        const fake_input = document.getElementById("fake_input");
        const fake_input_before = fake_input?.getAttribute('data-before')

        if (e.key === ' ') {
            if (e.target.value.replace(' ', '') === 'cd') {
                inCD = true
                e.target.value = ''

                fake_input?.setAttribute('data-before', fake_input_before + ' cd ~> ')
            }
        }
        if (e.key === 'Backspace' && fake_input?.innerHTML === '') {
            fake_input?.setAttribute('data-before', (fake_input_before as string).replace(' cd ~> ', ''))
            e.target.value = ''
            inCD = false
        }
        else if (e.key === 'Enter') {
            switch (inCD) {
                case true:
                    let route = `/${(fake_input?.innerHTML)?.replace(' ', '')}`
                    router.push(route)
                    fake_input?.setAttribute('data-before', fake_input_before as string)
                    e.target.value = ''
                    inCD = false
                    break;
                case false:
                    TERMINAL_UTILS.commandHandler(e.target.value, router)
                    setInputValue('')
                    e.target.value = ''
                    break

                default:
                    break;
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
        loopLines(banner, 0, 100, true);
        const hidden_input = document.getElementById('hidden_input')
        hidden_input?.addEventListener('keydown', handleInput)
        updInputBefore();

        if (inputElement['current']) {
            (inputElement['current'] as HTMLInputElement).focus();
        }
    }, [])
    return (
        <div className={`${styles.container} ${styles.terminal_focus} ${props.modal && styles.modalTerminal__terminal}`} id="terminal">
            <div className={`${styles.lines} ${props.modal && styles.modalTerminal__lines}`} id="terminal_lines"></div>
            <div className={input_styles.new_line}>
                <div className={`${props.modal && input_styles.modal_input} ${input_styles.input}`} id="fake_input">{inputValue}</div>
                <input autoComplete='off' type="text" onBlur={(e) => { e.target.focus() }} ref={inputElement} id="hidden_input" className={styles.hidden_input} onChange={(e) => { setInputValue(e.target.value) }} />
            </div>
        </div>
    )
}
