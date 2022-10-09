import { useEffect, useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import '@styles/globals.css'
import { AnimatePresence } from 'framer-motion';
import { Router } from 'next/router';
function MyApp({ Component, pageProps }: AppProps) {
  const [location, setLocation] = useState('')
  Router.events.on('routeChangeStart', () => { console.log('loading') })
  Router.events.on('routeChangeComplete', () => { console.log('route changed successfully') })
  Router.events.on('routeChangeError', () => { console.log('error when changing route') })

  useEffect(() => {
    setLocation(window.location.pathname.slice(1))
  }, [Component])
  return (<>
    <Head>
      <title>{`Typez ${location !== "" ? '- ' + location : ""} `}</title>
      <meta name="description" content="Terminal based typetests." />
      <link rel="icon" href="/tempLOGO.png" />
    </Head>
    <SessionProvider
      session={pageProps.session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      ><Component {...pageProps} />

      </AnimatePresence>

    </SessionProvider>
  </>)
}

export default MyApp
