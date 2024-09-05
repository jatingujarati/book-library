import express from 'express';
const router = express.Router();

import { login, register } from '../controllers/auth';
import { registerSchema, loginSchema } from '../validators/auth';
import { validate } from 'express-validation';

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
