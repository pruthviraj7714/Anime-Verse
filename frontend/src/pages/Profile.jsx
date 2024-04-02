import { useState } from "react";
import CreatedPosts from "../components/CreatedPosts";
import Saved from "../components/Saved";
import useUserData from "../hooks/userhook.jsx";
import { Link } from "react-router-dom";
import { WindmillSpinnerOverlay } from "react-spinner-overlay";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("created");
  const { loading, userData } = useUserData();

  if (loading) {
    return <WindmillSpinnerOverlay color="red" />;
  }

  return (
    <div className="">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="flex justify-center items-center w-20 h-20 rounded-full text-2xl font-bold bg-gray-200">
          {userData.username && userData.username[0].toUpperCase()}
        </div>
        <div className="font-bold text-4xl mt-3">{userData.username}</div>
        <div className="flex items-center mt-10">
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 font-semibold mr-3 hover:bg-gray-300"
            onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000");
              toast.success("Link copied succesfully");
            }}
          >
            Share
          </button>
          <Link
            to={"/edit"}
            className="px-4 py-2 rounded-xl bg-gray-200 font-semibold  hover:bg-gray-300"
          >
            Edit Profile
          </Link>
        </div>
        <div className="flex items-center my-4">
          <div
            className={`px-4 py-2 ${
              activeTab === "created" ? "border-b-4 border-black" : ""
            } cursor-pointer font-semibold  mr-4 `}
            onClick={() => {
              setActiveTab("created");
            }}
          >
            Created
          </div>
          <div
            className={`px-4 py-2 ${
              activeTab === "saved" ? "border-b-4 border-black" : ""
            } cursor-pointer font-semibold `}
            onClick={() => {
              setActiveTab("saved");
            }}
          >
            Saved
          </div>
        </div>
        <div>
          {activeTab === "created" ? (
            <CreatedPosts posts={userData.posts} />
          ) : (
            <Saved posts={userData.savedPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
