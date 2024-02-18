/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import Educator from "../models/Educator.js";

async function getTeacher(_req, res) {
  const teacher = await Educator.find({}).populate("students");
  return res.status(200).json(teacher);
}

async function createTeacher(req, res) {
  const { username, firstName, lastName, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const teacher = new Educator({
    username,

    passwordHash,
    firstName,
    lastName,
  });
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: "Content is missing" });
  }
  const teacherExists = await Educator.findOne({
    firstName,
    lastName,
  });
  if (teacherExists) {
    return res.status(400).json({ error: "username or name is already used." });
  }
  const savedTeacher = await teacher.save();

  return res.status(201).json(savedTeacher);
}

export default {
  createTeacher,
  getTeacher,
};
