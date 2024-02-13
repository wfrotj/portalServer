import jwt from "jsonwebtoken";
import getTokenFrom from "../utils/getTokenFrom.js";
import Educator from "../models/Educator.js";

function verifyToken(req, secretKey) {
  const token = jwt.verify(getTokenFrom(req), secretKey);

  if (!token.id) {
    throw new Error("Token missing or invalid");
  }

  return token;
}

async function getTeacher(id) {
  return await Educator.findById(id);
}

async function saveStudent(studentId, teacher) {
  teacher.students.push(studentId);
  await teacher.save();
}

export default {
  getTeacher,
  saveStudent,
  verifyToken,
};
