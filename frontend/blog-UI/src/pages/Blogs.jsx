import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";
import { useAuth } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import Home from "./Home";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setShowLoader(true);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (user && !user.isCreator) {
      getBlogs().then(setBlogs).catch(console.error);
    }
  }, [user]);

  if (!user && showLoader) {
    return <Loader></Loader>;
  }

  return (
    user && (
      <div className="p-6">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No Forums available. Check back later!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </div>
        )}
      </div>
    )
  );
}
