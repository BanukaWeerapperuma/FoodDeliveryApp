import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user

const loginUser = async (req, res) => {
    const {email , password} = req.body;
    try{
        //checking user is already in
        const user = await userModel.findOne({email : email});
        if(!user){
            return res.status(400).json({success:false , message : "User does not exists"});
        }


        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false , message : "Invalid Email"});
        }

        //checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false , message : "Invalid Password"});
        }

        //creating token
        const token = createToken(user._id);

        //sending response
        res.status(200).json({success : true , message : "Login Successfully" , token : token});

    }catch(error){
        res.status(500).json({success:false , message : "Internal server error"});
        console.log(error);
    }


}

//create token
const createToken = (id) => {
            return jwt.sign({id}, process.env.JWT_SECRET);
        }

//register user

const registerUser = async (req, res) => {
    const { name,  password , email } = req.body;

    try{
        //checking user is already in
        const exists = await userModel.findOne({email : email});
        if(exists){
            return res.status(400).json({success:false , message : "User already exists"});
        }

        //validating email format  & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false , message : "Invalid Email"});
        }


        //check password length
        if(password.length < 8){
            return res.status(400).json({success:false , message : "Password must be at least 8 characters"});
        }

        //password encryption using bcrypt
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new userModel({
            name: name,
            email : email,
            password : hashedPassword
        })

        //saving user
        const user = await newUser.save();

        //generating token
        const token = createToken(user._id);

        //sending response
        res.status(200).json({success:true , message : "User registered successfully", token : token});

    }catch(error){
        res.status(500).json({success:false , message : "Internal server error"});
        console.log(error);
    }
}

export { loginUser, registerUser };
