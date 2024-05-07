import express from "express";
import { borrowBook, test } from "../controllers/borrow.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/borrowBook", borrowBook);

export default router;
