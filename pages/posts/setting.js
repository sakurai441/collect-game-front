import DeleteIcon from '@material-ui/icons/Delete'
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import { PrimaryButton, TextInput, DummyTextArea, Name } from '../../components/UIkit'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import auth from '../../lib/firebase'

export default function Setting(id) {
  const router = useRouter()
  const [name, setName] = useStateIfMounted('')

  const inputUserName = useCallback(
    (e) => {
      setName(e.target.value)
    },
    [setName]
  )

  const updateUserName = async (id) => {
    const data = new FormData()
    data.append('name', name)
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        // if (name === 'ゲストユーザー') return alert('ゲストユーザーにはなれないよ。')
        if (user.email === process.env.NEXT_PUBLIC_GUEST_EMAIL)
          return alert('ゲストユーザーなので名前が変えることができないみたい。')
        try {
          await axios.patch(`/users/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
          })
          router.push('/posts/new')
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  return (
    <div className="flex flex-col h-screen min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 justify-center items-center h-5/6 text-center">
        <div>
          <h1 className="mb-5 text-xl font-bold">このアプリに必要のない名前を変える？</h1>
          <Name />
          <TextInput id={'name'} label={'名前を入れてね'} type={'text'} onChange={inputUserName} />
          <div className="text-center md:absolute md:-mt-12 md:ml-80 md:w-40">
            <PrimaryButton label={'変更する'} variant={'outlined'} onClick={() => updateUserName()} />
          </div>
        </div>
        <div className="mt-3">
          <a
            href="https://github.com/NotFound441/docker-NextonRails"
            target="_blank"
            className="font-serif text-xl"
            rel="noopener noreferrer"
          >
            <div className="flex justify-center space-x-4">
              <div className="pt-2 h-12">
                <GitHubIcon />
              </div>
              <span className="pt-2 text-xl">Source code for Github</span>
            </div>
          </a>
          <a href="https://twitter.com/engineerrrrr12" target="_blank" className="font-serif text-xl" rel="noreferrer">
            <div className="flex justify-center mr-5 space-x-4">
              <div className="pt-2 h-12">
                <TwitterIcon />
              </div>
              <span className="pt-2 text-xl">Developer of Twitter</span>
            </div>
          </a>
          <Link href="/remove">
            <a className="font-serif text-xl">
              <div className="flex justify-center mr-5 space-x-4">
                <div className="pt-2 h-12">
                  <DeleteIcon />
                </div>
                <span className="pt-2 text-xl text-red-400">Delete Your Account?</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="invisible">
          <DummyTextArea />
        </div>
      </main>
      <Footer />
    </div>
  )
}
