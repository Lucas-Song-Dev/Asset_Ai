import React from "react";

const DeleteConfirmation = ({ ondeletePost, onCancel }) => {
  return (
    <div className="fixed top-0 bg-white w-full left-0 flex flex-col justify-center items-center h-screen z-50">
      <h1 className="text-4xl font-bold mb-4">Are you sure?</h1>
      <p className="text-lg mb-8">
        Your post will be permanently deleted.
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          ondeletePost();
        }}
      >
        Permanently Delete
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => {
          onCancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteConfirmation;
