import React, { useState, useEffect } from "react";
// import { format } from "date-fns";

import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader,Image } from "../components";

import Success from "../components/Success";
import LoginAlert from "../components/LoginAlert";
import "./Post.css";

const CreatePost = (props) => {
  const navigate = useNavigate();

  // const [currentDate, setCurrentDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: props.user.credential,
        };

        const response = await fetch(
          "https://dallehost.herokuapp.com/api/v1/users/user",
          {
            method: "GET",
            headers,
          }
        );

        const data = await response.json();
        setUserInfo(data.user);
        setForm({ ...form, name: data.user.name });
      } catch (err) {
        alert(err);
      }
    };

    props.user ? fetchUser() : setUserInfo(null);
  }, [props.user]);

  const handleOk = () => {
    setShowSuccess(false);
  };

  const handleDismiss = () => {
    setShowLoginAlert(false);
  };

  console.log(userInfo?.name)

  const [form, setForm] = useState({
    name: `${userInfo?.name}` || "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleClose = () => {
    setForm({ ...form, photo: "" });
  }


  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dallehost.herokuapp.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo && props.user) {
      setLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "https://dallehost.herokuapp.com/api/v1/posts",
          {
            method: "POST",
            headers,
            body: JSON.stringify({ ...form, token: props.user.credential }),
          }
        );

        await response.json();
        setShowSuccess(true);
        console.log("response", response, "form", form);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else if (!props.user) {
      setShowLoginAlert(true);
    } else {
      alert("Please generate an image with proper details");
    }
  };
  return (
    <section className=" flex flex-col w-full justify-center h-full" style={{ }}>
      <div className="flex mt-8 ml-16 md:flex-row flex-col">
          <h1 className="font-extrabold text-[#222328] text-[48px]">
            CREATE
          </h1>
          <h1 className="ml-3 font-extrabold text-[#a65dd6] text-[48px]">
            {" "}
            ANYTHING
          </h1>
        </div>

      <form className="mt-8 w-full items-center flex flex-col justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-5 justify-center">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
            {form.photo ? (
              <Image props={{...form, loading}} handleClose={handleClose} handleSubmit={handleSubmit}/>
            ) : (
              ""
            )}

            {generatingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg z-50">
                <Loader />
              </div>
            )}
          </div>
        {showSuccess && <Success handleOk={handleOk} />}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={props.user === null ? generateImage : generateImage}
            className=" text-white bg-[#3F75EC] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>
      {showLoginAlert && <LoginAlert onDismiss={handleDismiss} />}
    </section>
  );
};

export default CreatePost;
