import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (localStorage.getItem('kb') === null) {
      localStorage.setItem('kb', 'false')
    }
  }, [])
  return (<>
    <Head>
      <title>Typez</title>
      <meta name="description" content="Terminal based typetests." />
      <link rel="icon" href="/tempLOGO.png" />
    </Head>
    <Component {...pageProps} />
  </>)
}

export default MyApp
