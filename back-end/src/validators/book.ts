import Joi from 'joi';

// Schema for creating a new book
export const createBookSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().min(1).required()
  }),
};

// Schema for updating an existing book
export const updateBookSchema = {
  body: Joi.object({
    title: Joi.string().min(1),
    author: Joi.string().min(1),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    genre: Joi.string().min(1)
  }).or('title', 'author', 'year', 'genre'), // Ensure at least one field is present for updates
};

// Schema for retrieving a book by ID
export const getBookByIdSchema = {
  params: Joi.object({
    id: Joi.string().length(24).hex().required() // Assuming MongoDB ObjectId
  }),
};

// Schema for pagination
export const paginationSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    search: Joi.string().optional().allow("")
  })
};
