import Product from "../../models/product.js";

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find();

        response.status(200).json(products);

    } catch (error) {
        response.status(500).json({ message: "An error occurred" });
    }
};

export const publishProduct = async (request, response) => {
    try {
        const { userLogged, productInfo } = request.body;

        const newProductData = {
            ...productInfo,
            creator_id: userLogged._id,
            creatorName: userLogged.displayName,
            creatorPicture: userLogged.profilePicture
        };

        const newProduct = new Product(newProductData);
        await newProduct.save();

        response.status(200).json({ message: "Product published successfully" });

    } catch (error) {
        response.status(500).json({ message: "An error occurred" });
    }
};