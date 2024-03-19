/* eslint-disable linebreak-style */
// import User from "../models/User.js";
import Educator from "../models/Educator.js";
// import isString from "../utils/isString.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import Student from "../models/Student.js";
// import uploadFile from "../utils/uploadFile.js";

// async function getStudents(req, res) {
//   const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
//   const students = await Student.find([]);

//   return res.json(students);
// }

async function getStudents(req, res) {
  const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
  const students = await Student.find({ user: decodedToken._id });

  return res.json(students);
}

// async function getStudents(req, res) {
//   const students = await Student.find({});
//   return res.json(students);
// }

// async function getPerson(req, res, next) {
//   try {
//     const { id } = req.params;
//     const person = await Person.findById(id);

//     if (person) return res.json(person);

//     return res.status(404).json({ error: "Person not found" });
//   } catch (error) {
//     next(error);
//   }
// }

// async function getPersonByFirstName(req, res, next) {
//   try {
//     const { firstName } = req.params;
//     const person = await Person.find({ firstName });

//     if (person) return res.json(person);

//     return res.status(404).json({ error: "Person not found" });
//   } catch (error) {
//     next(error);
//   }
// }
// async function getPersonByLastName(req, res, next) {
//   try {
//     const { lastName } = req.params;
//     const person = await Person.find({ lastName });

//     if (person) return res.json(person);

//     return res.status(404).json({ error: "Person not found" });
//   } catch (error) {
//     next(error);
//   }
// }
async function createStudent(req, res, next) {
  try {
    //1. get the needed data
    const { firstName, lastName, section } = req.body;
    //2. we decode the token
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET, {});
    //3. we check if the token is valid
    const teacher = await Educator.findById(decodedToken.id);
    // const photoInfo = await uploadFile(req.file);

    //4. we convert the date
    // const currentDate = new Date();
    // const dateVisited = currentDate.toISOString().split("T")[0];
    // const timeVisited = currentDate.toLocaleTimeString();
    //5. we create person object
    const student = new Student({
      firstName,
      lastName,
      section,
      teacher: teacher._id,
      // photoInfo,
    });
    //6. we handle missing data
    if (!firstName || !lastName) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const studentExist = await Student.findOne({ firstName, lastName });
    if (studentExist) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const savedStudent = await student.save();

    teacher.students = teacher.students.concat(savedStudent._id);
    await teacher.save();

    return res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
}

async function deleteStudents(req, res) {
  try {
    const id = req.params.id;
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
    const deletedStudent = await Student.findByIdAndDelete(id);
    return res.status(204).json(deletedStudent);
  } catch (error) {
    console.log(error);
  }
}
// async function getPersonsByDate(req, res) {
//   try {
//     const { dateVisited } = req.params;
//     const date = new Date(dateVisited);
//     const convertedDate = date.toISOString().split("T")[0];

//     const persons = await Person.find({ dateVisited: convertedDate });
//     res.status(200).json(persons);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// }

// async function getPersonsByPurpose(req, res) {
//   try {
//     const { purposeOfEntry } = req.params;

//     const persons = await Person.find({
//       purposeOfEntry: { $eq: purposeOfEntry },
//     });

//     res.status(200).json(persons);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// }
// const updatePerson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const person = await Person.findByIdAndUpdate(id, req.body);
//     if (!person) {
//       return res
//         .status(400)
//         .json({ message: `cannot find person with id ${id}` });
//     }
//     if (person.timeExited) {
//       return res.status(400).json({
//         message: `This person have already exited at ${person.timeExited} and cannot be updated`,
//       });
//     }
//     const updatedPerson = await Person.findById(id);
//     res.status(200).json(updatedPerson);
//   } catch (error) {
//     console.log(error);
//     res.status(204).json({ message: error.message });
//   }
// };
// const exitPerson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const person = await Person.findByIdAndUpdate(id, req.body);

//     if (!person) {
//       return res.status(404).json({ message: `${id} not found` });
//     }
//     const updatedPerson = await Person.findById(id);
//     res.status(200).json(updatedPerson);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// };
export default {
  getStudents,
  // getPerson,
  createStudent,
  deleteStudents,
  // getPersonsByDate,
  // getPersonsByPurpose,
  // getPersonByFirstName,
  // getPersonByLastName,
  // updatePerson,
  // exitPerson,
};
