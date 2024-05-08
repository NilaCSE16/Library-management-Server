import express from "express";
import {
  borrowBook,
  getMyBorrowList,
  issuedBooks,
  returnBorrowBook,
  test,
} from "../controllers/borrow.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/borrowBook", borrowBook);
router.get("/myBorrowList/:username", getMyBorrowList);
router.get("/deleteFromBorrow", returnBorrowBook);
router.get("/issueBook", issuedBooks);

export default router;
