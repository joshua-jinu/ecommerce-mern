import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 1,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: false,
        enum: ["male", "female", "kids"]
    },
    images : {
        type:[String],
        required: true,
        default: ""
    }
}, {versionKey: false})

export default mongoose.model('Product', productSchema)