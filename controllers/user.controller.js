import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = async (req, res) => {
  User.find({}).then(function (users) {
    res.send(users);
    // console.log(users);
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    // return res.status(401).json({ message: "Unauthorized access" });
    return next(errorHandler(401, "Unauthorized access"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          department: req.body.department,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorized access"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
