import { React, useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";
import "./App.css"


import { logo } from "./assets";
import { Home, CreatePost, Post, Account } from "./page";
import axios from "axios";

const createUser = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://dallehost.herokuapp.com/api/v1/users/signup",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ token: token.credential }),
      }
    );

    await response.json();
  } catch (err) {
    alert(err);
  } finally {
  }
};
const App = () => {
  const [user, setUser] = useState(null);
  const jwt = Cookies.get("jwt");
  const handleSetUser = (user) => {
    setUser(user);
    // Assuming you have retrieved the JWT from the server and stored it in a variable called `jwt`
    console.log("user", user);
    Cookies.set("jwt", JSON.stringify(user), { expires: 7 }); // Set the cookie to expire after 7 days

  };
  useEffect(() => {
    if (jwt) {
      // The JWT token exists, so you can set the user state with this information
      const user = JSON.parse(jwt);
      setUser(user);
    } else {
      // The JWT token does not exist, so you can set the user state to null
      setUser(null);
    }
  }, [jwt]);

  const handleLogout = () => {
    setUser(null);
    Cookies.set("jwt", JSON.stringify(null), { expires: 0 }); // Set the cookie to expire after 7 days
  };

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        {user ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
            className="logoutButton"
          >
            logout
          </button>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              handleSetUser(credentialResponse);
              createUser(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
        <div>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#a65dd6] text-white px-4 py-2 rounded-md h-24"
          >
            Create
          </Link>
          <Link
            to="/account"
            className="font-inter font-medium bg-[#a65dd6] text-white px-4 py-2 rounded-md"
            style={{ marginLeft: "10px" }}
          >
            Account
          </Link>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/create-post" element={<CreatePost user={user} />} />
          <Route path="/posts/:id" element={<Post user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
