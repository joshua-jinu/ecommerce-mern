import mongoose from "mongoose";
import userModel from "../models/user.model";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";

export async function AddToCartController(req, res){
    const {productId, quantity} = req.body;
    const userId = req.UserId;
    try{
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).send({message: "invalid product ID", success: false});
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).send({message: "invalid user ID", success: false});
        }

        const checkUserpresent = await userModel.findOne({_id: userId});
        if(!checkUserpresent){
            return res.status(401).send({message: "Unauthorized, Please signup", success: false});
        }

        const productPresent = await productModel.findOne({_id: productId});
        if(productPresent){
            return res.status(400).send({message: "Product already present in the cart", success: false});
        }

        await cartModel.create({
            productId,
            userId,
            quantity
        })
        return res.status(201).send({message:'Product is successfully added', success: true})
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Server error in added product to cart', success: false})
    }
}

export async function getCartProducts(req, res){
    const userId = req.UserId;
    try{
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).send({message: "invalid user ID", success: false});
        }
        
        const checkUserpresent = await userModel.findOne({_id: userId});
        if(!checkUserpresent){
            return res.status(401).send({message: "Unauthorized, Please signup", success: false});
        }
        
        const data = await cartModel.find({userId});
        return res.status(200).send({message:'Data is successfully fetched', success: true, cartData: data});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Server error in added product to cart', success: false})
    }
}