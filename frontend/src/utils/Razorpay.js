import axios from "axios";
export const handlePay = async (total, token, orderIds) => {
  try {
    const createOrdersResponse = await axios.post(
      `${import.meta.env.BACKEND_URL}/payment/create-order`,
      {
        amount: total,
        currency: "INR",
      }
    );
    const { amount, id: orderId, currency } = createOrdersResponse.data.orders;

    // get the keys
    // key_id and key_secret
    const responseKeys = await axios.get(
      `${import.meta.env.BACKEND_URL}/payment/get-razorpay-key`
    );
    // pay order
    // make the payment and create a document
    const keys = responseKeys.data;

    const options = {
      key: keys.key,
      amount: amount,
      currency: currency,
      name: "Ecom Follow along",
      description: "Test Transaction",
      image:
        "https://cdn.vectorstock.com/i/500p/22/42/eco-green-leaf-concept-vector-1722242.jpg",
      order_id: orderId,
      handler: async function (response) {
        const result = await axios.post(
          `http://localhost:8080/payment/pay-order?token=${token}`,
          {
            amount: amount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            orderIds,
          }
        );
        alert(result.data.message);
      },
      prefill: {
        name: "Joshua Jinu",
        email: "joshuajinu007@gmail.com",
        contact: "7676571943",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "yellow",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (er) {
    console.log(er.message);
  }
};
