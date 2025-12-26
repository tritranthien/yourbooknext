import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="description" content="YourBook - Nền tảng đọc truyện online miễn phí với hàng ngàn đầu truyện hấp dẫn." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YourBook" />
      </Head>
      <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
