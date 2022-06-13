import React, { useEffect } from 'react'
import { keyboard } from '../constants/constants'
import styles from '../styles/Loader.module.css'
import { useRouter } from 'next/router'
import TKeyboard from './TKeyboard'
export default function Loader() {

  const router = useRouter()
  const [fakeSearch, setFakeSearch] = React.useState('')

  const animation = (url: string) => {
    const arr_url = Array.from(`www.typez.com/${url}`)
    arr_url.forEach((key, i) => {
      key = key.toString();
      setTimeout(() => {
        document.getElementById(`key${key}`)?.classList.add(styles.clickAnimation);
        setTimeout(() => {
          document.getElementById(`key${key}`)?.classList.remove(styles.clickAnimation);
        }, 200);
        document.getElementById(`key${key}`)?.click();
        if (i === arr_url.length - 1) {
          const enterKey = document.getElementById(`keyEnter`)
          enterKey?.classList.add(styles.clickAnimation);
          setTimeout(() => {
            enterKey?.classList.remove(styles.clickAnimation);
          }, 200);
          setTimeout(() => {
            router.push(url)
          }, 100)
        }

      }, i * 50)

    })

  }
  useEffect(() => {
    const direction = window.location.search.split('?')[1]
    animation(direction || 'terminal')
  }, [])
  return (
    keyboard &&
    <div id='TypezLoader' className={styles.TypezLoader}>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.screen_container}>
            <div className={styles.screen_content}>
              <div className={styles.searcher}>{fakeSearch}</div>
            </div>
          </div>
        </div>
        <TKeyboard  fakeSearch={fakeSearch} setFakeSearch={(t) => { setFakeSearch(t) }} />
      </div>
    </div>
  )
}
