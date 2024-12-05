import mongoose from 'mongoose'

export const connectDB = async ()=>{
    mongoose
        .connect(process.env.DB_URI)
        .then((data)=>{
            console.log(`Database connected successfully: ${data.connection.host}`);
        })
        .catch((err)=>console.log(`Database connection failed: ${err}`));
}