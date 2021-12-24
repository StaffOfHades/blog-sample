import { ModerationComment, ModerationStatus } from "@udemy.com/global/types"
import cx from "classnames"
import { useMemo } from "react"

export const CommentList = ({ comments }: { comments: Record<string, ModerationComment> }) => {
  const renderedComments = useMemo(() =>
    Object.values(comments)
      .map(comment => (
        <li key={comment.id} className="px-4 py-2">
          <h3
            className={cx(
              comment.status === ModerationStatus.Approved ? "text-md text-gray-700" : "italic",
              comment.status === ModerationStatus.Pending && "text-gray-500",
              comment.status === ModerationStatus.Denied && "text-red-400",
            )}
          >
            {
              comment.status === ModerationStatus.Approved ?
                  comment.content
                :
                  comment.status === ModerationStatus.Pending ?
                      "This comment is awaiting moderation"
                    :
                      "This comment has been rejected"
            }
          </h3>
        </li>
      )
  ), [comments])

  const commentLength = useMemo(() => Object.values(comments).length, [comments])

  return (
    <>
      <p className="mt-1 text-sm text-gray-600">{`${commentLength} Comment${commentLength !== 1 ? 's' : ''}`}</p>
      <ul className="bg-white mt-2">
        {renderedComments}
      </ul>
    </>
  )
}
