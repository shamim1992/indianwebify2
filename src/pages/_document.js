import { Html, Head, Main, NextScript } from 'next/document'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Indian Webify',
  url: 'https://indianwebify.com',
  logo: 'https://indianwebify.com/logo2.png',
  description: 'Indian Webify offers professional website development, app development, AI solutions, digital marketing, and research projects.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9856876212',
    email: 'mhsdigitalhub@gmail.com',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rajajinagar',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560010',
    addressCountry: 'IN',
  },
  sameAs: [],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        {/* DNS prefetch for EmailJS (used on contact page) */}
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        {/* Organization structured data — present on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
