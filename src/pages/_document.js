import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        {/* Preload the logo used in Navbar on every page */}
        <link rel="preload" href="/logo2.png" as="image" type="image/png" />
        {/* DNS prefetch for EmailJS (used on contact page) */}
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
