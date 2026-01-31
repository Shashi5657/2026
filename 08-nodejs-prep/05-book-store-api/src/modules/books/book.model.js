// src/modules/book/book.model.js

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    publishedDate: {
      type: Date,
      min: new Date("1000-01-01"),
      max: () => new Date(),
      default: () => new Date(),
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
