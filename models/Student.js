import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  //   middleInitial: String,
  user: String,
  // photoInfo: {
  //   url: String,
  //   filename: String,
  // },
  section: String,
});

studentSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
