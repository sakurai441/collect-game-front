import axios from 'axios'
import { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import { useStateIfMounted } from 'use-state-if-mounted'

import auth from '../../lib/firebase'

const useSWRUser = () => {
  const [token, setToken] = useStateIfMounted()

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken()
        const config = { headers: { authorization: `Bearer ${token}` } }
        setToken(config)
      }
    })
  }, [])

  const fetchWithToken = async (url, token) => {
    if (token == null) return null
    const res = await axios.get(url, token)
    return res.data
  }
  const initialData = {
    name: 'あなたの名前が入るよ',
  }

  const { data, error } = useSWR([`/users`, token], fetchWithToken, { fallbackData: initialData })

  return {
    data,
    error,
    fetchWithToken,
  }
}

export default useSWRUser
