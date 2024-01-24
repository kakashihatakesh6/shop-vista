import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" className='overflow-x-hidden'>
      <Head>
        <link rel="icon" href="/logo-shop-round.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>

      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
    </Html>
  )
}
