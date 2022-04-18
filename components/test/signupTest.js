import Link from 'next/link'
import { useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import { MiniTextInput, MiniPrimaryButton } from '../UIkit'

export default function SignUpTest() {
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

  const createUser = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度入力してください。')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは六文字以上でお願いします。')
      return false
    }
    return await axios.post('/auth/registrations').then((e) => {
      console.log(e)
    })
  }

  return (
    <div className="h-screen lg:flex">
      <div className="bg-cover lg:w-1/4 lg:bg-signup">
        <p className="invisible text-3xl font-bold text-center lg:visible lg:mt-10">睡眠を削るしかないのか？</p>
      </div>
      <div className="lg:w-3/4">
        <div className="mt-56 text-center">
          <h1 className="mb-6 text-3xl font-bold">アカウントを作成する</h1>
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
              <a className="text-2xl font-bold hover:underline cursor-pointer">すでにアカウントをお持ちですか？</a>
            </Link>
            <Link href="/about">
              <a className="mt-3 text-2xl font-bold hover:underline cursor-pointer">どんなアプリなの？</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
