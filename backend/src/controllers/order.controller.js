import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

export async function confirmOrder(req, res) {
  const userId = req.UserId;
  const { items, address, totalAmount } = req.body;
  console.log("CONFIRM ORDER");

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "invalid user id", success: false });
    }

    if (!items) {
      return res
        .status(400)
        .send({ message: "Item not present", success: false });
    }
    const order = items.map(async (ele) => {
      return await orderModel.create({
        user: userId,
        orderItems: ele.productId._id,
        shippingAddress: address,
        totalAmount: totalAmount,
      });
    });
    await Promise.all(order);

    const itemsMapped = items.map(async (itm) => {
      return await cartModel.findByIdAndDelete(itm._id);
    });

    const checkDeletedItems = await Promise.all(itemsMapped);

    return res.status(201).send({
      message: "Order confirmed",
      success: true,
      order,
      checkDeletedItems,
    });
  } catch (error) {
    console.log("error in creating order", error.message);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
}

export async function getOrders(req, res) {
  const userId = req.UserId;
  console.log("GET Orders");

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "invalid user id", success: false });
    }
    const checkUser = await userModel.findOne({ _id: userId });
    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found, Sign up now", success: false });
    }

    const orders = await orderModel
      .find(
        {
          user: userId,
          orderStatus: { $ne: "Cancelled" },
        },
        { orderStatus: 1, orderItems: 1 }
      )
      .populate("orderItems");

    return res.status(200).send({
      message: "user orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log("error in fetching orders", error.message);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
}

export async function CancelOrder(req, res) {
  const userId = req.UserId;
  const orderId = req.query.orderId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "invalid user id", success: false });
    }
    const checkUser = await userModel.findOne({ _id: userId });
    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found, Sign up now", success: false });
    }

    await orderModel.findByIdAndUpdate(orderId, { orderStatus: "Cancelled" });

    return res.status(200).send({ message: "order cancelled", success: false });
  } catch (error) {
    console.log(error, message);
    return res.status(500).send({ message: error.message, success: false });
  }
}
