import axios from 'axios';
import { useEffect, useState } from 'react';
import CartCard from '../components/cards/CartCard';

function OrderHistory() {
  const [OrderedData, SetOrderedData] = useState([]);


  const fetchedOrderedProducts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token not present, log in again');
    }
    const response = await axios.get(
      `http://localhost:8080/order/user-orders-data?token=${token}`
    );
    const reversedData = response.data.orders?.reverse();

    console.log(response.data.orders);
    SetOrderedData(reversedData);
  };
  useEffect(() => {
    fetchedOrderedProducts();
  }, []);

  const handleCancel = async (id) => {
    console.log(id);
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('Token is missing , Please login');
    }
    await axios.patch(
      `http://localhost:8080/order/cancel-order?token=${token}&orderId=${id}`
    );
    console.log("cancelled");
    fetchedOrderedProducts();
  };
  return (
    <div>
      {OrderedData?.map((singleCartObject, index) => {
        return (
          <div key={index}>
            <CartCard
              title={singleCartObject.orderItems.title}
              images={singleCartObject.orderItems.images[0]}
              description={singleCartObject.orderItems.description}
              originalPrice={singleCartObject.orderItems.originalPrice}
              discountedPrice={singleCartObject.orderItems.discountedPrice}
              id={singleCartObject._id}
              orderStatus={singleCartObject.orderStatus}
              createdBy={'nayan@k.com'}
              handleCancel={handleCancel}
            />
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;