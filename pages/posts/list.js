import { createContext } from 'react'

import { useSWRInfinitePost } from '../../components/customHook'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { Post } from '../../components/posts'
import { Data, Error } from '../../components/useSWRInfo'

export const postContext = createContext()

export default function List() {
  const { posts, isLast, error, loadMorePosts } = useSWRInfinitePost({})

  if (error) return <Error />
  if (!posts) return <Data />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="flex flex-wrap text-center">
          {posts.map((post, index) => (
            <div className="flex-col w-full text-center md:mt-20 md:w-1/3" key={index}>
              <postContext.Provider value={post}>
                <Post/>
              </postContext.Provider>
            </div>
          ))}
        </div>
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
