const Order = require("../models/order");

exports.addOrder = async (req, res) => {
  try {
    const { items, name, phone, street, city, pincode, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items found in order" });
    }
  //  user: req.user.userId,
  console.log("order user id is:", req.user.userId);
    const newOrder = new Order({
      user: req.user.userId,
      items,
      totalAmount,
      address: {
        name,
        phone,
        street,
        city,
        pincode
      },
      paymentStatus: "pending"
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (error) {
     console.log("ORDER CREATE ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};
