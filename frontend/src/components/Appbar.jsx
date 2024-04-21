import { Link } from "react-router-dom";
import AppbarSkeleton from "./AppbarSkeleton";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import useUserData from "../hooks/userhook";
import {  FaAngleDoubleDown, FaAngleDown } from 'react-icons/fa'

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const {loading , userData} = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [window.location.href]);

  const logOutHandler = () => {
    localStorage.removeItem("animeToken");
    navigate("/signup");
  };

  if (loading) {
    return <AppbarSkeleton />;
  }

  return (
    <div className="bg-rose-50 flex justify-between p-4 h-[80px]">
      <div className="flex justify-start items-center">
        <Link
          to={"/dashboard"}
          className="font-bold text-center text-2xl text-sky-300 mb-2"
        >
          Anime<span className="text-rose-300">Verse</span>
        </Link>
        <Link
          to={"/dashboard"}
          className="font-bold ml-3 flex justify-center items-center  bg-rose-300 text-white rounded-lg px-4 py-1 hover:bg-rose-400"
        >
          Home
        </Link>
        <Link
          to={"/create"}
          className="font-bold ml-3 flex justify-center items-center bg-sky-300 text-white rounded-lg px-4 py-1 hover:bg-sky-400"
        >
          Create
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <Link
          to={"/save"}
          className="hidden lg:block font-bold mr-3 bg-yellow-400 text-white rounded-xl px-4 py-2 hover:bg-yellow-500"
        >
          Saved Posts
        </Link>
        <div className="relative z-10">
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center h-12 w-12 rounded-full p-5 font-bold bg-gray-200 hover:bg-gray-300 hover:border-2 border-black focus:outline-none"
            >
              {userData.username.length > 0 && userData.username[0]}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-center items-center h-12 w-12 bg-gray-200 hover:border-2 border-black hover:bg-gray-300 rounded-full">
                <FaAngleDoubleDown size={20} />
            </button>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex">
                  <CgProfile size={25} />
                  <h3 className="ml-2 text-md">My Profile</h3>
                </div>
              </Link>
              <button
                onClick={() => {
                  setIsLogOutOpen(true);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <div className="flex">
                  <LuLogOut size={25} />
                  <h3 className="ml-2 text-md">Log out</h3>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      {isLogOutOpen && (
        <ConfirmDialog
          title={"Are you sure?"}
          warning={"Are you sure you want to log out?"}
          cancelHandler={() => setIsLogOutOpen(!isLogOutOpen)}
          confirmHandler={logOutHandler}
        />
      )}
    </div>
  );
};

export default Appbar;
