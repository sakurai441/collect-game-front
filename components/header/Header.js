import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import Image from 'next/image'
import Link from 'next/link'

import { logOut, useSWRUser } from '../customHook'
import { Error, Data } from '../useSWRInfo'
import TemporaryDrawer from './Drawer'

export default function Header() {

  const { data, error } = useSWRUser()
  if (error) return <Error />
  if(!data) return <Data/>

  return (
    <div className="flex top-0 h-12">
      <div className="flex mt-2 ml-5">
        <Link href="/">
          <a>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white rounded-full">
                <Image src={'/images/logo5.png'} width={100} height={100} alt="logoだよ" />
              </div>
              <span className="text-xl ">Game</span>
            </div>
          </a>
        </Link>
        <div className="flex absolute top-3 right-0 invisible mr-10 w-40 lg:visible">
          <ul className="group relative font-bold">
            <li className="flex mb-2">
              <a className="mt-1 text-sm text-center transition-all hover:cursor-pointer">{data.name}</a>
              <span className="ml-2">
                <ArrowDropDown />
              </span>
            </li>
            <ul className="w-40 border-t-2 border-red-400 opacity-0 group-hover:opacity-100 duration-500 group-hover:duration-700">
              <li className="mt-2 hover:bg-gray-100">
                <Link href="/about">
                  <a className="block">アプリの使い方</a>
                </Link>
              </li>
              <li className="mt-2 hover:bg-gray-100">
                <Link href="/posts/setting">
                  <a className="block">設定</a>
                </Link>
              </li>
              <li className="mt-2 hover:bg-gray-100">
                <a className="block hover:cursor-pointer" onClick={() => logOut()}>
                  ログアウト
                </a>
              </li>
            </ul>
          </ul>
        </div>
        <div className="absolute right-0 pr-4 lg:invisible">
          <TemporaryDrawer />
        </div>
      </div>
    </div>
  )
}
