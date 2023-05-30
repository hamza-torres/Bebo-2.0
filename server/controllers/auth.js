import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/* REGISTER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, profilePicture, friends, location, bio } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePicture,
            friends,
            location,
            bio,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();

        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        delete existingUser.password;

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}