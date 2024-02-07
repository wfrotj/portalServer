import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import educatorRouter from "./routes/educatorRouter.js";
import config from "./utils/config.js";
import loginRouter from "./routes/loginRouter.js";

const app = express();

const connectToDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected to the Database");
};

connectToDB(config.MONGODB);

app.use(express.json());
app.use(cors());
app.use("/api/teacher", educatorRouter);
app.use("/api/login", loginRouter);

export default app;
