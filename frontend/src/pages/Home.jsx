import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios';

function Home() {
    const [products, setData] = useState([{
        title: "Nike Air MX Super 2500 - Red",
        images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"],
        discountedPrice: 499,
        price: 699
    }]);
 
    useEffect(()=>{
        const fetchProducts = async () =>{
            const res = await axios.get("http://localhost:8080/product/get-products")
            console.log(res.data.data);
            setData(res.data.data);
        }        
        fetchProducts();
        console.log("data fetched");
    }, []);

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
                    />
                </div>
            );
        })}
    </div>
  )
}

export default Home
