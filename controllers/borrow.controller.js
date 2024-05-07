import BooksList from "../models/book.model.js";
import borrowList from "../models/borrow.model.js";

export const test = async (req, res) => {
  res.json({ message: "New book added" });
};

export const borrowBook = async (req, res, next) => {
  const { bookId, bookTitle, bookAuthor, userName, issueDate, returnDate } =
    req.body;
  //   console.log(req.body);
  const borrowInfo = new borrowList({
    bookId,
    bookTitle,
    bookAuthor,
    userName,
    issueDate,
    returnDate,
  });
  try {
    await borrowInfo.save();
    const document = await BooksList.findOne({ bookId: bookId });
    console.log(document.bookAvailable);
    await BooksList.updateOne(
      {
        bookId: bookId,
      },
      {
        $set: {
          bookAvailable: document.bookAvailable - 1,
        },
      }
    );
    console.log(document.bookAvailable);
    res.status(200).json({ message: "Borrow Information Noted" });
  } catch (error) {
    next(error);
  }
  // console.log(borrowInfo);
};
