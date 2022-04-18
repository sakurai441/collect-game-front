import Head from 'next/head'

export default function CommonMeta({ title = "Game Collection", description = "最後にゲームをしたのはいつですか？遊ぶ心を忘れない。時間のない全ての人に捧げる、積んでよし、消化してよしのブラウザアプリ、積みゲーコレクション。" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  )
}