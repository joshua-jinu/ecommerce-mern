import mongoose from "mongoose";

const paymentSchema = {
  amount: { type: Number, require: true },
  isPaid: { type: Boolean, require: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  paidOrders: [{ type: mongoose.Types.ObjectId, ref: "Order", require: true }],
  razorpay: {
    orderId: { type: String, require: true },
    paymentId: { type: String, require: true },
    signature: { type: String, require: true },
  },
};

const SchemaPayment = new mongoose.Schema(paymentSchema, { versionKey: false });
export default mongoose.model("Payments", SchemaPayment);
