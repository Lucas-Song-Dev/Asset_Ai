import { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";

import "./AccountPage.css";
function AccountPage(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        token: props.user.credential,
      };
      const response = await fetch(
        "https://dallehost.herokuapp.com/api/v1/users/user/posts",
        {
          method: "GET",
          headers,
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    props.user ? fetchPosts() : "";
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }
    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

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
      } catch (err) {
        alert(err);
      }
    };

    props.user ? fetchUser() : setUserInfo(null);
  }, [props.user]);
  return (
    <>
      {userInfo ? (
        <>
          <div className="acountHolder">
            <div className="sidebar">
              <div className="sidebar-section">
                <div className="userTitle">
                  <img
                    className="profileImage"
                    src={userInfo.picture}
                    alt={userInfo.name}
                  />
                  <p className="font-inter font-bold pb-2 py-2 rounded-md border-b-2 w-full">
                    {userInfo.name}
                  </p>
                </div>
                <h3>Settings</h3>
                <ul>
                  <li>Account</li>
                  <li>Preferences</li>
                  <li>Security</li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3>Account Information</h3>
                <ul>
                  <li>Profile</li>
                  <li>Billing</li>
                  <li>Shipping</li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3>Notifications</h3>
                <ul>
                  <li>General</li>
                  <li>Product Updates</li>
                  <li>Promotions</li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3>Posts</h3>
                <ul>
                  <li>My Posts</li>
                  <li>Create Post</li>
                  <li>Manage Posts</li>
                </ul>
              </div>
            </div>
            <div className="accountInfo">
              <h1 className="font-extrabold text-[#222328] text-[32px]">
                Welcome to your Dashboard
              </h1>
              <p>
                Here you can see your account details and manage your settings.
              </p>
              <div className="card-holder">
                <div className="card">
                  {" "}
                  <h2 className="font-extrabold text-[#222328] text-[16px]">
                    Your Account Details:
                  </h2>
                  <ul>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Posts: {userInfo.posts.length}</p>
                  </ul>
                  <h2 className="font-extrabold text-[#222328] text-[16px]">
                    Your Settings:
                  </h2>
                  <ul>
                    <li>Language: English</li>
                    <li>Posts: Public</li>
                  </ul>{" "}
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    <RenderCards data={allPosts} title="No Posts Yet" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="signInHolder">
          <div class="subscribe">
            <p>SIGN IN</p>
            <input
              type="email"
              name="email"
              class="subscribe-input"
              placeholder="Your e-mail"
            />
            <input
              type="password"
              name="password"
              class="subscribe-password"
              placeholder="Your Password"
            />
            <div class="submit-btn">SUBMIT</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AccountPage;
