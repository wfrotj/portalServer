import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import educatorRouter from "./routes/educatorRouter.js";

const app = express();

const connectToDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected to the Database");
};

connectToDB();

app.use(express.json());
app.use(cors());
app.use("/api/teacher", educatorRouter);

export default app;
