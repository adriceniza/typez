import React, { useEffect } from 'react'
import { keyboard } from '../constants'
import ITKeyboard from '@interfaces/ITKeyboard'
import styles from '@styles/Loader.module.css'

export default function TKeyboard({
  fakeSearch,
  setFakeSearch,
  position,
  hidden,
  opacity,
  onEnter
}: ITKeyboard) {
  const [sound, setSound] = React.useState(false);
  const handleFakeKBClick = (key: string) => {
    { key === ' ' && (key = 'Space') }
    { key === 'Backspace' && (key = '<-') }
    { key === 'Control' && (key = 'Ctrl') }
    { key === 'CapsLock' && (key = 'Caps') }
    if (setFakeSearch !== undefined) {
      switch (key) {
        case 'Space':
          setFakeSearch(fakeSearch + ' ')
          break
        case '<-':
          setFakeSearch(fakeSearch!.slice(0, -1))
          break
        case 'Enter':
          onEnter && onEnter(key)
          setFakeSearch('')
          break
        case 'Alt' || 'Ctrl' || 'Shift' || 'FN' || 'Caps' || 'Win':
          break
        default:
          setFakeSearch(fakeSearch + key)
          break
      }
    }

    const keyContainer = document.getElementById(`key${key}`);
    keyContainer?.classList.add(styles.clickAnimation);
    setTimeout(() => {
      keyContainer?.classList.remove(styles.clickAnimation);
    }, 200);

  }

  useEffect(() => {

    globalThis.addEventListener('keydown', (e: any) => {
      handleFakeKBClick(e.key)
    })
  }, [])

  useEffect(() => {
    { opacity && (document.getElementById('TKeyboard')!.style.opacity = opacity.toString()) }

  }, [opacity])

  return (
    <div id="TKeyboard" className={`${styles.keyboard_transformer} ${hidden && styles.hidden} ${position === 'LeftUP' && styles.LeftUP} ${position === 'LeftBottom' && styles.LeftBottom} ${position === 'RightUP' && styles.RightUP} ${position === 'RightBottom' && styles.RightBottom}`} >
      <div className={`${styles.keyboard_container} `}>
        <div className={styles.keyboard_skeleton}>
          {keyboard.map((row, index) => {
            return <div className={styles.keyboard_row} key={index}>
              {row.map((key, index) => {
                return <div id={`key${key}`} onClick={() => { handleFakeKBClick(key) }} className={`${styles.keyboard_key}  ${['->', 'Shift',].includes(key) && styles.keyboard_key15} ${['Caps', '<-', 'Enter'].includes(key) && styles.keyboard_key2}  ${['Space'].includes(key) && styles.keyboard_key3}`} key={index}>
                  {key === 'VOLUME' ? <div className={styles.KB_emoji}>{sound ? '🔊' : '🔇'}</div>
                    :
                    key}
                </div>
              })}
            </div>
          })

          }

        </div>
      </div>
    </div>
  )
}


const switchKB = () => {
  let old_state = window.localStorage.getItem("kb");
  window.localStorage.setItem(
    "kb",
    old_state === "true" ? "false" : "true"
  );
  if (old_state === "false") {
    document.getElementById("TKeyboard")!.classList.remove(styles.hidden);
  } else {
    document.getElementById("TKeyboard")!.classList.add(styles.hidden);
  }
}
export { switchKB };