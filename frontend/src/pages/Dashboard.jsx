import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import { WindmillSpinnerOverlay } from "react-spinner-overlay";
import { BACKEND_URL } from "../config";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://${BACKEND_URL}/post/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
          },
        });
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchPosts();
  }, []);

  const Message = () => {
    return <div className="font-semibold mt-2 text-lg">Please wait...</div>;
  };

  if (isLoading) {
    return <WindmillSpinnerOverlay color="red" message={<Message />} />;
  }

  return (
    <div>
      <div className="mt-3 w-full max-w-7xl p-5 pb-10 mx-auto mb-10 gap-5 gap-y-4 columns-2 md:columns-3 lg:columns-4">
        {posts.length > 0 &&
          posts.map((post) => (
            <ImageCard
              key={post._id}
              id={post._id}
              imageUrl={post.imageUrl}
              title={post.title}
              description={post.description}
              username={post?.user?.username || "Undefined"}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
