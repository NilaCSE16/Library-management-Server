import express from "express";
import {
  addBook,
  test,
  viewBooksList,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/addBook", addBook);
router.get("/viewBookList", viewBooksList);

export default router;
