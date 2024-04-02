import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import axios from "axios";
import { WindmillSpinnerOverlay } from "react-spinner-overlay";
import { BACKEND_URL } from "../config";

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://${BACKEND_URL}/post/saved-posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
          },
        });

        setPosts(res.data.savedPosts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <WindmillSpinnerOverlay color="red" />;
  }

  return (
    <div className="p-4">
      <div className="flex items-center p-4 font-bold text-2xl border-b-2 border-black">
        Your Saved Posts
      </div>
      {posts.length > 0 ? (
        <div className="mt-3 w-full max-w-7xl p-3 pb-10 mx-auto mb-10 gap-5 gap-y-4 columns-2 md:columns-3 lg:columns-4">
          {posts.map((post) => (
            <ImageCard
              key={post._id}
              id={post.post._id}
              imageUrl={post.post.imageUrl}
              title={post.post.title}
              description={post.post.description}
              username={post.post.user.username}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20 font-bold text-3xl font-mono">
          Looks like you haven't saved any posts yet
        </div>
      )}
    </div>
  );
};

export default SavedPosts;
