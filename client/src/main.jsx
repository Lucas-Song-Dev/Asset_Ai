import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="407136721307-3t16qn15mqffkknl79v41jm9n7n01v6r.apps.googleusercontent.com" >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
