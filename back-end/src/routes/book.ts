import express from 'express';
import { validate } from 'express-validation';

import { getBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/book';
import { createBookSchema, updateBookSchema, getBookByIdSchema, paginationSchema } from '../validators/book';

const router = express.Router();

router.get('/', validate(paginationSchema), getBooks);
router.get('/:id', validate(getBookByIdSchema), getBookById);
router.post('/', validate(createBookSchema), addBook);
router.put('/:id', validate({ ...getBookByIdSchema, ...updateBookSchema }), updateBook);
router.delete('/:id', validate(getBookByIdSchema), deleteBook);

export default router;
