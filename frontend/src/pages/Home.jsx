import React, { useEffect, useState } from 'react'
import Card from '../components/cards/Card'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const [products, setData] = useState([]);
    const dataRedux = useSelector((state) => state.user);
 
    useEffect(()=>{
        const fetchProducts = async () =>{
            const res = await axios.get(`${import.meta.env.BACKEND_URL}/product/get-products`)
            setData(res.data.data);
        }        
        fetchProducts();
        console.log("data fetched");
    }, []);

    const handleDelete = async (id) =>{
        try {
            const data = await axios.delete(`${import.meta.env.BACKEND_URL}/product/${id}`);
            setData(data.data.data);
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <div className='flex flex-wrap w-full justify-around items-center'>
        {products.map( (ele, index) => {
            return (
                <div key={index}>
                    <Card 
                        title={ele.title}
                        sp={ele.discountedPrice}
                        mrp={ele.price}
                        url={ele.images[0]?ele.images[0]:"product image missing"}
                        id={ele._id}
                        handleDelete={handleDelete}
                    />
                </div>
            );
        })}
    </div>
  )
}

export default Home
