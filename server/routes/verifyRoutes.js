import express from "express";
import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

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

router.post("/", async (req, res) => {
  const { token } = req.body;

  try {
    const user = await verify(token);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to verify user" });
  }
});

export default router;

