import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { BACKEND_URL } from "../config";

const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

const Create = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();


  const resizeImage = async (imageFile, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        const resizedDataURL = canvas.toDataURL('image/jpeg');
  
        resolve(resizedDataURL);
      };
  
  
      img.onerror = (error) => {
        reject(error);
      };

      img.src = URL.createObjectURL(imageFile);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      try {
        const resizedImage = await resizeImage(file, MAX_WIDTH, MAX_HEIGHT);
        setImage(resizedImage);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setImage("");
    }
  };
  
  const removeImage = () => {
    setImage("");
  };

  const createPost = async() => {
    try {
      await axios.post(`https://${BACKEND_URL}/post/new`, {
        title,
        description,
        imageUrl : image
      }, {
        headers : {
          Authorization :  `Bearer ${localStorage.getItem("animeToken")}`
        }
      })
      navigate('/dashboard');
    } catch (error) {
      toast.error("Request Failed")
    }
  }

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="top-16 left-0 h-16 flex items-center bg-slate-50 w-full">
        <h1 className="ml-10 font-semibold font-mono text-lg">
          Add your post to <span className="text-sky-400">Anime</span>
          <span className="text-rose-400">Verse</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 p-4">
        <div className="flex justify-center items-center mt-12">
          <div className="w-[350px] h-[450px] bg-stone-300 flex justify-center items-center">
            {image !== "" ? (
              <div className="mt-10">
                <img
                  src={image}
                  alt="Selected"
                  style={{ maxWidth: "100%" }}
                />
                <button
                  onClick={removeImage}
                  className="bg-red-400 text-white px-4 py-2 rounded-xl mt-2"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="ml-10"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
          <div className="gap-y-4">
          <div className="flex flex-col font-mono">
            <label className="font-semibold text-lg">Title</label>
            <input type= "text" placeholder="Title for your post" autoFocus onChange={(e) => {
              setTitle(e.target.value)
            }} className="outline-none p-2 w-80 rounded-md bg-white focus:border-4 border-blue-300 " />
          </div>
          <div className="flex flex-col font-mono w-80 mt-2">
            <label className="font-semibold text-lg">Description (*Optional)</label>
            <textarea rows={4} placeholder={"Describe your post a bit"} onChange={(e) => {
              setDescription(e.target.value)
            }} className="outline-none p-2 w-80 rounded-md bg-white focus:border-4 border-blue-300 " />
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-sky-300 to-rose-300 font-semibold border-none hover:bg-gradient-to-r hover:from-sky-200 hover:to-rose-300 mt-3" onClick={createPost}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
