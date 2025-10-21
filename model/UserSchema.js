import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    default: "user",
  },
  isblock: {
    type: Boolean,
    default: "false",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "http://www.avater.com/avater/",
  },
});

const Usermodel = mongoose.model("User",UserSchema);
export default Usermodel;


