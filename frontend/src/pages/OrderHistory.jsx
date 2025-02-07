import React, { useEffect, useState } from 'react'
import CartCard from '../components/cards/CartCard';
import axios from 'axios';

function OrderHistory() {
    const [orderData, setOrderData] = useState();

    useEffect(()=>{
        const fetchOrders = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                console.log("Please log in, token not present")
            }
            const res = await axios.get(`http://localhost:8080/user-orders-data?token=${token}`)
            console.log(res?.data?.orders)
            setOrderData(res?.data?.orders)
        }
        fetchOrders();
    }, [])

  return (
    <div>
        {orderData?.map((ele, index)=>{
          <CartCard
              title = {ele.productId.title}
            key = {index}
            images={ele.productId.images[0]}
            description = {ele.productId.description}
            originalPrice = {ele.productId.price}
            discountedPrice = {ele.productId.discountedPrice}
            rating = {ele.productId.rating}
            id={ele.productId._id}
            orderStatus={ele.orderStatus}
            createdBy={'createdBy'}
          />
        })}
    </div>
  )
}

export default OrderHistory
