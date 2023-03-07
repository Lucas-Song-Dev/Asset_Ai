// user.js
import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
