import { asyncHandler } from "../../utils/asyncHandler.js";
import { Book } from "./book.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  const response = new ApiResponse(200, "Books fetched successfully", books);
  return res.status(response.statusCode).json(response);
});

export const addBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);

  const response = new ApiResponse(201, "Book added successfully", book);
  return res.status(response.statusCode).json(response);
});
