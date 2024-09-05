import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import mongooseConnection from './config/mongoose';
import indexRouter from './routes/index';
import { handler, converter, notFound } from './middleware/error';

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins (use specific origins for more security)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

// Use CORS middleware
app.use(cors(corsOptions));

// Connect to MongoDB
mongooseConnection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

export default app;
