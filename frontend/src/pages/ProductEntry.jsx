import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductEntry() {
  const navigator = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    discountedPrice: 0,
    price: 0,
    stock: 0,
    category: "",
    rating: 0,
  });
  const [error, setError] = useState("");
  const [images, setImages] = useState(null);

  const handleImageUpload = (e) => {
    const imageArray = Array.from(e.target.files);
    setImages(imageArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      discountedPrice,
      price,
      stock,
      category,
      rating,
    } = data;

    if (
      title.length <= 0 ||
      description.length <= 0 ||
      price <= 0 ||
      stock <= 0 ||
      category.length <= 0
    ) {
      setError("Please fill out all fields correctly");
      return;
    }

    const formDataBody = new FormData();
    formDataBody.append("title", title);
    formDataBody.append("description", description);
    formDataBody.append("category", category);
    formDataBody.append("discountedPrice", discountedPrice);
    formDataBody.append("price", price);
    formDataBody.append("stock", stock);
    formDataBody.append("rating", rating);

    console.log(images);

    images?.forEach((image) => {
      formDataBody.append("files", image);
    });

    console.log(formDataBody)
    console.log(images)
    
    for (let pair of formDataBody.entries()) {
        if (pair[1] instanceof File) {
          console.log(
            `${pair[0]}: File - ${pair[1].name}, ${pair[1].type}, ${pair[1].size} bytes`
          );
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
    }

    axios.post("http://localhost:8080/product/create-product", formDataBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(()=>{
        navigator('/')
      })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Product Entry Form
        </h2>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label
              htmlFor="discountedPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Discounted Price
            </label>
            <input
              id="discountedPrice"
              name="discountedPrice"
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.discountedPrice}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.stock}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.category}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Images
            </label>
            <input
              id="upload"
              name="upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={handleImageUpload}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={data.rating}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEntry;
