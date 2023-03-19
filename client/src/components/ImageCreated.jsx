import React from "react";
import moment from "moment";


const ImageCreated = ({ props, handleClose, handleSubmit }) => {
  const createdAt = moment().format("MMMM Do YYYY");
  return (
    <div className="left-0 absolute top-0 flex flex-col items-center isolate w-full h-full z-50 justify-center">
      <div
        className="absolute flex justify-center items-center bg-white  h-fit p-8 rounded-md"
        style={{ zIndex: "51" }}
      >
        <div className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 ">
          <img
            src={props.photo}
            alt={props.prompt}
            className="w-full h-full object-contain"
            style={{ zIndex: "51" }}
          />
        </div>
        <div className="ml-4 w-64 h-full relative flex flex-col">
          <div className="text-[#000000] font-bold text-[18px] h-[50px] w-full overflow-hidden top-0 pt-0 pr-8 flex-wrap mb-2" style={{overflowWrap: "break-word"}}>{props.prompt}</div>
          <div className="" style={{ zIndex: "51" }}>
            <button
              onClick={handleSubmit}
              className="ml-3 mb-4 text-white bg-[#a65dd6] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {props.loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
          <div className="grid grid-cols-2 bottom-0 mb-8 gap-3">
            <div className="w-full">
              <div>Model Version</div>
              <div className="opacity-80 text-blue-500">2.0</div>{" "}
            </div>
            <div className="w-full">
              <div>Model Name</div>
              <div className="opacity-80 text-blue-500">DALL-E</div>{" "}
            </div>
            <div className="w-full col-span-2">
              <div>Date Created</div>
              <div className="opacity-80 text-blue-500">{createdAt}</div>{" "}
            </div>
            {/* <div className="w-full">
              <div>UserName</div>
              <div className="opacity-80 text-blue-500">{props.name}</div>{" "}
            </div> */}
          </div>
        </div>
      </div>
      <div
        className="w-full h-full bg-slate-400 opacity-60"
        onClick={handleClose}
      >
        {" "}
      </div>
    </div>
  );
};

export default ImageCreated;
