import Image from 'next/image'
import { NavBar, Introduction } from '../components/about'

export default function About() {
  return (
    <div>
      <NavBar/>
      <main>
        <div className=" text-center ">
          <h1 className="px-10 my-12 text-lg tracking-wider text-[#48D1CC]">
            ここではアプリの簡単な使い方について紹介します。
          </h1>
          <div className="mx-auto w-20 border-t border-gray-300/70"></div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap justify-center p-5 mt-20">
            <Introduction
              title={'新しいゲームの追加'}
              content={
                '好きな画像を挿入することができます。\nタイトルとその作品の特徴などを自由に書くことができます。\nあまり深く考えずに思ったことを書いてみましょう。\nなんなら空欄でOKです。\n買っただけのゲームも一緒に登録してしまいましょう。\n実況でみたとかでもじゃんじゃん登録していきましょう。'
              }
            />
            <div className="md:ml-20">
              <Image src={'/images/1.png'} alt="その一" width={500} height={500} objectFit={'contain'} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-5 mt-20">
            <Introduction
              title={'詳細の表示'}
              content={
                '登録したゲームはタイトルをクリック(タップ)することにより\n詳細画面が見れます。編集や削除などはここで行います。'
              }
            />
            <div className="md:ml-20">
              <Image src={'/images/2.png'} alt="その二" width={500} height={500} objectFit={'contain'} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-5 mt-20">
            <Introduction
              title={'ゲームをプレイする'}
              content={
                '進行ボタンをクリック(タップ)することによりゲームを始める\nことができます。ここで詳細画面(編集や削除)を開くことは\nできません'
              }
            />
            <div className="md:ml-20">
              <Image src={'/images/3.png'} alt="その三" width={500} height={500} objectFit={'contain'} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center p-5 mt-20">
            <Introduction
              title={'開始する'}
              content={
                'このゲームを開始するボタンを押すことで今日一日何時間\nゲームをしたのかがわかります。"念のための止めるボタン"も\n活用していただけると幸いです。'
              }
            />
            <div className="md:ml-20">
              <Image src={'/images/4.png'} alt="その四" width={500} height={500} objectFit={'contain'} />
            </div>
          </div>
        </div>
        <div></div>
      </main>
    </div>
  )
}
