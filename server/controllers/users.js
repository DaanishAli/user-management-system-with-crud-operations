import User from "../schema/userSchema.js";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const singleUser = await User.find({ _id: req.params.id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "user deleted successfuly" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const user = req.body;
  const updateUser = new User(user);
  try {
    await User.updateOne({ _id: req.body._id }, updateUser);
    res.status(201).json({ message: "user updated successfuly" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
