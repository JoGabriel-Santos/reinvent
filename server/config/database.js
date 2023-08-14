import mongoose from "mongoose";

const CONNECTION_URL = "mongodb+srv://reinvent:EUhOQESyW9Z0iNuO@reinventdb.oycqslz.mongodb.net/reinvent?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};

export default connectDB;