import { Modal } from '@material-ui/core'
import { useRouter } from 'next/router'

import axios from 'axios'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import Image from 'next/image'
import { useContext, useState, useCallback } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import auth from '../../lib/firebase'
import { postContext } from '../../pages/posts/list'
import { DeleteButton } from '../UIkit'
import { EditModal } from '.'

dayjs.extend(timezone)
dayjs.extend(utc)

const PostModal = (props) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useStateIfMounted(''),
    [content, setContent] = useStateIfMounted('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const post = useContext(postContext)

  const router = useRouter()


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

  const handleUpdatePost = (id) => {
    const data = new FormData()
    data.append('title', title)
    data.append('content', content)
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        if (title === '') {
          alert('タイトルは入力してね')
          return false
        }
        if (content.length > 255) {
          alert('255字以下でお願いします┌○ﾍﾟｺﾘ')
          return false
        } else {
          try {
            axios.patch(`/posts/${id}`, data, {
              headers: { authorization: `Bearer ${token}` },
            })
            router.push('/posts/new')
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  }

  const body = (
    <div className="overflow-auto mt-12 bg-white border border-black lg:absolute lg:top-1/2 lg:left-1/2 lg:-mt-12 lg:-translate-x-1/2 lg:-translate-y-1/2">
      <div className="py-20 text-center lg:px-40">
        {post.image.url ? (
          <Image src={post.image.url} alt="画像だよ" width={400} height={300} objectFit="contain" />
        ) : (
          <Image src={'/images/kanasii.png'} alt="画像だよ" width={400} height={300} objectFit="contain" />
        )}
        <div className="mt-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="lg:text-left">
            <p className="overflow-y-auto mt-7 text-sm">{post.content}</p>
            <p className="mt-3 text-xs">
              追加日: {dayjs(post.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 space-x-2 text-right">
        <DeleteButton
          label={'編集'}
          color={'secondary'}
          variant={'outlined'}
          onClick={() => {
            handleOpen()
          }}
        />
        <DeleteButton label={'削除'} color={'error'} variant={'outlined'} onClick={() => props.onDelete()} />
      </div>
      <div>
        <EditModal
          open={open}
          onClose={handleClose}
          onTitle={inputTitle}
          onContent={inputContent}
          onUpdate={() => handleUpdatePost(post.id)}
        />
      </div>
    </div>
  )
  return (
    <Modal open={props.open} onClose={props.onClose}>
      {body}
    </Modal>
  )
}

export default PostModal
