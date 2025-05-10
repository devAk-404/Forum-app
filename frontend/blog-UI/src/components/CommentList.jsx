export default function RenderComments({
  commentList,
  user,
  replyingTo,
  replyText,
  onStartReply,
  onReplyTextChange,
  onPostReply,
  onCancelReply,
  onDeleteComment,
}) {
  return (
    <ul className="space-y-6">
      {commentList.map((comment) => (
        <li key={comment.id} className="bg-gray-50 rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">
                {comment.user.username}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()} -{" "}
                {new Date(comment.createdAt).toLocaleTimeString()}
              </span>
            </div>
            {user?.id === comment.userId && (
              <button
                onClick={() => onDeleteComment(comment.id)}
                className="text-red-500 hover:text-red-700 text-sm focus:outline-none"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-2">{comment.content}</p>

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-4">
              <h6 className="text-sm font-semibold text-gray-700 mb-2">
                Replies:
              </h6>
              <RenderComments
                commentList={comment.replies}
                user={user}
                replyingTo={replyingTo}
                replyText={replyText}
                onStartReply={onStartReply}
                onReplyTextChange={onReplyTextChange}
                onPostReply={onPostReply}
                onCancelReply={onCancelReply}
                onDeleteComment={onDeleteComment}
              />
            </div>
          )}

          <button
            onClick={() => onStartReply(comment.id)}
            className="text-blue-500 hover:text-blue-700 text-sm focus:outline-none mt-2"
          >
            Reply
          </button>

          {replyingTo === comment.id && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
                placeholder="Your reply..."
                className="w-full h-16 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => onPostReply(comment.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-3 py-2 text-sm mt-1 focus:outline-none"
              >
                Post Reply
              </button>
              <button
                onClick={onCancelReply}
                className="text-gray-500 hover:text-gray-700 text-sm ml-2 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
