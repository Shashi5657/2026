import { Router } from "express";
import {
  getAllBooks,
  addBook,
  getBookByID,
  updateBook,
  deleteBook,
} from "./book.controller.js";
import { updateBookSchema } from "./book.schema.js";
import { validate } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllBooks);

router.post("/", addBook);

router.get("/:id", getBookByID);

router.patch("/:id", validate(updateBookSchema), updateBook);

router.delete("/:id", deleteBook);

export default router;
