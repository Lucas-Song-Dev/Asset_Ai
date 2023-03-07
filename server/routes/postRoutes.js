import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { OAuth2Client } from "google-auth-library";
import jwt_decode from "jwt-decode";


import Post from "../mongodb/models/post.js";
import User from "../mongodb/models/user.js";


dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In verification handler
const verifyGoogleSignIn = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload ;
  } catch (err) {
    console.error(`Error verifying Google Sign-In: ${err}`);
    return null;
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CLIENT_ID = process.env.CLIENT_ID;



async function verify(token) {
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}


router.post("/:id/verify", async (req, res) => {
  const { token } = req.body;
  const post = await Post.findById(req.params.id);
  try {
    const googleUser = await verifyGoogleSignIn(token);
    const user = await User.findOne({ email: googleUser.email });
    if (user.email === post.email) {
      res.status(200).json({ message: "User verified" });
      console.log("User verified");
    } else {
      res.status(400).json({ message: "Unable to verify user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to verify user" });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo, token } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const googleUser = await verifyGoogleSignIn(token);
    const user = await User.findOne({ email: googleUser.email });
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      email: googleUser.email,
      user: user._id,
    });
    user.posts.push(newPost._id);
    await user.save();

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    // Check if the authorization header is defined
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(200).json({ success: true, data: post });
      return;
    }

    const jwtToken = req.headers.authorization.split(" ")[1];
    const client_id = process.env.GOOGLE_CLIENT_ID;

    const client = new OAuth2Client(client_id);
    const ticket = await client.verifyIdToken({
      idToken: jwtToken,
      audience: client_id,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;

    const isOwner = post.userId === userId;

    res.status(200).json({ success: true, data: { ...post._doc, isOwner } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching post failed, please try again ${err}`,
    });
  }
});

// DELETE post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Deleting post failed, please try again",
    });
  }
});

export default router;
