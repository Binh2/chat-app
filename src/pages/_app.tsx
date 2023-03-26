import '@/styles/reset.css'
import '@/styles/global.css'
import "@/styles/reusables/form.css";
import "@/styles/scroll.scss"
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { initFirebaseApp } from '@/firebase'
import { AuthUserProvider } from '@/firebase/auth/AuthUserContext'

initFirebaseApp();

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
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  </>);
}
