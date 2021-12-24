import { ModerationComment } from "@udemy.com/global/types"
import { useMemo } from "react"

export const CommentList = ({ comments }: { comments: Record<string, ModerationComment> }) => {
  const renderedComments = useMemo(() =>
    Object.values(comments)
      .map(post => (
        <li key={post.id} className="px-4 py-2">
          <h3 className="text-md text-gray-700">{post.content}</h3>
        </li>
      )
  ), [comments])

  const commentLength = useMemo(() => Object.values(comments).length, [comments])

  return (
    <>
      <p className="mt-1 text-sm text-gray-600">{`${commentLength} Comment${commentLength > 1 ? 's' : ''}`}</p>
      <ul className="bg-white mt-2">
        {renderedComments}
      </ul>
    </>
  )
}
