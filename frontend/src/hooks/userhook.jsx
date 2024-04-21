import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

const useUserData = () => {
  const [userData, setUserData] = useState({
    username: "",
    id: "",
    email: "",
    posts: [],
    savedPosts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`https://${BACKEND_URL}/user/info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
          },
        });
        setUserData({
          id: res.data.id,
          email: res.data.email,
          username: res.data.username,
          posts: res.data.posts,
          savedPosts: res.data.savedPosts,
        });
        setLoading(false);
      } catch (error) {
        alert("Error fetching user data:", error);
      }
    };

    fetchUserData(); 
  }, []); 

  return {loading , userData};
};

export default useUserData;
