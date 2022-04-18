import axios from 'axios'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'

import auth from '../../lib/firebase'
import { postContext } from '../../pages/posts/list'
import { DummyTextArea } from '../UIkit'
import { PostModal } from '../posts'

dayjs.extend(timezone)
dayjs.extend(utc)

const Post = () => {
  const router = useRouter()
  const [open, setOpen] = useStateIfMounted(false),
    [token, setToken] = useStateIfMounted()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const post = useContext(postContext)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(false)
        const config = { headers: { authorization: `Bearer ${token}` } }
        setToken(config)
      }
    })
  }, [])

  const handleDeletePost = async (id) => {
    const sure = confirm('削除しますか？')
    if (sure) {
      try {
        await axios.delete(`/posts/${id}`, token).then(() => {
          handleClose()
          router.push('/posts/list')
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="text-center">
      {post.image.url ? (
        <Image src={post.image.url} alt="画像だよ" width={400} height={300} objectFit="contain" />
      ) : (
        <Image src={'/images/kanasii.png'} alt="画像だよ" width={400} height={300} objectFit="contain" />
      )}
      <div>
        <button
          className="mt-1 font-bold hover:opacity-60 hover:cursor-pointer md:text-3xl"
          onClick={() => handleOpen()}
        >
          {post.title}
        </button>
        <p suppressHydrationWarning className="mt-5 text-xs">
          追加日: {dayjs(post.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Tokyo' })}
        </p>
      </div>
      <div>
        <PostModal post={post} open={open} onClose={handleClose} onDelete={() => handleDeletePost(post.id)} />
      </div>
      <div className="invisible">
        <DummyTextArea />
      </div>
    </div>
  )
}

export default Post
