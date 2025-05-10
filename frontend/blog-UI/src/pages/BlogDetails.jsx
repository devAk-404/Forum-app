import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlog, deleteBlog } from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  getComments,
  postComment,
  deleteComment,
} from "../services/commentService";
import RenderComments from "../components/CommentList";

export default function BlogDetails() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { id: blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    getBlog(blogId).then(setBlog).catch(console.error);
    fetchComments();
  }, [blogId]);

  const handleDeleteBlog = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this forum?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBlog(blog.id, token);
      await Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
      Swal.fire("Error", "Failed to delete blog. Please try again.", "error");
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getComments(blogId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      await postComment(
        blogId,
        {
          userId: user.id,
          username: user.username,
          content: newComment,
        },
        token
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(blogId, commentId, user.id, token);
      fetchComments();
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are not authorized to delete this comment.");
      } else {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleStartReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handlePostReply = async (parentCommentId) => {
    if (!replyText.trim()) return;
    try {
      await postComment(
        blogId,
        {
          userId: user.id,
          username: user.username,
          content: replyText,
          parentId: parentCommentId,
        },
        token
      );
      setReplyingTo(null);
      setReplyText("");
      fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  if (!blog || !user) {
    return <p className="text-center py-8 text-lg text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-200 to-blue-50 shadow-md hover:shadow-xl mt-16 max-w-3xl mx-auto py-12 px-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
        {blog.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        By <span className="font-medium">{blog.createdBy.username}</span> on{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
      <div
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      {blog.createdById === user.id && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(`/edit/${blog.id}`)}
            className="text-blue-600 hover:underline font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteBlog}
            className="text-red-600 hover:underline font-medium"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
        {comments.length > 0 ? (
          <RenderComments
            commentList={comments}
            user={user}
            replyingTo={replyingTo}
            replyText={replyText}
            onStartReply={handleStartReply}
            onReplyTextChange={setReplyText}
            onPostReply={handlePostReply}
            onCancelReply={() => setReplyingTo(null)}
            onDeleteComment={handleDeleteComment}
          />
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to leave one!</p>
        )}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Leave a Comment
        </h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Your comment..."
          className="w-full h-24 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 bg-white"
        />
        <button
          onClick={handlePostComment}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-2 focus:outline-none"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
