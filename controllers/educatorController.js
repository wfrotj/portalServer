/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import Educator from "../models/Educator.js";

async function getTeacher(_req, res) {
  const teacher = await Educator.find({});

  return res.status(200).json(teacher);
}

async function createTeacher(req, res) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const teacher = new Educator({
    username,
    name,
    passwordHash,
  });

  const savedTeacher = await teacher.save();

  return res.status(201).json(savedTeacher);
}

export default {
  createTeacher,
  getTeacher,
};
