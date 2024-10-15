import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/verifyemail.js';
import { User, validate } from '../models/user.js';
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with given email already exists!" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const token = jwt.sign({ email: req.body.email }, process.env.EMAIL_TOKEN_SECRET, { expiresIn: '1d' });

        const newUser = new User({
            ...req.body,
            password: hashPassword,
            isVerified: false,
        });

        await newUser.save();

        await sendVerificationEmail(req.body.email, token);
        
        res.status(201).send({ message: "User created. Please verify your email." });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
