import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Card = ({ children, className = '' }) => (
 <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
   {children}
 </div>
);


const IconWrapper = ({ children }) => (
 <div className="bg-gray-100 p-2 rounded-full">{children}</div>
);


const InfoSection = ({ icon, label, value }) => (
 <div className="flex items-center gap-3">
   <IconWrapper>{icon}</IconWrapper>
   <div>
     <p className="text-sm text-gray-500">{label}</p>
     <p className="text-gray-900">{value}</p>
   </div>
 </div>
);

function ProfileCard() {
 const [userData, setUserData] = useState({});
 const data = useSelector((state) => state.user);

 useEffect(() => {
   const getUserData = async () => {
     const token = localStorage.getItem('token');
     if (!token) {
       return alert('Token missing login');
     }
     const response = await axios.get(
       `${import.meta.env.BACKEND_URL}/user/user-data?token=${token}`
     );


     setUserData(response.data.message);
     console.log(response.data.message.address)
   };
   getUserData();
 }, []);

 const handleDeleteAddress = async (id) =>{
  const token = localStorage.getItem('token');
  try {
    if(!token){
      console.log('token not present')
    }

    const res =await  axios.delete(`${import.meta.env.BACKEND_URL}/user/delete-address/${id}?token=${token}`);
    console.log("address deleted",res);
  } catch (error) {
    console.log(error.message);
  }
}

 return (
   <div className="min-h-screen bg-gray-50 p-4">
     <Card className="max-w-2xl mx-auto">
       {/* Header Section */}


       <div className="flex items-center gap-4 mb-8">
         <div className="bg-blue-100 p-4 rounded-full">
           {/* <svg
             className="w-12 h-12 text-blue-600"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
           >
             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
             <circle cx="12" cy="7" r="4" />
           </svg> */}
           <img
             src={userData?.avatar?.url}
             alt=""
             className="w-20 rounded-lg"
           />
         </div>
         <div>
           <h1 className="text-2xl font-bold text-gray-900">
             {userData.Name}
           </h1>
           <span className="text-gray-500 capitalize">{userData.role}</span>
         </div>
       </div>
       {/* Info Sections */}
       <div className="space-y-6">
         <InfoSection
           icon={
             <svg
               className="w-5 h-5 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
             >
               <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
             </svg>
           }
           label="User ID"
           value={<span className="font-mono text-sm">{userData._id}</span>}
         />


         <InfoSection
           icon={
             <svg
               className="w-5 h-5 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
             >
               <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
               <polyline points="22,6 12,13 2,6" />
             </svg>
           }
           label="Email"
           value={userData.email}
         />


         <InfoSection
           icon={
             <svg
               className="w-5 h-5 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
             >
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
               <circle cx="12" cy="7" r="4" />
             </svg>
           }
           label="Role"
           value={<span className="capitalize">{userData.role}</span>}
         />


         <InfoSection
           icon={
             <svg
               className="w-5 h-5 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
             >
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
               <circle cx="12" cy="10" r="3" />
             </svg>
           }
           label="Addresses"
           value={
             userData?.address?.length > 0 ? (
               <ul className="list-disc list-inside">
                 {userData.address.map((addr, index) => (
                     <div key={index}>
                        <button 
                          className='mt-8 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                          onClick={()=>{handleDeleteAddress(addr._id)}}
                        >
                          Delete Address 
                        </button>
                        {addr.addressType}
                        <br/>
                        {addr.address1}
                        <br/>
                        {addr.address2}
                        <br/>
                        {addr.city}, {addr.country}
                        <br/>
                        {addr.zipCode}
                        <br />
                        <br />
                        <br />
                    </div>
                   ))}
               </ul>
             ) : (
               <span className="text-gray-400 italic">
                 No addresses Founded
               </span>
             )
           }
           />
           <Link to='/add-address'>           
            <button className='mt-8 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
              Add Address 
            </button>
           </Link>
       </div>
       {/* Edit Button */}
       <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
         Edit Profile
       </button>
     </Card>
   </div>
 );
}

export default ProfileCard;