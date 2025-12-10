const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");

exports.createPayment = async (req, res) => {
  try {
    const { amount, userId, items } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to paise
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    const newPayment = await Payment.create({
      userId,
      items,
      amount,
      paymentId: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: newPayment._id,
    });
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};
