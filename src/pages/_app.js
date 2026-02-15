import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo2.png" />
        <link rel="apple-touch-icon" href="/logo2.png" />
      </Head>
      <main id="main-content" tabIndex={-1} className='font-sans'>
        <Component {...pageProps} />
      </main>
    </>
  )
}
