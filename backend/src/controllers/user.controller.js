import User from '../models/user.model.js'
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const createUser = async (req, res) => {
    const {name, email, password} = req.body();
    const userExists = await User.findOne({email: email});
    if(userExists){
        return new ErrorHandler(`user already exists`, 400);
    }
    new User({
        name: name,
        email: email,
        password: password
    })
    await User.save();
    return res.send("New User Created")
}