import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Navigation from '../components/Header/Navigation'
import Footer from '../components/Footer/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

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

  const isSpecialRoute = route.pathname.includes('/user') || 
                        route.pathname.includes('/login') || 
                        route.pathname.includes('/admin');

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>YourBook - Thỏa sức đọc truyện</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        {!isSpecialRoute && <Navigation />}
        
        {isSpecialRoute ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}

        {!isSpecialRoute && <Footer />}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}

export default MyApp
