import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddressList from '../components/addressComponent/addressList';
import { useSelector } from 'react-redux';

function SelectAddress() {
    const [addresses, setAddresses] = useState([]);
    const data = useSelector((state) => state.user);
    useEffect(()=>{
        const fetchAddresses = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                alert('token missing please login again');
            }
            const res = await axios.get(`http://localhost:8080/user/get-addresses?token=${token}`);
            console.log(res);
            setAddresses(res.data.userInfo.address)
        }
        fetchAddresses();
    }, [])

  return (
    <div>
        <AddressList
            addresses={addresses}
        />
    </div>
  )
}

export default SelectAddress
