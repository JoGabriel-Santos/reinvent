import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;