import express from "express";
import {
  borrowBook,
  getMyBorrowList,
  returnBorrowBook,
  test,
} from "../controllers/borrow.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/borrowBook", borrowBook);
router.get("/myBorrowList/:username", getMyBorrowList);
router.get("/deleteFromBorrow", returnBorrowBook);

export default router;
