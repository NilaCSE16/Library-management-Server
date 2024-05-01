import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookSummary: {
    type: String,
    required: true,
  },
  bookAvailable: {
    type: Number,
    default: 0,
    required: true,
  },
  bookCover: {
    type: String,
    default:
      "https://c8.alamy.com/comp/E4JAAG/old-book-cover-vintage-texture-isolated-clipping-path-E4JAAG.jpg",
  },
});

const BooksList = mongoose.model("BooksList", bookSchema);

export default BooksList;
