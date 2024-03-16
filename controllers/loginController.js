/* eslint-disable linebreak-style */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Educator from "../models/Educator.js";
import config from "../utils/config.js";

async function login(req, res) {
  const { username, password } = req.body;

  const teacher = await Educator.findOne({ username });
  const passwordCorrect =
    teacher === null
      ? false
      : await bcrypt.compare(password, teacher.passwordHash);

  if (!(teacher && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const teacherForToken = {
    username: teacher.username,
    id: teacher._id,
  };

  const token = jwt.sign(teacherForToken, config.SECRET, { expiresIn: "60s" });

  res.status(200).send({
    token,
    username: teacher.username,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    //     age: teacher.age,
    //     employeeNumber: teacher.employeeNumber,
    //     depEdEmail: teacher.depEdEmail,
  });
}

export default {
  login,
};
