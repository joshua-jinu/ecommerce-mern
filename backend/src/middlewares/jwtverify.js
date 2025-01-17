import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

if(process.env.NODE!='PRODUCTION'){
    dotenv.config({
        path: "./config/.env"
    })
}

export const verifyUser = (err, req, res, next) =>{
    const {token} = req.query;
    if(!token){
        return res.status(404).send({message: "Send token over requrest"});
    }
    
    const data = jwt.verify(req.body.token, process.env.SECRET_KEY);
    req.userEmailAddress = data.email;
    res.UserId = data.id;
    next();

}
