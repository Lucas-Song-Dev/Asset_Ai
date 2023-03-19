import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import verifyRoutes from "./routes/verifyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));


app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/verify", verifyRoutes);
app.use("/api/v1/users", userRoutes);


app.get("/", async (req, res) => {
  res.json("Hello from DALL.E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT || 8080, () => console.log("Server started"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
