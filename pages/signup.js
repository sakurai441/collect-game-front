import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import { MiniTextInput, MiniPrimaryButton } from '../components/UIkit'
import ResHeader from '../components/header/RespHeader'


import auth from '../lib/firebase'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useStateIfMounted(''),
    [password, setPassword] = useStateIfMounted(''),
    [confirmPassword, setConfirmPassword] = useStateIfMounted('')

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    [setEmail]
  )

  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value)
    },
    [setPassword]
  )

  const inputConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value)
    },
    [setConfirmPassword]
  )

  const push = () => {
    router.push('/posts/new')
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && setTimeout(push, 1000)
    })
  }, [])

  const createUser = async (e) => {
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度入力してください。')
      return false
    }
    if (email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です。')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは六文字以上でお願いします。')
      return false
    } else {
      await auth.createUserWithEmailAndPassword(email, password).catch((e) => alert(e.message))
      const token = await auth.currentUser.getIdToken(false)
      const data = { token }
      try {
        await axios.post('/auth/registrations', data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="h-screen lg:flex">
      <div className="bg-cover lg:w-1/4 lg:bg-signup">
        <p className="invisible text-3xl font-bold text-center lg:visible lg:mt-10">睡眠を削るしかないのか？</p>
      </div>
      <div className="lg:w-3/4">
        <ResHeader/>
        <div className="mt-10 text-center md:mt-56">
          <h1 className="mb-6 text-xl font-bold lg:text-3xl">アカウントを作成する</h1>
        </div>
        <MiniTextInput id={'email'} label={'Email'} type={'email'} onChange={inputEmail} />
        <MiniTextInput id={'password'} label={'Password'} type={'password'} onChange={inputPassword} />
        <MiniTextInput
          id={'confirmPassword'}
          label={'ConfirmPassword'}
          type={'password'}
          onChange={inputConfirmPassword}
        />
        <div className="mt-16 text-center">
          <MiniPrimaryButton label={'アカウントを作成する'} variant={'contained'} onClick={() => createUser()} />
        </div>
        <div className="mt-12 text-sm font-semibold text-center text-gray-700">
          <div className=" flex flex-col">
            <Link href="/signin">
              <a className="text-xl font-bold text-red-600 hover:underline cursor-pointer lg:text-2xl lg:text-black">すでにアカウントをお持ちですか？</a>
            </Link>
            <Link href="/about">
              <a className="pb-32 mt-3 text-xl font-bold hover:underline cursor-pointer lg:text-2xl">どんなアプリなの？</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
