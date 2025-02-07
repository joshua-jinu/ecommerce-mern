import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

export async function confirmOrder(req, res) {
  const userId = req.userId;
  const { items, address, totalAmount } = req.body;

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

    constitemsMapped = items.map(async (itm) => {
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
    console.log("error in creating order");
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
}

export async function getOrders(req, res) {
  const userId = req.userId;

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

    const orders = orderModel.find({ user: userId });

    return res.status(200).send({
      message: "user orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.log("error in fetching orders");
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
}
