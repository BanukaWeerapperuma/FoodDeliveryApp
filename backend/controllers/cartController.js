import userModel from "../models/userModel.js";


//add item to user cart

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authenticated request
        const { itemId } = req.body; // Item ID to be added to the cart

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item ID is required" });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};  // Default to an empty object if cartData is not set

        // Increment the cart item quantity
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update the user's cartData
        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        // Check if the update was successful
        if (updatedUser) {
            res.status(200).json({ success: true, message: "Item added to cart", cartData: updatedUser.cartData });
        } else {
            res.status(400).json({ success: false, message: "User not found" });
        }

    } catch (error) {
        console.error("addToCart error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};








//remover item from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authenticated request
        const { itemId } = req.body; // Item ID to be removed from the cart

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item ID is required" });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};  // Default to an empty object if cartData is not set

        // Check if the item exists in the cart
        if (cartData[itemId] && cartData[itemId] > 0) {
            // Decrement the cart item quantity
            cartData[itemId] -= 1;
            // If the quantity reaches 0, you can either delete the item or keep it
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove the item from the cart if quantity reaches 0
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart or already 0" });
        }

        // Update the user's cartData in the database
        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        // Check if the update was successful
        if (updatedUser) {
            res.status(200).json({ success: true, message: "Item removed from cart", cartData: updatedUser.cartData });
        } else {
            res.status(400).json({ success: false, message: "User not found" });
        }

    } catch (error) {
        console.error("removeFromCart error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};





//fetch user cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authenticated request

        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {}; // Default to an empty object if cartData is not set

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("getCart error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};




export { addToCart, removeFromCart, getCart };