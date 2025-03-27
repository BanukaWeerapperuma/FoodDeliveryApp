import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

//end point for login and register
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
