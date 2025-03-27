import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData : {type: Object, default : {}},

} , {minimize : false})

// if user model is already created then use it otherwise create new one
const userModel = mongoose.models.user || mongoose.model("User", userSchema); 



export default userModel;
