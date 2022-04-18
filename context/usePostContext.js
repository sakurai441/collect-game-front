// import { createContext, useContext } from 'react'
// import { useSWRInfinitePost, useSWRPost } from '../components/customHook'
// import { PostModal, TestPost } from '../components/posts'
// import { Error, Data } from '../components/useSWRInfo'

// export const postContext = createContext()

// export function usePostContext () {
//   return useContext(postContext)
// }

// export default function PostProvider({children}) {
//   const { post, error } = useSWRInfinitePost()
//   if (error) return <Error />
//   if (!post) return <Data />

//   return (
//     <postContext.Provider value={post}>
//       {children}
//     </postContext.Provider>
//   )
// }

