import mongoose from "mongoose";

const borrowSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
});

const borrowList = mongoose.model("BorrowList", borrowSchema);

export default borrowList;
