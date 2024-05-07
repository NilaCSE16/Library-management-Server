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
    // console.log(document.bookAvailable);
    res.status(200).json({ message: "Borrow Information Noted" });
  } catch (error) {
    next(error);
  }
  // console.log(borrowInfo);
};

export const getMyBorrowList = async (req, res, next) => {
  const username = req.params.username;
  //   console.log(username);
  borrowList
    .find({ userName: username })
    .then((books) => {
      res.send(books);
    })
    .catch((error) => {
      next(error);
    });
};

export const returnBorrowBook = async (req, res, next) => {
  const bookId = req.query.bookId;
  const userName = req.query.userName;
  //   borrowList.find({ bookId, userName }).then((remain) => {
  //     // console.log(remain);
  //   });
  const criteria = { bookId: bookId, userName: userName };
  try {
    const result = await borrowList.deleteOne(criteria);
    const document = await BooksList.findOne({ bookId: bookId });
    console.log(document.bookAvailable);
    await BooksList.updateOne(
      {
        bookId: bookId,
      },
      {
        $set: {
          bookAvailable: document.bookAvailable + 1,
        },
      }
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
};
