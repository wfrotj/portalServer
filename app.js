import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import educatorRouter from "./routes/educatorRouter.js";
import config from "./utils/config.js";
import loginRouter from "./routes/loginRouter.js";
import studentRouter from "./routes/studentRouter.js";
import errorHandler from "./middlewares/errroHandler.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
// import upload from "./utils/multer.js";

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

// app.use("/api/student", upload.single("image"), studentRouter);
app.use("/api/student", studentRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
