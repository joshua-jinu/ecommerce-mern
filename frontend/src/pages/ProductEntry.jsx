import React, { useState } from 'react';
import axios from 'axios';

function ProductEntry() {
    const [data, setData] = useState({
        name: '',
        description:'',
        discountedPrice:0,
        price:0,
        stock:0,
        category:'',
        rating:0,
    })
    const [error, setError] = useState('');
    const [images, setImages] = useState(null);

    const handleImageUpload = (e) =>{
        const imageArray = Array.from(e.target.files);
        setImages(imageArray);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]:value,
        }));
        setError('');
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const {title,
            description,
            discountedPrice,
            price,
            stock,
            category,
            rating} = data;

        console.log(images);
        if(title.length<=0||description.length<=0||price<=0||stock<=0||category.length<=0)
            setError("Enter the information correctly")

        let formDataBody = new FormData();
        formDataBody.append('title', title);
        formDataBody.append('description', description);
        formDataBody.append('category', category);
        formDataBody.append('discountedPrice', discountedPrice);
        formDataBody.append('price', price);
        formDataBody.append('stock', stock);
        formDataBody.append('rating', rating);

        images.map((ele)=>{
            formDataBody.append('filepath', ele);
        })

        console.log(formDataBody);

        axios.post("http://localhost:8080/create-product", formDataBody, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
    }


  return (
    <div>
        {/* title
        description
        discounted price
        price
        stock
        category
        image upload - multiple
        rating
         */}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Product Form
        </h2>
      </div>

        <div>
            <span>{error}</span>
        </div>


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="title"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.description}
                onChange={handleChange}
              />
            </div>
          </div>


          <div>
            <label htmlFor="discounted-price" className="block text-sm/6 font-medium text-gray-900">
              Discounted Price
            </label>
            <div className="mt-2">
              <input
                id="discounted-price"
                name="discounted-price"
                type="number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.discountedPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                Price
              </label>
            </div>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                Stock
              </label>
            </div>
            <div className="mt-2">
              <input
                id="stock"
                name="stock"
                type="number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Category"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Upload Profile Picture
              </label>
            </div>
            <div className="mt-2">
              <input
                id="upload"
                name="upload"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageUpload}
                multiple
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                Rating
              </label>
            </div>
            <div className="mt-2">
              <input
                id="rating"
                name="rating"
                type="number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.rating}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

      </div>
    </div>
    </div>
  )
}

export default ProductEntry
