import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import APIError from '../utils/APIError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) throw new APIError({ status: 409, message: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    const userPayload = { _id: user.id, email: user.email, username: user.username };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });

    res.json({ user: userPayload, token });
  } catch (err) {
    next(err)
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new APIError({ status: 404, message: 'User does not exists with given email' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const userPayload = { _id: user.id, email: user.email, username: user.username };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });

    res.json({ user: userPayload, token });
  } catch (err) {
    next(err);
  }
};
