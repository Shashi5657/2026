import { asyncHandler } from "../../utils/asyncHandler.js";
import { Book } from "./book.model.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import mongoose from "mongoose";

// Get all books
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  if (!books) {
    return res.status(404).json({ message: "Books not found" });
  }

  const response = new ApiResponse(200, "Books fetched successfully", books);
  return res.status(response.statusCode).json(response);
});

// Get book by ID
export const getBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const response = new ApiResponse(200, "Book fetched successfully", book);
  return res.status(response.statusCode).json(response);
});

// Add a new book
export const addBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);

  const response = new ApiResponse(201, "Book added successfully", book);
  return res.status(response.statusCode).json(response);
});

// Update a book
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const response = new ApiResponse(200, "Book updated successfully", book);
  return res.status(response.statusCode).json(response);
});

//Delete a book
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const response = new ApiResponse(200, "Book deleted successfully", book);
  return res.status(response.statusCode).json(response);
});
