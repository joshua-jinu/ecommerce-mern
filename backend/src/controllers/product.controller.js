import mongoose from "mongoose";
import Product from "../models/product.model";
import multer from "multer";
import fs from 'fs';
import os from 'os';
import productModel from "../models/product.model.js";

export const createProductController = async (req, res) =>{
    const {title,
        description,
        discountedPrice,
        price,
        stock,
        category,
        rating} = req.body;

    try{
        const arrayImage = req.files.map(async (singleFile, index)=>{
            return cloudinary.uploader.upload(singleFile.path, {
                folder: 'uploads',
            }).then((result)=>{
                fs.unlinkSync(singleFile.path);
                return result.url;
            });
        })
        

        const dataImages = await Promise.all(arrayImage);
        const newProduct = await productModel.create({
            title,
            description,
            discountedPrice,
            price,
            stock,
            category,
            rating
        })

        return res.status(201).send({
            message: 'Image Successfully Uploaded',
            success: true, 
            dataImages
        });
    }catch(err){
        if(err instanceof multer.MulterError){
            return res.status(400).send({
                message: "send less then 5 images",
                success: false
            });
        }

        return res.status(500).send({message: err.message, success: false});
    }
}