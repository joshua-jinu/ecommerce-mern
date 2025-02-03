import orderModel from "../models/order.model";

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
    const order = await orderModel.create({
      user: userId,
      orderItems: items,
      shippingAddress: address,
      totalAmount: totalAmount,
    });
    return res
      .status(201)
      .send({ message: "Order confirmed", success: true, order });
  } catch (error) {
    console.log("error in creating order");
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
}
