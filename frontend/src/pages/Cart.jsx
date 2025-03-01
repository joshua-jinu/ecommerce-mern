import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartCard from '../components/cards/CartCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Cart() {

    const [userCartData, setUserCartData] = useState([]);
    const data = useSelector((state) => state.user);
    
    useEffect(()=>{
        const getData = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                return alert('please log in');
            }

            const res = await axios.get(`${import.meta.env.BACKEND_URL}/cart/get-user-cart-data?token=${token}`);
            console.log(res.data);
            console.log(res.data.certData)
            setUserCartData(res.data.cartData);
        }

        getData();
    }, [])
  return (
    <div className='flex justify-center flex-col items-center'>  
        {(userCartData.length>0)&&
        <div>
            <Link to="/select-address">
                <button className='bg-slate-600 bg-black text-white p-4 my-8 rounded-md'>Checkout</button>
            </Link>
        
            <div>
                {
                    userCartData?.map((ele, index)=>{
                        return(<CartCard
                            title = {ele.productId.title}
                            key = {index}
                            images={ele.productId.images[0]}
                            description = {ele.productId.description}
                            originalPrice = {ele.productId.price}
                            discountedPrice = {ele.productId.discountedPrice}
                            rating = {ele.productId.rating}
                            id={ele.productId._id}
                            createdBy={'createdBy'}
                        />)
                    })
                }
            </div>
        </div>
    
        }:{
            <div>
                <h2 className='font-medium text-black font-semibold'>
                    Cart is empty
                </h2>
            </div>
        }
    </div>
  )
}

export default Cart;
