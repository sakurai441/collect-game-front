import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import Image from 'next/image'
import { useContext } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import { playPostContext } from '../../pages/posts/playing'
import { DeleteButton, DummyTextArea, StopWatch } from '../UIkit'

dayjs.extend(timezone)
dayjs.extend(utc)

const PlayingPost = () => {
  const [id, setId] = useStateIfMounted(),
    [title, setTitle] = useStateIfMounted(),
    [content, setContent] = useStateIfMounted(),
    [image, setImage] = useStateIfMounted(),
    [created, setCreated] = useStateIfMounted()

  const post = useContext(playPostContext)

  const setPost = async () => {
    setId(post.id)
    setTitle(post.title)
    setContent(post.content)
    if (post.image.url) {
      setImage(post.image.url)
    }
    setCreated(post.created_at)
  }

  return (
    <div>
      {id ? (
        <div className="py-16 text-center">
          {image ? (
            <Image src={image} width={500} height={300} objectFit={'contain'} alt="あなたの画像" />
          ) : (
            <Image src={'/images/kanasii.png'} width={200} height={150} objectFit="contain" alt="sample photo" />
          )}
          <div className="my-5 w-full">
            <h1 className="mt-1 font-bold md:text-3xl">{title}</h1>
            <p className="mt-5 lg:px-96">{content}</p>
            <div className="mt-5">
              <StopWatch />
            </div>
            <p className="mt-5 text-xs">追加日: {dayjs(created).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')}</p>
            {/* <p className="mt-5 text-xs">追加日: {dayjs(created).format('YYYY-MM-DD HH:mm:ss', {timeZone: "Asia/Tokyo"})}</p> */}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center my-3">
            {post.image.url ? (
              <Image src={post.image.url} width={200} height={150} alt="あなたの画像" />
            ) : (
              <Image src={'/images/kanasii.png'} width={200} height={150} objectFit="contain" alt="sample photo" />
            )}
            <div className="pl-5 w-1/2 text-left">
              <h1 className="font-bold md:text-3xl ">{post.title}</h1>
              <p className="mt-5 text-xs">
                追加日: {dayjs(post.created_at).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')}
              </p>
              {/* <p className="mt-5 text-xs">追加日: {dayjs(post.created_at).format('YYYY-MM-DD HH:mm:ss', {timeZone: "Asia/Tokyo"})}</p> */}
              <div className="visible pt-5 md:invisible">
                <DeleteButton label={'進行'} variant={'outlined'} color={'success'} onClick={() => setPost(post.id)} />
              </div>
            </div>
            <div className="invisible mt-28 md:visible">
              <DeleteButton label={'進行'} variant={'outlined'} color={'success'} onClick={() => setPost(post.id)} />
            </div>
          </div>
        </div>
      )}
      <div className="invisible">
        <DummyTextArea />
      </div>
    </div>
  )
}

export default PlayingPost
