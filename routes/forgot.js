import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import sendResetPasswordEmail from "../utils/resetemail.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User with this email does not exist.' });
    }

    const token = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
    const url = `${process.env.BASE_URL}/api/reset-password?token=${token}`;

    sendResetPasswordEmail(email, token); 

    res.status(200).send({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
