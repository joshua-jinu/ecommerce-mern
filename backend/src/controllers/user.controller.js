import User from '../models/user.model.js'
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { transporter } from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const generateToken = (data) => {
    const token = jwt.sign({name: data.name, email: data.email, password: data.password}, process.env.SECRET_KEY);
    return token;
};

const verifyUser = (token)=>{
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if(verify){
        return verify;
    }else{
        return false;
    }
}

export const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        console.log("data not provided")
        return res.status(204).send({success: false, message: "Data not present"})
    }

    const userExists = await User.findOne({email: email});
    if(userExists){
        const error =  new ErrorHandler(`user already exists`, 400);
        return res.status(404).send({success:false, message: error.message, status:error.statusCode})
    }
    const newUser = new User({
        name: name,
        email: email,
        password: password
    })

    const data = {
        name: name,
        email: email,
        password: password
    }
    const token = generateToken(data);

    await transporter.sendMail({
        from: 'joshua.jinu@kalvium.community',
        to: "joshuajinu007@gmail.com",
        subject: "Test Nodemailer email",
        text: "Hello World",

        html: `<h1>Hello World<h1/><p>http://localhost:8080/authentication/${token}<p/>`
    })

    await newUser.save();

    return res.send("New User Created")
}

export const verifyUserController = async (req, res) =>{
    const {token} = req.params;
    try {
        if(verifyUser(token)){
            //stores the token in the cookie
            return res.status(200).cookie('token', token).json({token, success: true});
        }
        return res.status(403).send({message: 'token expired'});
        
    } catch (error) {
        return res.status(403).send({message: error.message});
    }
}

export const signup = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        console.log("data not provided")
        return res.status(204).send({success: false, message: "Data not present"})
    }

    try{
        const userExists = await User.findOne({email: email});
        if(userExists){
            const error =  new ErrorHandler(`user already exists`, 400);
            return res.status(403).send({success:false, message: error.message, status:error.statusCode})
        }

        bcrypt.hash(password, 10, async function(err, hash){
            try{
                if(err){
                    return res.status(403).send({message: 'Please Enter'})
                }
                await new User.create({
                    name: name,
                    email,
                    password: hash,
                })
                return res.status(201).send({success: true, message: "User Created Successfully"});
            }catch(err){
                return res.status(500).send({success: false, message: "User Created Successfully"});
            }
        });
    }catch(err){
        return res.status(500).send({success: false, message: `Server error in signup: ${err.message}`})
    };
}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const userExists = await User.findOne({email: email});

        bcrypt.compare(password, userExists.password, function (err, res){
            if(err)
                res.status(403).send({success:false, message: err.message});
            let data = {
                id: userExists._id,
                email,
                password: userExists.password,
            };
    
            const token = generateToken(data); 

            return res
                .status(200)
                .cookie('token', token)
                .send({success: true, message: "User logged in successfully.."})
        });
    }catch(err){
        return res.status(403).send({success: false, message: err.message});
    }
}