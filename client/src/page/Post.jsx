import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import useIsOwner from "../state/hooks/IsOwner";

import "./Post.css";

const Post = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
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
      navigate("/");
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
            <div> Please Try Again Later</div>
          ) : (
            <div className="page">
              <div className="titleHolder">
                <h1 className="title">{post.data.prompt}</h1>
                <div className="itemDescription">
                  <p class="font-bold text-center">Creator: {post.data.name}</p>
                  {isOwner? (
                    <button
                      class="px-4 py-2 bg-red-500 text-white rounded m-1"
                      onClick={() => setShowDeleteConfirmation(true)}
                    >
                      Delete
                    </button>
                  ) : (
                    <div class="px-4 py-2 bg-red-500 text-white rounded m-1 text-center">
                      Sign in to manage
                    </div>
                  )}
                </div>
              </div>
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Post;
