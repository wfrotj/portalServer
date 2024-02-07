import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const SECRET = process.env.SECRET;

export default {
  PORT,
  MONGODB,
  SECRET,
};
