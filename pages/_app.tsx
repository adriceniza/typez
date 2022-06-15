import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import Head from 'next/head'
import { useEffect } from 'react'
import '../styles/globals.css'
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
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  </>)
}

export default MyApp
