import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartCard from '../components/cards/CartCard';

function Cart() {

    const [userCartData, setUserCartData] = useState([]);
    
    useEffect(()=>{
        const getData = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                return alert('please log in');
            }

            const res = await axios.get(`http://localhost:8080/cart/get-user-cart-data?token=${token}`);
            console.log(res.data);
            setUserCartData(res.data.cartData);
        }

        getData();
    }, [])
  return (
    <>
        {
            userCartData.map((ele, index)=>{
                return(<CartCard
                    title = {ele.productId.title}
                    key = {index}
                    image = {ele.productId.images[0]}
                    description = {ele.productId.description}
                    originalPrice = {ele.productId.originalPrice}
                    discountedPrice = {ele.productId.discountedPrice}
                    rating = {ele.productId.rating}
                    id={ele.productId._id}
                    createdBy={'createdBy'}
                />)
            })
        }
    </>
  )
}

export default Cart;
