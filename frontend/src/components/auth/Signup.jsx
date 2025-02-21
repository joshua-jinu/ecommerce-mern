import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {Validate} from '../../validation.js'
import axios from 'axios'

function Signup() {
  const [data, setData] = useState({
    name: '',
    email:'',
    password:'',
    file: ''
  })
  const [error, setError] = useState('');
  const navigateUser = useNavigate();

  const handleChange = (e) =>{
    const {name, value, files} = e.target;
    console.log(files);
    if(name=='file'){
      setData({
        ...data, 
        [name]: files[0]
      })
    }else{
      setData((prev)=>({
        ...prev,
        [name]:value,
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NameV = Validate.validateName(data.name);
    const EmailV = Validate.validateEmail(data.email);
    const PassV = Validate.validatePass(data.password);


    if(typeof NameV=='string' && NameV.length>1){
      return setError(NameV);
    }
    if(typeof EmailV=='string' && EmailV.length>1){
      return setError(EmailV);
    }
    if(typeof PassV=='string' && PassV.length>1){
      return setError(PassV);
    }

    const formDataBody = new FormData();
    formDataBody.append("email", data.email);
    formDataBody.append("password", data.password);
    formDataBody.append("name", data.name);
    formDataBody.append("file", data.file);

    console.log(data.file)
    try {
      await axios.post(`${import.meta.env.BACKEND_URL}/user/signup`, formDataBody, {
        headers: {
          'Content-Type':'multipart/form-data',
        }
      });
      navigateUser('/login');
      
    } catch (error) {
      console.log("Something went wrong"+error);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.name}
                onChange={handleChange}
              />
            </div>
          </div>


          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={data.password}
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
                id="file"
                name="file"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
          </div>

          <div>
            {error}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Have an account?{' '}
          <NavLink to="/login">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log In Now
            </a>
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Signup
