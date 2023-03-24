import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import useIsOwner from "../state/hooks/IsOwner";
import { Loader } from "../components";
import moment from "moment";

import "./Post.css";

const Post = (props) => {
  const createdAt = moment().format("MMMM Do YYYY");
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const isOwner = useIsOwner(props);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://dallehost.herokuapp.com/api/v1/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `https://dallehost.herokuapp.com/api/v1/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data); // log the response to check if the post was successfully deleted
      setShowDeleteConfirmation(false);
      navigate("/display-posts");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <>
        {showDeleteConfirmation && (
          <DeleteConfirmation
            ondeletePost={handleDeletePost}
            onCancel={handleCancel}
          />
        )}
      </>
      {post ? (
        <>
          {!post.success ? (
            <div className="title"> No Post Found </div>
          ) : (
            <div className="page">
              <button
                className="font-inter font-medium text-black px-4 py-2 rounded-md flex-row flex h-fit mb-4 mt-0 w-full border-t-2 border-b-2"
                onClick={() => setShowInfo(!showInfo)}
              >
                <div className="">SHOW INFORMATION</div>
              </button>
              {showInfo ? (
                <div
                  className="titleHolder fixed z-50 bottom-0"
                  style={{
                    background: " rgb(255,255,255)",
                    background:
                      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 80%,  rgba(255,255,255,0.4) 90%, rgba(255,255,255,0) 100%)",
                  }}
                >
                  <div className="flex flex-col bottom-0">
                    <h1 className="title text-[32px] pt-2 pb-2">
                      {post.data.prompt}
                    </h1>
                    <div className="grid grid-cols-3 bottom-0 mb-8 gap-3 h-2">
                      <div className="w-full">
                        <div>Model Version</div>
                        <div className="opacity-80 text-blue-500">2.0</div>{" "}
                      </div>
                      <div className="w-full">
                        <div>Model Name</div>
                        <div className="opacity-80 text-blue-500">
                          DALL-E
                        </div>{" "}
                      </div>
                      <div className="w-full col-span-1">
                        <div>Creator</div>
                        <div className="opacity-80 text-blue-500">
                          {post.data.name}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="itemDescription">
                    {isOwner ? (
                      <button
                        class="px-4 py-2 bg-red-500 text-white rounded m-1"
                        onClick={() => setShowDeleteConfirmation(true)}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="imageHolder">
                <img
                  style={{ gridColumnStart: "2" }}
                  className="itemImage"
                  src={post.data.photo}
                  alt={post.data.prompt}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-10 flex flex-col items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Post;
