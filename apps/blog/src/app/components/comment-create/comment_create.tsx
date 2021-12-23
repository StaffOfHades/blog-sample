import axios from "axios"
import { useState } from "react"

export const CommentCreate = ({ postId }: { postId: string  }) => {
  const [content, setContent] = useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post(`comments-api/posts/${postId}/comments`, { content })
    setContent('')
  }

  return (
    <div className="mt-4 md:mt-2">
      <form onSubmit={onSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-2 bg-white sm:py-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  New Comment
                </label>
                <input
                  type="text"
                  name="content"
                  id="content"
                  value={content}
                  onChange={({ target: { value }}) => setContent(value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
