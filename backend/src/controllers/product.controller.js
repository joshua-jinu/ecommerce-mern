import Product from "../models/product.model.js";
import multer from "multer";
import cloudinary from '../utils/cloudinary.js'
import fs from 'fs';

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
        const newProduct = await Product.create({
            title,
            description,
            discountedPrice,
            price,
            stock,
            category,
            rating,
            images: dataImages
        })

        return res.status(201).send({
            message: 'Image Successfully Uploaded',
            success: true, 
            dataImages,
            newProduct
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