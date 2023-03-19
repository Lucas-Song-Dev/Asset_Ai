import React from "react";
import { Link } from "react-router-dom";

const Success = ({ handleOk }) => {
  return (
    <div className="fixed top-0 bg-white w-full flex flex-col justify-center items-center h-screen left-0" style={{zIndex:"100"}}>
      <h1 className="text-4xl fon t-bold mb-4">Success!</h1>
      <p className="text-lg mb-8">
        Your post has been successfully created.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          handleOk();
          window.location.href = "/display-posts";
        }}
      >
        Return to Home
      </button>
    </div>
  );
};

export default Success;
