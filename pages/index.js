import Link from 'next/link'
import CommonMeta from '../components/commonMeta/Meta'

export default function Home() {

  const data = [
    ['Signin', '/signin'],
    ['Signup', '/signup'],
    ['About', '/about'],
    ['Try Demo', '/guest'],
  ]

  return (
    <div className="w-full h-screen bg-cover bg-homepage2 md:bg-homepage">
      <CommonMeta />
      <main className="invisible md:visible">
        <div className="absolute tracking-wider text-gray-200 md:flex md:flex-col md:pt-72 md:pl-64 md:text-5xl">
          {data.map(([name, path]) => (
            <Link href={path} key={name}>
              <a className="mt-7 hover:underline">{name}</a>
            </Link>
          ))}
        </div>
      </main>
      <div className="visible md:invisible">
        <div className="flex flex-col pt-44 text-3xl tracking-wide text-center text-white">
          {data.map(([name, path]) => (
            <Link href={path} key={name}>
              <a className="visible mt-7 md:invisible">{name}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
