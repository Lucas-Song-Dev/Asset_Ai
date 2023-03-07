import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function useIsOwner(props) {
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    props.user ? isVerified() : setIsOwner(false);
  }, [props.user]);
  const isVerified = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `https://dallehost.herokuapp.com/api/v1/posts/${id}/verify`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ token: props.user.credential }),
        }
      );
      await response.json();
      setIsOwner(response.status === 200);
    } catch (err) {
      alert("verification error", err);
    }
  };

  return isOwner;
}
export default useIsOwner;
