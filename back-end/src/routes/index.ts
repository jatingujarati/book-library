import express from 'express';
const router = express.Router();
import authRoute from './auth';
import bookRoute from './book';

/* GET home page. */
router.use('/auth', authRoute);
router.use('/books', bookRoute);

export default router;
