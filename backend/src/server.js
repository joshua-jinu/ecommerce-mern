import {app} from './app.js'
import {connectDB} from './DB/database.js'
import dotenv from 'dotenv'

if(process.env.NODE_ENV!=='PRODUCTION'){
    dotenv.config({
        path:"./src/config/.env"
    });
}

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async ()=>{
    connectDB()
    console.log(`Server Listening on ${PORT}`)
})