import { PostAggregate } from "@udemy.com/global/types"
import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"

import { CommentCreate } from "../comment-create"
import { CommentList } from "../comment-list"

export const PostList = () => {
  const [posts, setPosts] = useState<Record<string, PostAggregate>>({})

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("query-service/posts")
      setPosts(data)
    } catch(error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const renderedPosts = useMemo(() => Object.values(posts)
    .map(post => (
      <div key={post.id} className="group rounded border-solid border-2 border-gray-300 px-4 py-2">
        <h3 className="text-lg font-medium leading-6 text-gray-700">{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    )
  ), [posts])


  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-around content-between">
          {renderedPosts}
        </div>
      </div>
    </div>
  )
}
