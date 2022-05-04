import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import { TextInput, PrimaryButton } from '../components/UIkit'
import ResHeader from '../components/header/RespHeader'
import auth from '../lib/firebase'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useStateIfMounted(''),
    [password, setPassword] = useStateIfMounted('')

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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/posts/list')
    })
  }, [])

  const logIn = (e) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です。')
      return false
    } else {
      auth.signInWithEmailAndPassword(email, password).catch((e) => alert(e.message))
    }
  }

  return (
    <div className="h-screen lg:flex">
      <div className=" lg:w-1/4 ">
        <div className='pt-12'>
          <ResHeader/>
        </div>
        <div className="mt-10 text-center md:mt-56">
          <h1 className="mb-6 text-2xl font-bold lg:text-3xl ">サインイン</h1>
        </div>
        <div>
          <TextInput id={'email'} label={'Email'} type={'email'} onChange={inputEmail} />
          <TextInput id={'password'} label={'Password'} type={'password'} onChange={inputPassword} />
        </div>
        <div className="mt-16 text-center">
          <PrimaryButton label={'さいんいんするよ！'} variant={'contained'} onClick={() => logIn()} />
        </div>
        <div className="mt-12 text-sm font-bold text-center text-gray-700">
          <div className="mb-2">
            <p className="text-base text-red-600 lg:text-lg">アカウントを持っていませんか?</p>
          </div>
          <Link href="/signup">
            <a className="text-2xl hover:underline cursor-pointer">アカウントを作成するよ→</a>
          </Link>
        </div>
      </div>
      <div className="bg-cover bg-login lg:w-3/4"></div>
    </div>
  )
}
