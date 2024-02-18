import mongoose from "mongoose";

const educatorSchema = mongoose.Schema({
  username: String,

  firstName: String,
  lastName: String,
  passwordHash: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

educatorSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Educator = mongoose.model("Educator", educatorSchema);

export default Educator;
