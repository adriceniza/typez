import { ReactElement, useEffect, useState } from 'react';
import * as TERMINAL from '../components/Terminal'
import { loopLines } from '../components/terminal_lines';
import { banner } from '../constants';
import TypezModal from '../components/TypezModal';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from '../styles/Terminal.module.css'
import input_styles from '../styles/Input.module.css'
import updInputBefore from '../hooks/updInputBefore';

export default function Terminal(): ReactElement<any, any> {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { status } = useSession()
  const router = useRouter()

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

    updInputBefore();

  }, [])
  return (
    <>
      <TypezModal loader={status === "loading"} show={status === 'unauthenticated'} text={"You are not logged in"} customCancelButtonText='Continue as guest' customConfirmButtonText='Go to log in.' onConfirm={() => { router.push('/login') }} isQuestion />
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