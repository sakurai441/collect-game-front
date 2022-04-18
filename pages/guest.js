import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { MiniPrimaryButton } from '../components/UIkit'
import auth from '../lib/firebase'


export default function Guest() {
  const router = useRouter()

  const destroyAll = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        const config = { headers: { authorization: `Bearer ${token}` } }
        try {
          await axios.delete('/posts/destroy_all', config)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/posts/new')
    })
  }, [])


  const guestLogin = () => {
    auth.signInWithEmailAndPassword(process.env.NEXT_PUBLIC_GUEST_EMAIL, process.env.NEXT_PUBLIC_GUEST_PASSWORD)
    try {
      setTimeout(destroyAll, 5000)
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="h-screen text-center">
      <div className="flex flex-col flex-1 justify-center items-center h-5/6 text-center">
        <div className="mb-6 space-y-4 text-2xl font-bold">
          <h1>あなたはこれからゲストとしてログインします。</h1>
          <h2>よろしいですね？</h2>
          <p className="text-sm text-red-400">※ゲストユーザーのデータは一定時間経過後消えます</p>
        </div>
        <MiniPrimaryButton
          label={'これからゲストとしてログインするよ'}
          variant={'outlined'}
          color={'primary'}
          onClick={() => guestLogin()}
        />
        <Link href="/">
          <a className="mt-6 font-bold text-blue-500 hover:opacity-70">ホーム画面に戻りたい</a>
        </Link>
      </div>
    </div>
  )
}
