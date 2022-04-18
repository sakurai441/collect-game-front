import axios from 'axios'
import firebase from 'firebase/compat/app'
import Link from 'next/link'
import { useEffect, useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import { DeleteButton, TextInput } from '../components/UIkit'
import auth from '../lib/firebase'

export default function Remove() {
  const [email, setEmail] = useStateIfMounted(),
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

  const deleteUser = () => {
    const user = auth.currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(email, password)
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            try {
              user.delete().then(() => {
                console.log('削除しました')
              })
            } catch (e) {
              console.log(e)
            }
          }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const destroyUser = async (id) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        const config = { headers: { authorization: `Bearer ${token}` } }
        try {
          await axios.delete(`/users/${id}`, config).then(() => {
            alert('また登録してね')
          })
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  const handleDestroyUser = () => {
    const answer = window.prompt('本当に削除しますか？削除するには以下に「削除します」と入力してください。')
    if (answer === '削除します') {
      destroyUser()
      deleteUser()
    } else {
      window.alert('おかえりなさい')
    }
  }

  return (
    <div className="flex flex-col h-screen min-h-screen">
      <main className="flex flex-col flex-1 justify-center items-center h-5/6 text-center">
        <div>
          <div>
            <h1 className="font-fantasy text-lg text-red-400">
              削除前にメールアドレスとパスワードを入力してください。
            </h1>
            <div className="mt-3">
              <TextInput id={'email'} label={'Email'} type={'email'} onChange={inputEmail} />
              <TextInput id={'password'} label={'Password'} type={'password'} onChange={inputPassword} />
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-2 h-10">
            <DeleteButton
              label={'Delete Your Account'}
              color={'error'}
              variant={'outlined'}
              onClick={() => handleDestroyUser()}
            />
          </div>
          <div className="mt-12">
            <Link href="/posts/setting">
              <a className="font-bold text-blue-500 opacity-60 hover:opacity-100 duration-500">やっぱりやめようかな</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
