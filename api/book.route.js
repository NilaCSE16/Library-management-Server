import express from "express";
import {
  addBook,
  bookCount,
  test,
  viewAuthor,
  viewBooksList,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/addBook", addBook);
router.get("/viewBookList", viewBooksList);
router.get("/bookCount", bookCount);
router.get("/bookWithWriter/:bookAuthor", viewAuthor);

export default router;
