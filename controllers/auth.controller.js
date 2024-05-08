import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import express from "express";
// const app = express();

// app.use(cookieParser());

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, department, password, userType } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    department: department,
    password: hashedPassword,
    role: userType,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created Successfully" });
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    // console.log(validUser.password);
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // console.log(validPassword);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    //   console.log(validPassword);
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // split password form validUser
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1hr
    // console.log(token);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        partitioned: true,
        expires: expiryDate,
      })
      .header("Authorization", token)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1hr
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
          sameSite: "none",
          secure: true,
          partitioned: true,
        })
        .header("Authorization", token)
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // console.log(generatedPassword);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        department: null,
        password: hashedPassword,
        role: "User",
        profilePicture: req.body.photo,
      });
      // console.log(newUser);
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1hr
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
          sameSite: "none",
          secure: true,
          partitioned: true,
        })
        .header("Authorization", token)
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  const cookie = req?.cookies;
  console.log("Cookie: ", cookie);
  res
    .clearCookie("access_token")
    .status(200)
    .send({ message: "Sign out successfully" });
};
