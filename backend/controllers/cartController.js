// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//  Add item to cart
exports.addToCart = async (req, res) => {
  try { 
       
    const userId = req.user.userId;
    console.log('the uerId  exist in cartcontroller is:',userId)
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user’s existing cart or create new
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart, create one
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity }],
      });
    } else {
      // If cart exists, check if product is already added
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
       return res.status(200).json({
          message: "Product already exists in cart",
          cart
        })
      } else {
        // Add new product
        cart.items.push({ productId, quantity });
      }
    }

    // Save cart
    await cart.save();
    return res.status(200).json({ message: "Added to cart successfully", cart });
  } catch (error) {
    console.error(" Error in addToCart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// 📌 Increase Quantity
exports.increaseQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    item.quantity += 1;
    await cart.save();

    // populate again for frontend
    const updatedCart = await Cart.findOne({ user: userId }).populate("items.productId");

    res.status(200).json({ message: "Quantity increased", cart: updatedCart });

  } catch (error) {
    console.error("Error in increaseQuantity:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// 📌 Decrease Quantity
exports.decreaseQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Only decrease if quantity > 1
    if (item.quantity > 1) {
      item.quantity -= 1;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate("items.productId");

    res.status(200).json({ message: "Quantity decreased", cart: updatedCart });

  } catch (error) {
    console.error("Error in decreaseQuantity:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//  Get cart items
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.productId");
    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(" Error in getCart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//  Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out removed item
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
      
    await cart.save();
    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error(" Error in removeFromCart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
