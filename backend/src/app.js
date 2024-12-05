import express from 'express'
import dotenv from 'dotenv'

if(process.env.NODE_ENV!=='PRODUCTION'){
    dotenv.config({
        path:"./src/config/.env"
    });
}

export const app = express();

app.get('/', (req, res)=>{
    return res.send('Welcome to backend');
});