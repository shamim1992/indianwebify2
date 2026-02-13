import { Lora } from 'next/font/google'
import Head from 'next/head'
import '../styles/globals.css'
const lora = Lora({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Default Favicon */}
        <link rel="icon" type="image/png" href="/logo2.png" />
        <link rel="apple-touch-icon" href="/logo2.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <main className='font-sans'>
        <Component {...pageProps} />
      </main>
    </>
  )
}
