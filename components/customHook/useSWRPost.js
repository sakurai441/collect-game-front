import axios from 'axios'
import { useEffect, useReducer } from 'react'
import useSWR from 'swr'
import { useStateIfMounted } from 'use-state-if-mounted'

import auth from '../../lib/firebase'

const useSWRPost = () => {
  const [token, setToken] = useStateIfMounted()

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        const config = { headers: { authorization: `Bearer ${token}` } }
        setToken(config)
      }
    })
  }, [])

  const initialData = [
    {
      title: '名前が入るよ',
      image: '/images/kanasii.png',
    },
  ]

  const fetchWithToken = async (url, token) => {
    if (token == null) return null
    const res = await axios.get(url, token)
    return res.data
  }

  const { data, error } = useSWR([`/posts`, token], fetchWithToken, { fallbackData: initialData })

  const posts = data ? data.flat() : null

  return {
    posts,
    error,
    fetchWithToken,
  }
}

export default useSWRPost
