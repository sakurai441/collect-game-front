import { createContext } from 'react'

import { useSWRInfinitePost } from '../../components/customHook'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { PlayingPost } from '../../components/posts'
import { Error, Data } from '../../components/useSWRInfo'

export const playPostContext = createContext()

export default function Playing() {
  const { posts, isLast, error, loadMorePosts } = useSWRInfinitePost({})

  if (error) return <Error />
  if (!posts) return <Data />

  return (
    <div className="flex flex-col h-screen min-h-screen">
      <Header />
      <main className="flex-1 text-center">
        {posts.map((post, index) => (
          <div key={index}>
            <playPostContext.Provider value={post}>
              <PlayingPost />
            </playPostContext.Provider>
          </div>
        ))}
        {isLast === false ? (
          <div className="mt-6 text-center">
            <button
              className="py-2 px-4 text-gray-700 bg-transparent hover:bg-gray-200 rounded-2xl border border-gray-400"
              onClick={loadMorePosts}
            >
              続きを読み込む
            </button>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
