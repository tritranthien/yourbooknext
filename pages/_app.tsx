import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
const Navigation = dynamic(() => import('../components/Header/Navigation'), { ssr: false })
import Footer from '../components/Footer/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '../context/ThemeContext'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const queryClient = new QueryClient()

function MyApp({ Component, pageProps, router }: AppPropsWithLayout & { router: any }) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  const pathname = router?.pathname || '';
  const isSpecialRoute = pathname && (
    pathname.includes('/user') || 
    pathname.includes('/login') || 
    pathname.includes('/admin')
  );

  return (
    <>
      <Head>
        <title>YourBook - Thỏa sức đọc truyện</title>
      </Head>

      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {!isSpecialRoute && <Navigation />}
           {getLayout(<Component {...pageProps} />)}
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
          />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp
