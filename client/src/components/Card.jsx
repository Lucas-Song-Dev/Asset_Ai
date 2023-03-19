import React from "react";
import { useNavigate } from "react-router-dom";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo, userImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${_id}`);
  };
  return (
    <div
      className="rounded-xl shadow-none group relative  card transform transition-transform hover:scale-100 hover:z-50"
      onClick={handleClick}
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div
        className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 p-4 rounded-md text-black"
        style={{
          background: " rgb(255,255,255)",
          background:
            "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 80%,  rgba(255,255,255,0.4) 90%, rgba(255,255,255,0) 100%)",
        }}
      >
        <p
          className="text-black text-sm prompt overflow-hidden"
          style={{ lineHeight: "1.5rem", height: "min(1.5rem,3rem)" }}
        >
          {prompt}
        </p>

        <div className="mt-1 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-black text-xs font-bold">
              {userImage === "null" ? (
                name[0].toUpperCase()
              ) : (
                <img className="mainProfileImage" src={userImage} alt={name} />
              )}
            </div>
            <p className="text-black text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none flex"
          >
            <i className="material-symbols-outlined">download</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
