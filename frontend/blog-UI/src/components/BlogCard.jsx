import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BlogCard({ blog }) {
  const [fadeIn, setFadeIn] = useState(false);

  // Use effect to trigger fade-in animation on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`bg-gradient-to-br from-gray-200 to-blue-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 border border-gray-200 ${
        fadeIn ? "animate-fadeIn" : ""
      }`}
    >
      {/* <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 border border-gray-200"> */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
      <p className="text-sm text-gray-500 mb-4">
        by {blog.createdBy.username} at{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
      <Link
        to={`/blog/${blog.id}`}
        className="text-blue-600 hover:underline font-medium"
      >
        Read more
      </Link>
    </div>
  );
}
