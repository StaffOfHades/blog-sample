import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"

interface Comment {
  content: string;
  id: string;
}

export const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComment] = useState<Array<Comment>>([])

  const fetchPosts = useCallback(async () => {
    const { data } = await axios.get(`comments-api/posts/${postId}/comments`)
    setComment(data)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const renderedComments = useMemo(() =>
    comments
      .map(post => (
        <li key={post.id} className="px-4 py-2">
          <h3 className="text-md text-gray-700">{post.content}</h3>
        </li>
      )
  ), [comments])


  return (
    <>
      <p className="mt-1 text-sm text-gray-600">{`${comments.length} Comment${comments.length > 1 ? 's' : ''}`}</p>
      <ul className="bg-white mt-2">
        {renderedComments}
      </ul>
    </>
  )
}
