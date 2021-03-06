import Link from 'next/link'
import React, { useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import { TextInput, PrimaryButton } from '../UIkit'

export default function SignInTest() {
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
        <div className="mt-56 text-center">
          <h1 className="mb-6 text-3xl font-bold">サインイン</h1>
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
            <p className="text-2xl">アカウントを持っていませんか?</p>
          </div>
          <Link href="/signup">
            <a className="text-lg hover:underline cursor-pointer">アカウントを作成するよ</a>
          </Link>
        </div>
      </div>
      <div className="bg-cover bg-login lg:w-3/4"></div>
    </div>
  )
}
