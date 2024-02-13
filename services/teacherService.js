import User from "../models/User.js";
import jwt from "jsonwebtoken";
import getTokenFrom from "../utils/getTokenFrom.js";
import Teacher from "../models/Teacher.js";

function verifyToken(req, secretKey) {
  const token = jwt.verify(getTokenFrom(req), secretKey);

  if (!token.id) {
    throw new Error("Token missing or invalid");
  }

  return token;
}

async function getTeacher(id) {
  return await Teacher.findById(id);
}

async function saveStudent(studentId, teacher) {
  teacher.stduents.push(studentId);
  await teacher.save();
}

export default {
  getTeacher,
  saveStudent,
  verifyToken,
};
