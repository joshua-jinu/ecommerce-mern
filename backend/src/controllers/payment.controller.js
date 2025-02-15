import razorpay from "razorpay";
import paymentModel from "../models/payment.model.js";
import mongoose from "mongoose";

console.log({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function createOrder(req, res) {
  const { amount, currency } = req.body;
  try {
    const instance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const orders = await instance.orders.create({
      amount: amount * 100,
      currency: currency,
    });
    if (!orders) {
      return res
        .status(500)
        .send({ message: "Order Creation un-successfull", success: false });
    }
    return res
      .status(201)
      .send({ message: "Order Creation Successfull", orders, success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}
export async function PayOrders(req, res) {
  const userId = req.UserId;
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    amount,
    orderIds,
  } = req.body;
  console.log(orderIds);

  // ['787bsmvd9098u']; //mongodb ObjectID
  console.log(razorpayPaymentId, razorpayOrderId, razorpaySignature);
  const mappedIds = orderIds.map((ele) => new mongoose.Types.ObjectId(ele._id));
  try {
    await paymentModel.create({
      isPaid: true,
      user: userId,
      amount,
      paidOrders: mappedIds,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    return res
      .status(201)
      .send({ message: "Payment Successfull.", success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}

export async function getKeys(req, res) {
  try {
    return res
      .status(200)
      .send({ key: process.env.RAZORPAY_KEY_ID, success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}
