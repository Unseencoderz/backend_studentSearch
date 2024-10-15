import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send({ message: 'Token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).send({ message: 'Invalid verification link.' });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).send({ message: 'Email verified successfully.' });
  } catch (error) {
    res.status(400).send({ message: 'Invalid or expired token.' });
  }
});

export default router;
