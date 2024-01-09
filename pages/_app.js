import '@/styles/globals.css'
import { FronteraProvider } from '@/context/FronteraProvider'

export default function App({ Component, pageProps }) {
  return (
    <FronteraProvider>
      <Component {...pageProps} />
    </FronteraProvider>
  )
}
