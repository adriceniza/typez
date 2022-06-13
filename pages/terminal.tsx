import { ReactElement, useEffect, useState } from 'react';
import * as TERMINAL from '../components/Terminal'
import { loopLines } from '../components/terminal_lines';
import { banner } from '../constants/constants';
import TypezModal from '../components/TypezModal';
import { useRouter } from 'next/router';
import styles from '../styles/Terminal.module.css'
import input_styles from '../styles/Input.module.css'
import TKeyboard from '../components/TKeyboard';

export default function Terminal(): ReactElement<any, any> {
  const router = useRouter()
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showModal, setShowModal] = useState(false)

  setTimeout(() => {
    setShowModal(true)
  }, 2000)

  const enterListener = (e: any) => {
    { typeof e === 'string' && (TERMINAL.commandHandler(e, router), setInputValue('')) }
    if (e.key === 'Enter') {
      TERMINAL.commandHandler(e.target.value, router)
      setInputValue('')
      e.target.value = ''
    }
  }

  useEffect(() => {
    loopLines(banner, 0, 100, true);

    const terminal = document.getElementById('terminal')
    const hidden_input = document.getElementById('hidden_input')

    terminal?.addEventListener('click', () => {
      hidden_input!.focus();
      setFocus(true)
    })
    hidden_input?.addEventListener('keydown', enterListener)
    terminal?.click();

  }, [])
  return (
    <>
      <div className={styles.container} id="terminal">
        <div className={styles.lines} id="terminal_lines"></div>
        <div className={input_styles.new_line}>
          <div className={`${!focus && input_styles.input_inactive} ${input_styles.input}`} id="fake_input">{inputValue}</div>
          <input autoComplete='off' type="text" id="hidden_input" className={styles.hidden_input} onChange={(e) => { setInputValue(e.target.value) }} />
        </div>
      </div>
    </>
  )
}