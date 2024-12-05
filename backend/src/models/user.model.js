import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: [true, "Enter the Name"]
    },
    email : {
        type: String,
        require: [true, "Enter the Email"],
        unique: [true, "The email address should be unqiue"]
    }, 
    password : {
        type: String,
        require: [true, "Enter the Password"]
    },
    country : {
        type: String,
        require: [true, "Enter the Country"]
    }, 
    address : [
        {city: String}, 
        {country: String}, 
        {add1: String}, 
        {add2: String}, 
        {zipCode: String}, 
        {addressType: String}
    ],
    role: {type: String, default: 'user'},
    avatar: {
        url: {type: String, require: true}, 
        public_id: {type: String, require: true} 
    }, 
    resetPasswordToken: String,
    resetPasswordTime: Date,
},
    {versionKey: false}
)

export default mongoose.model('User', userSchema)