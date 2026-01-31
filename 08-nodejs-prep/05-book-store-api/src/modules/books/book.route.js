import { Router } from "express";
import { getAllBooks, addBook } from "./book.controller.js";

const router = Router();

router.get("/", getAllBooks);

router.post("/", addBook);

export default router;
