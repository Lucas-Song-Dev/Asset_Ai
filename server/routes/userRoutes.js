import express from "express";
import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

import User from "../mongodb/models/user.js";
import Post from "../mongodb/models/post.js";


const router = express.Router();

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In verification handler
const verifyGoogleSignIn = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (err) {
    console.error(`Error verifying Google Sign-In: ${err}`);
    return null;
  }
};

// Route for creating a new user
router.post("/signup", async (req, res) => {
  const { token } = req.body;
  const googleUser = await verifyGoogleSignIn(token);

  if (!googleUser) {
    return res.status(400).json({ message: "Invalid token" });
  }
  try {
    const user = await User.findOne({ email: googleUser.email });

    if (user) {
      // Update the user's details
      user.name = googleUser.name;
      user.picture = googleUser.picture;
      await user.save();
    } else {
      // Create a new user
      await User.create({
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
      });
    }
    console.log("User created successfully");

    // Set the user state

    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error(`Error creating user: ${err}`);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/user/posts", async (req, res) => {
const { token } = req.headers;
const googleUser = await verifyGoogleSignIn(token);

if (!googleUser) {
  return res.status(400).json({ message: "Invalid token" });
}

try {
  const user = await User.findOne({ email: googleUser.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const posts = await Post.find({ _id: { $in: user.posts } }); // use $in to find all posts with IDs in the user's posts array
  console.log(posts);
  return res.status(200).json(posts);

} catch (err) {
  console.error(`Error getting user information: ${err}`);
  return res.status(500).json({ message: "Server error" });
}
});

// Route for getting user information
router.get("/user", async (req, res) => {
  const { token } = req.headers;
  const googleUser = await verifyGoogleSignIn(token);

  if (!googleUser) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const user = await User.findOne({ email: googleUser.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(`Error getting user information: ${err}`);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
