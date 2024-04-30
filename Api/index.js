import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
// import cors from "cors";
import cookieParser from "cookie-parser";
import bookRoutes from "./routes/book.route.js";
import path from "path";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const __dirname = path.resolve();
const app = express();

// app.use(express.static(path.join(__dirname, "../../Client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../Client/dist/index.html"));
// });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Api/views/index.html");
  // res.send("Application");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode: statusCode,
  });
});
// app.use(cors());
