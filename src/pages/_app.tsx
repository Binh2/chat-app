import '@/styles/reset.css'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { initFirebaseApp } from '@/firebase'
import { initAuthEmulator } from '@/firebase/auth'
import { initFirestoreEmulator } from '@/firebase/firestore'

initFirebaseApp();
initAuthEmulator();
initFirestoreEmulator();

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <style jsx global>{`
      :root {
        font-family: ${inter.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </>);
}
