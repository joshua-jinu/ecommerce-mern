import React from 'react'
import Card from '../components/Card'

const products = new Array(20).fill({
    title: "Nike Air MX Super 2500 - Red",
    url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    sp: 499,
    mrp: 699
})

function Home() {
  return (
    <div className='flex flex-wrap w-full justify-around items-center'>
        {products.map( (ele, index) => {
            return (
                <div key={index}>
                    <Card {...ele} />
                </div>
            );
        })}
    </div>
  )
}

export default Home
