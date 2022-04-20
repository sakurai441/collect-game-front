import 'tailwindcss/tailwind.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import auth from '../lib/firebase'

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_DOMAIN : process.env.NEXT_PUBLIC_API_BASE_URL
// axios.defaults.baseURL = 'http://localhost:3000/api/v1'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (router.pathname === '/signin') return
      if (router.pathname === '/signup') return
      if (router.pathname === '/') return
      if (router.pathname === '/about') return
      if (router.pathname === '/guest') return
      user ? null : router.push('/signin')
    })
  }, [router.pathname])

  return <Component {...pageProps} />
}
