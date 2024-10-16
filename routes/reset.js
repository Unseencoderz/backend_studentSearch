import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid token.' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).send({ message: 'Password has been reset.' });
  } catch (error) {
    res.status(400).send({ message: 'Invalid or expired token.' });
  }
});

export default router;
