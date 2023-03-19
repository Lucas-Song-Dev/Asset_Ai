import React from "react";

const LoginAlert = ({ onDismiss }) => {
  return (
    <>
      <button
        onClick={onDismiss}
        className="fixed left-0 bottom-0 w-full h-full bg-black bg-opacity-50 px-4 py-2 rounded z-50"
      ></button>
      <div className="fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-white  p-10 rounded-md  flex flex-col justify-center items-center z-50">
        <h1 className="text-4xl font-bold mb-4">Please Login</h1>
        <button
          onClick={onDismiss}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dismiss
        </button>
      </div>
    </>
  );
};

export default LoginAlert;
