import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ProfileCard() {
    const [userData, setUserData] = useState();
    useEffect(()=>{
        const getUserData = async () =>{
            const res = await axios.get(`/user/user-details?token=${localStorage.getItem('token')}`)
            setUserData(res.data.message)
        }    
    })

  return (
    <div>
      
    </div>
  )
}

export default ProfileCard
