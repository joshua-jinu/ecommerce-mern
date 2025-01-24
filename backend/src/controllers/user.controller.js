import User from '../models/user.model.js'
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { transporter } from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import cloudinary from '../utils/cloudinary.js'
import fs from 'fs'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userModel from '../models/user.model.js';

dotenv.config({
    path: '../config/.env'
});

const generateToken = (data) => {
    console.log(process.env.API_SECRET_KEY);
    const token = jwt.sign({name: data.name, email: data.email, password: data.password, id:data.id},process.env.API_SECRET_KEY);
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
    const file = req.file;

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

        const url = await cloudinary.uploader.upload(file.path, {
            filder: 'uploads',
        }).then((res)=>{
            fs.unlinkSync(file.path);
            return res.url;
        }).catch((err)=>{
            console.log(err);
        })

        bcrypt.hash(password, 10, async function(err, hash){
            try{
                if(err){
                    return res.status(403).send({message: 'Please Enter'})
                }
                const newUser = await User({
                    name: name,
                    email,
                    password: hash,
                    avatar: {
                        url: url,
                        public_id: `${email}_public_id`,
                    }
                })
                await newUser.save();
                return res.status(201).send({success: true, message: "User Created Successfully"});
            }catch(err){
                return res.status(500).send({success: false, message: `Error in User creation: ${err.message}`});
            }
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).send({success: false, message: `Server error in signup: ${err.message}`})
    };
}

export const login = async (req, res)=>{
    console.log(req.body);
    const {email, password} = req.body;
    try{
        const userExists = await User.findOne({email: email});

        bcrypt.compare(password, userExists.password, function (err, isMatch){
            if(err)
                return res.status(403).send({success:false, message: err.message});
            if (!isMatch) {
                return res.status(400).send({ success: false, message: "Incorrect password" });
            }

            let data = {
                id: userExists._id,
                email,
                password: userExists.password,
            };
    
            const token = generateToken(data); 
            return res.status(200).cookie('token', token).send({success: true, message: "User logged in successfully..", token});
        });
    }catch(err){
        console.log(err)
        return res.status(403).send({success: false, message: err.message});
    }
}

export const fetchUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(200).send({success:true, message: users})
}

export const getUserData = async (req, res) =>{
    const userId = req.UserId;
    try {
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return res.status(401).send({
                    message: 'Send Valid User Id',
                    success: false
                })
            }

            const userPresent = await userModel.findOne({_id:userId});
            if(!userPresent){
                return res.status(401).send({
                    message:'please signup, user not present',
                    success:false
                })
            }
            return res.status(200).send({message: userPresent, success: true});
    }catch (err) {
        console.log(err)
        return res.status(500).send({success: false, message: err.message});
    }
}

export const addAddressController = async (req, res) =>{
    const userId = req.UserId;
    const {city, country, address1, address2, zipCode, addressType} = req.body;

    try {
        const userExists = await userModel.findOne({_id: userId});
        if(!userExists)
            return res.status(404).send({message:'User not found', success: false});

        const userAddress = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType
        };

        userExists.address.push(userAddress);
        const response = await userExists.save();
        
        console.log('user address updated')
        return res.status(201).send({message: "User address Added", success:true, response})
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message, success: false});
    }
}

export const deleteAddress = async (req, res) =>{
    const userId = req.UserId;
    const addressId = req.params.id;
    try {  
        if(!mongoose.Types.ObjectId.isValid(addressId)){
            return res.status(404).send({message:'Invalid Address ID', success: false});
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(404).send({message:'Invalid User ID', success: false});
        }
        const userExists = await userModel.findOne({_id: userId});
        if(!userExists)
            return res.status(404).send({message:'Un-authorized', success: false});
        await userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { address: { _id: addressId } } },
            { new: true }
          );
        console.log("address deleted");
        return res.status(201).send({message: "User address deleted", success:true})
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message, success: false});
    }
}