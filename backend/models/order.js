const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    orderId: {
      type: String
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
      pincode: String
    },

    paymentStatus: {
      type: String,
      default: "pending"
    },

    orderStatus: {
      type: String,
      default: "placed"
    },

    paymentMethod: {
      type: String,
      default: "UPI"
    },

    paymentId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
