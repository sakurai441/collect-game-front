import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import { MiniTextInput, MiniPrimaryButton, TextArea, ImageArea } from '../UIkit'

export default function NewTest() {
  const router = useRouter()

  const [title, setTitle] = useStateIfMounted(''),
    [content, setContent] = useStateIfMounted(''),
    [image, setImage] = useStateIfMounted(),
    [preview, setPreview] = useStateIfMounted('')

  const inputTitle = useCallback(
    (e) => {
      setTitle(e.target.value)
    },
    [setTitle]
  )

  const inputContent = useCallback(
    (e) => {
      setContent(e.target.value)
    },
    [setContent]
  )

  const uploadImage = useCallback((e) => {
    setImage(e.target.files[0])
  }, [])

  const previewImage = useCallback((e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
  }, [])

  const push = () => {
    router.push('/posts/setting')
  }

  const createGame = async () => {
    const data = new FormData()
    data.append('title', title)
    data.append('content', content)
    data.append('image', image)
    if (title === '') {
      alert('タイトルは入力してね。')
      return false
    }
    if (content.length > 255) {
      alert('255字以下でお願いします┌○ﾍﾟｺﾘ')
      return false
    } else {
      try {
        axios.post('/posts')
        // router.push("/")
        setTimeout(push, 1000)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen min-h-screen">
      <main className="flex-1 text-center">
        <h1 className="mt-7 text-3xl">何のゲームをしようか？</h1>
        <div className="mt-5">
          <ImageArea
            onChange={(e) => {
              uploadImage(e)
              previewImage(e)
            }}
          />
          {preview ? (
            <Image src={preview} alt="sample" width={500} height={400} objectFit="contain" />
          ) : (
            <div>
              <Image src={'/images/neoti.png'} alt="sample" width={500} height={400} objectFit="contain" />
              <p>※サンプル画像です</p>
            </div>
          )}
          <MiniTextInput id={'title'} label={'Title'} type={'text'} onChange={inputTitle} />
          <TextArea
            placeholder={
              '感想・モチベ・学んだこと・好きなキャラ・エピソード・何でもござれのフリースペース(サクッと感想欄）'
            }
            onChange={inputContent}
          />
          <div className="mt-5">
            <MiniPrimaryButton label={'ゲームを追加する'} variant={'contained'} onClick={() => createGame()} />
          </div>
        </div>
      </main>
    </div>
  )
}
