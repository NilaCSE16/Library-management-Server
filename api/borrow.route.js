import express from "express";
import {
  borrowBook,
  getMyBorrowList,
  test,
} from "../controllers/borrow.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/borrowBook", borrowBook);
router.get("/myBorrowList/:username", getMyBorrowList);

export default router;
