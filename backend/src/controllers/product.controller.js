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
            message: 'Product Created',
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

export const getProducts = async (req, res) =>{
    try {
        const data = await Product.find({});
        res.status(200).json({success: true, message: "Data Fetched Successfully", data})
    } catch (error) {
        console.log(`Error in fetching products`, error.message);
        return res.status(500).json({success: false, message: err.message})
    }
}

// export const deleteProduct = async(req,res) =>{
//     const {id} = req.params;
//     const productExists = await Product.findOne({_id:id});
//     if(!productExists){
//         return res.status(400).json({success: false, message: "Product does not exist"});
//     }
//     try{
//         await Product.findByIdAndDelete(id);
//         return res.status(200).json({success: true, message: `Product ${id} Deleted`});
//     }catch(err){
//         console.log("Error in deleting product", err.message);
//         return res.status(500).json({success: false, message: "Error in product deletion"});
//     }
// }