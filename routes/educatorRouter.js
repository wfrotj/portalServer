import express from "express";
import educatorController from "../controllers/educatorController.js";

const educatorRouter = express.Router();

educatorRouter.get("/", educatorController.getTeacher);
educatorRouter.post("/", educatorController.createTeacher);

export default educatorRouter;
