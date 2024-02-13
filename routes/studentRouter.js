import express from "express";
import studentController from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", studentController.getStudents);
// personRouter.get("/:id", personController.getPerson);
studentRouter.post("/", studentController.createStudent);
// personRouter.put("/:id", personController.updatePerson);
// personRouter.delete("/:id", personController.deletePerson);

export default studentRouter;
