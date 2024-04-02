import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("animeToken");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }, []);

  return <div></div>;
};

export default Home;
