import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import APIError from '../utils/APIError';

type User = {
  _id: number;
  username: string;
  email: string;
};

// Allow User to be null
type UserOrNull = User | null;

export interface AuthRequest extends Request {
  user?: User;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new APIError({ status: 401, message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecret');

    const userObj: UserOrNull = await User.findById((decoded as any).id);

    if (userObj) {
      req.user = userObj;
      next();
    } else {
      throw new APIError({ status: 401, message: 'Invalid token' });
    }
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;

