import React from 'react'
import {X, RotateCcw} from 'lucide-react'
import { Link } from 'react-router-dom'

function CartCard({
    title,
    images,
    description,
    originalPrice,
    discountedPrice,
    rating,
    id,
    createdBy,
    orderStatus,
    handleCancel
}) {

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4">
     <div className="flex gap-6">

       {/* Product Image */}
       <div className="relative w-64">
        <Link to={`/product/product-details/${id}`}>
            <img
            src={typeof images == 'string' ? images : images[0]}
            alt="Product Image"
            className="rounded-lg object-cover"
            />
        </Link>
       </div>


       {/* Product Details */}
       <div className="flex-1">
        {
          orderStatus&& 
            <span className={`px-3 py-1 rounded-full text-sm ${
              orderStatus ==='Cancelled'?
              'bg-red-100 text-red-900':
              orderStatus === 'Delivered'
              ? 'bg-green-100 text-green-800': 
              orderStatus === 'Shipped'
              ? 'bg-blue-100 text-blue-800': 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {orderStatus}
            </span> 
          }
         <div className="flex justify-between items-start">
           <div>
             <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
             <p className="text-lg text-gray-600">{description}</p>
             <p className="text-gray-500 mt-1">Sold by: {createdBy}</p>
           </div>
           <button className="text-gray-500 hover:text-gray-700" onClick={handleCancel?()=>{handleCancel(id)}:()=>{}}>
             <X className="w-6 h-6" />
           </button>
         </div>


         {/* Size and Quantity Selectors */}


         {/* Price Information */}
         <div className="mt-6 flex items-center gap-3">
           <span className="text-2xl font-bold">₹{discountedPrice}</span>
           <span className="text-gray-500 line-through">
             ₹{originalPrice}
           </span>
           {/* <span className="text-red-500">
             {disPercentage <= 0 ? 0 : disPercentage}% OFF
           </span> */}
         </div>


         {/* Return Policy */}
         <div className="mt-4 flex items-center gap-2 text-gray-600">
           <RotateCcw className="w-5 h-5" />
           <span>14 days return available</span>
         </div>
       </div>
     </div>
   </div>
  )
}

export default CartCard;
