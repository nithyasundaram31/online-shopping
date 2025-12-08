const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: Number,
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String,
  },
  paymentStatus: {
    type: String,
    default: "pending" // pending → paid
  }
});


 module.exports =mongoose.model("Order", orderSchema);