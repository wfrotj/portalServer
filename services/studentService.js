import Student from "../models/Student.js";
async function createStudent(student) {
  return await Student.create(student);
}

export default {
  createStudent,
};
