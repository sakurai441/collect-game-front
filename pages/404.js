import Image from 'next/dist/client/image'
import Link from 'next/dist/client/link'

const Custom404 = () => {
  return (
    <div className="text-center">

      <div>
        <Image src={'/images/404.png'} alt="そんなものはない" width={500} height={500} objectFit="contain" />
      </div>
      <h1 className="font-fantasy text-2xl">そんなものはないみたい</h1>
      <div className='mt-12 '>
        <Link href="/">
          <a className='font-bold text-blue-500'>go back home →</a>
        </Link>
      </div>
    </div>
  )
}

export default Custom404

