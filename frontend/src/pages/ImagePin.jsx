import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import useUserData from "../hooks/userhook.jsx";
import ImagePinSkeleton from "../components/ImagePinSkeleton.jsx";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../config.js";

const ImagePin = () => {
  const { postId } = useParams();
  const [imageData, setImageData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const { loading, userData } = useUserData();
  const [saved, setSaved] = useState(false);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const isFirstMount = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSave = async () => {
    if (!saved) {
      try {
        await axios.post(
          `https://${BACKEND_URL}/post/save/${postId}`,
          {
            post: postId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
            },
          }
        );
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await axios.delete(
          `https://${BACKEND_URL}/post/unsave/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
            },
          }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
    {
      !saved ? toast.success("Post Saved") : toast.success("Post Unsaved");
    }
    setSaved(!saved);
  };
  useEffect(() => {
    const isPostSaved = userData.savedPosts.some(
      (post) => post.post._id === postId
    );

    setSaved(isPostSaved);

    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `https://${BACKEND_URL}/post/info/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
            },
          }
        );

        setImageData((prev) => ({
          ...prev,
          title: res.data.post.title,
          description: res.data.post.description,
          imageUrl: res.data.post.imageUrl,
        }));

        const response = await axios.get(
          `https://${BACKEND_URL}/user/info/${res.data.post.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
            },
          }
        );
        setUsername(response.data.username);
        setPosts(response.data.posts);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchInfo();

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [postId, userData]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`https://${BACKEND_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
        },
      });

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <ImagePinSkeleton />;
  }

  return (
    <div className="bg-stone-200">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center">
        <div className="">
          <div className="flex justify-center items-center mb-4 mt-10">
            <div className="w-12 h-12 rounded-full flex justify-center items-center font-bold bg-sky-50">
              {username.length > 0 ? username[0].toUpperCase() : "U"}
            </div>
            <h2 className="text-xl font-semibold ml-2">{username}</h2>
          </div>
          <div>
            <img
              className="shadow-xl"
              src={imageData.imageUrl}
              alt={imageData.title}
            />
          </div>
          <h1 className=" font-mono text-2xl text-center mt-2">
            {imageData.title}
          </h1>

          {imageData.description && (
            <p className="text-xl my-4 font-mono border border-black">
              {imageData.description}
            </p>
          )}
          <div className="flex justify-center">
            <button
              className={`font-semibold my-2 mr-4 text-white ${
                saved ? "bg-black" : "bg-red-500 hover:bg-red-600 "
              } w-24 px-6 py-2 rounded-lg`}
              onClick={toggleSave}
            >
              {saved === true ? "Unsave" : "Save"}
            </button>
            {userData.posts.some((post) => post._id === postId) && (
              <button
                className="font-semibold my-2 text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg"
                onClick={deleteHandler}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 mt-3">
        <h1 className="text-left font-bold text-2xl px-4 border-b-2 border-black">
          Other Posts From {username}
        </h1>
        {posts.length > 1 ? (
          <div className="mt-10 w-full max-w-7xl p-5 pb-10 mx-auto mb-10 gap-5 gap-y-4 columns-2 md:columns-3 lg:columns-4">
            {posts.map(
              (post) =>
                post._id != postId && (
                  <ImageCard
                    key={post._id}
                    id={post._id}
                    imageUrl={post.imageUrl}
                    title={post.title}
                    description={post.description}
                    username={post.user.username}
                  />
                )
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center my-4 font-bold text-3xl font-mono">
            No More Posts
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePin;
