import mongoose from "mongoose";
const Connetion = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@USER MANAGEMENT SYSTEM WITH CRUD OPERATIONS.burbt1r.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected seccussfully");
  } catch (error) {
    console.log("Error while connection with DB:", error);
  }
};
export default Connetion;
