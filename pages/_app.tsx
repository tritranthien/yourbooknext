import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const route = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  if (route.pathname.includes('/user') || route.pathname.includes('/login')) {
    return <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {
          getLayout(<Component {...pageProps} />)
        }
      </QueryClientProvider>
    </>
  }
  return <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </Head>
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  </>

}

export default MyApp
