import express from 'express'
import dotenv from 'dotenv'
import userHandler from './routes/user.routes.js'

if(process.env.NODE_ENV!=='PRODUCTION'){
    dotenv.config({
        path:"./src/config/.env"
    });
}

export const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    return res.send('Welcome to backend');
});


app.use('/user', userHandler)