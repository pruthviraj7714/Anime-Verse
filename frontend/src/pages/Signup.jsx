import { Link } from "react-router-dom";
import Inputbox from "../components/Inputbox";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthImages from "../components/AuthImages";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignUpHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`https://${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
      });
      localStorage.setItem("animeToken", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error! Please check your credentials");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <AuthImages />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col p-4 gap-y-2 h-[410px] w-[390px] bg-rose-50 shadow-md">
            <h1 className="font-bold text-center text-2xl text-sky-300 mb-2">
              Anime<span className="text-rose-300">Verse</span>
            </h1>

            <>
              <Inputbox
                label={"Username"}
                placeholder={"Tony441"}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Inputbox
                label={"Email"}
                placeholder={"tony@gmail.com"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Inputbox
                label={"Password"}
                placeholder={"1234"}
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </>
            <button
              onClick={SignUpHandler}
              className={`w-full text-md py-2 mt-2 font-semibold font-mono  ${loading ? 'bg-gray-300 animate-pulse cursor-default' : 'bg-sky-400 hover:bg-sky-500 cursor-pointer'} `}
            >
              {loading ? 'Loading...' : "Sign in"}
            </button>
            <p className="mt-2 text-md text-center">
              Already have an account?
              <Link className="ml-2 underline" to="/login">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
