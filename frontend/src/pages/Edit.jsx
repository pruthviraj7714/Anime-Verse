import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../config";

const Edit = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const editHandler = async () => {
    try {
      await axios.put(
        `https://${BACKEND_URL}/user/update`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
          },
        }
      );
      toast.success("Changes saved succesfully");
      
      setTimeout(() => {
        navigate("/profile");
      }, 700);
    } catch (error) {
      toast.error("Please check your credentials");
    }
  };

  const resetHandler = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setIsResetOpen(!isResetOpen);
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`https://${BACKEND_URL}/user/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("animeToken")}`,
        },
      });
      localStorage.removeItem("animeToken");
      navigate("/signup");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col justify-center mt-16">
        <div className="flex justify-center text-3xl font-extrabold my-3">
          Edit Profile
        </div>
        <div className=" flex flex-col justify-center items-center gap-y-8 my-4">
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Username</label>
            <input
              type="text"
              value={username}
              className="rounded-xl px-4 py-2 border-2 border-black w-[300px]"
              placeholder="New Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Email</label>
            <input
              type="text"
              className="rounded-xl px-4 py-2 border-2 border-black w-[300px]"
              value={email}
              placeholder="New Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Password</label>
            <input
              type="password"
              value={password}
              className="rounded-xl px-4 py-2 border-2 border-black w-[300px]"
              placeholder="New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-stone-200 rounded-xl  font-sans text-md mr-4 hover:bg-stone-300 focus:outline-none"
            onClick={editHandler}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-stone-200 rounded-xl font-sans text-md hover:bg-stone-300 focus:outline-none"
            onClick={() => setIsResetOpen(!isResetOpen)}
          >
            Reset
          </button>
        </div>
        <div className="mt-10 flex justify-center absolute right-20 bottom-[67px]">
          <button
            className="bg-red-400 px-4 py-2 rounded-xl text-white font-bold hover:bg-red-600"
            onClick={() => setIsDeleteOpen(!isDeleteOpen)}
          >
            Delete Account
          </button>
          {isDeleteOpen && (
            <ConfirmDialog
              title={"Are you sure?"}
              warning={
                "Warning: Deleting your account is irreversible and will result in the permanent loss of all data and associated services"
              }
              confirmHandler={deleteHandler}
              cancelHandler={() => setIsDeleteOpen(!isDeleteOpen)}
            />
          )}
          {isResetOpen && (
            <ConfirmDialog
              title={"Are you sure?"}
              warning={"Any changes you've made will be lost."}
              confirmHandler={resetHandler}
              cancelHandler={() => setIsResetOpen(!isResetOpen)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
