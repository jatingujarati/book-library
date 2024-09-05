import { NextFunction, Request, Response } from 'express';
import Book from '../models/Book';

// Get all books
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Get search query
    const searchQuery = req.query.search as string || '';

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * limit;

    // Construct search query
    const searchRegex = new RegExp(searchQuery, 'i');

    const _condition = {
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
        { genre: { $regex: searchRegex } },
      ]
    }
    const books = await Book.find(_condition)
      .sort({ _id: -1 }).skip(skip).limit(limit);

    const totalBooks = await Book.countDocuments(_condition);

    res.json({ status: 200, message: 'Books retrieved successfully', data: { books, pagination: { page, limit, total: totalBooks, totalPages: Math.ceil(totalBooks / limit) } } });
  } catch (err) {
    console.log(`::::::::::::: ~ err:::::::::::::`, err);
    next(err);
  }
};

// Get a specific book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ status: 200, message: 'Books retrieved successfully', data: { book } });
  } catch (error) {
    next(error);
  }
};

// Add a new book
export const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, year, genre } = req.body;

    const newBook = new Book({ title, author, year, genre });
    await newBook.save();

    res.json({ status: 200, message: 'Books added successfully', data: { newBook } });
  } catch (error) {
    next(error);
  }
};

// Update an existing book by ID
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, year, genre } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year, genre },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ status: 200, message: 'Books updated successfully', data: { updatedBook } });
  } catch (error) {
    next(error);
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.json({ status: 200, message: 'Books deleted successfully' });
  } catch (error) {
    next(error);
  }
};
