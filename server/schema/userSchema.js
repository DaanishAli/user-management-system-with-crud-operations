import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  contact: String,
});
const user = mongoose.model("users", userSchema);
export default user;
