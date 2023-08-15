import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creatorName: {
        type: String,
        required: true,
    },
    creatorPicture: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productPicture: {
        type: String,
        required: true,
    },
    fileURL: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;