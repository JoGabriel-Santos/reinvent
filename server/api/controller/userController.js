import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

const secret = "Y8bD7rK2sF9aZ1";

export const changeUserInfo = async (request, response) => {
    const { userName, displayName, newEmail, curEmail, profilePicture, newPassword, curPassword,  } = request.body;

    if (!userName || !displayName || !curEmail || !curPassword) {
        return response.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await User.findOne({ email: curEmail });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(curPassword, user.password);
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: "Incorrect password" });
        }

        user.userName = userName;
        user.displayName = displayName;

        if (newEmail) {
            user.email = newEmail;
        }

        if (profilePicture) {
            user.profilePicture = profilePicture;
        }

        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 12);
        }

        await user.save();

        const token = jwt.sign(
            { email: user.email, id: user._id }, secret, { expiresIn: "1h" });

        response.status(200).json({ result: user, token });

    } catch (error) {
        response.status(500).json({ message: "An error occurred while updating user information" });
    }
};

export const signin = async (request, response) => {
    const { email, password } = request.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return response.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

        response.status(200).json({ result: existingUser, token });

    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
};

export const signup = async (request, response) => {
    const { userName, email, password } = request.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ userName, email, password: hashedPassword, });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id }, secret, { expiresIn: "1h" });

        response.status(201).json({ result: newUser, token });

    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
};