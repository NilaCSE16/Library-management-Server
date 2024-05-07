import BooksList from "../models/book.model.js";

export const test = async (req, res) => {
  res.json({ message: "New book added" });
};

export const addBook = async (req, res, next) => {
  const {
    bookId,
    bookTitle,
    bookAuthor,
    bookSummary,
    bookAvailable,
    bookCover,
  } = req.body;
  const newBook = new BooksList({
    bookId,
    bookTitle,
    bookAuthor,
    bookSummary,
    bookAvailable,
    bookCover,
  });
  //   console.log(newBook);
  try {
    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    next(error);
  }

  //   res.send(newBook);
};

export const viewBooksList = async (req, res) => {
  BooksList.find({}).then((books) => {
    res.send(books);
  });
};

export const bookCount = (req, res, next) => {
  BooksList.countDocuments({})
    .then((count) => {
      res.send({ count });
    })
    .catch((error) => {
      next(error);
    });
};

export const viewAuthor = (req, res, next) => {
  const bookAuthor = req.params.bookAuthor;
  // console.log(author);
  BooksList.find({ bookAuthor: bookAuthor })
    .then((books) => {
      res.send(books);
    })
    .catch((error) => {
      next(error);
    });
};
