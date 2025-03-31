import { Lora } from 'next/font/google'
import '../styles/globals.css'
const lora = Lora({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={lora.className}>
      <Component {...pageProps} />
    </main>
  )
}
