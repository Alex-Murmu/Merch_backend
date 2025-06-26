const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentMethod: String,    // Example: "Razorpay", "Stripe", "COD"
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
