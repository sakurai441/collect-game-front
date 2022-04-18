import axios from 'axios'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useStateIfMounted } from 'use-state-if-mounted'

import auth from '../../lib/firebase'

const useSWRInfinitePost = () => {
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

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null
    if (token == null) return null
    return [`/posts?page=${pageIndex + 1}`, token]
  }

  const fetchWithToken = async (url) => {
    if (token == null) return null
    const res = await axios.get(url, token)
    return res.data
  }

  const initialData = [
    {
      title: 'タイトルが入るよ',
      image: '/images/kanasii.png',
    },
  ]

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetchWithToken, { fallbackData: initialData })
  const loadMorePosts = () => {
    setSize(size + 1)
  }

  const isLast = data ? data.filter((list) => list.length < 6).length > 0 : false
  const posts = data ? data.flat() : null

  return {
    posts,
    isLast,
    error,
    fetchWithToken,
    loadMorePosts,
  }
}

export default useSWRInfinitePost
