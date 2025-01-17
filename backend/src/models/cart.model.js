import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {type: mongoose.Types.ObjectId, ref:'Product' ,required: true},
    userId: {type: mongoose.Types.ObjectId, red:'User', required: true},
    quantity: {type: Number, required: true,  default: 1},
});

export default mongoose.model('Cart', cartSchema);

