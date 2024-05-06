import express from "express";
import {
  addBook,
  bookCount,
  test,
  viewBooksList,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/addBook", addBook);
router.get("/viewBookList", viewBooksList);
router.get("/bookCount", bookCount);

export default router;
