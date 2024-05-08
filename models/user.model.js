import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://images.unsplash.com/profile-1645673990842-86a791fa5deaimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
