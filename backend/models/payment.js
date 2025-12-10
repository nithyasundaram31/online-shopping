// models/Order.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  amount: { type: Number, required: true },
  paymentId: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
