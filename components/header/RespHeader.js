import Image from 'next/image'
import Link from "next/link"

export default function ResHeader() {
  return (
    <div className="visible md:invisible">
      <div className="flex justify-center space-x-3">
        <Link href="/">
          <a>
            <Image src={'/images/logo5.png'} width={30} height={30} alt="logoだよ" />
          </a>
        </Link>
        <Link href="/">
          <a className='mt-1.5'>
          <Image src={'/images/title.png'} width={175} height={15} alt="logoだよ" />
          </a>
        </Link>
      </div>
    </div>
  )
}
