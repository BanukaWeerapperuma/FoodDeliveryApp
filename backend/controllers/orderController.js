import { response } from "express";
import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
           

            
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                // currency: 'lkr',
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                // if i use LKR it will not work in stripe
                // so i have to use USD and then convert it to LKR in the backend
                // and then send it to the frontend
                //unit_amount: item.price * 100*300,

                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 2*100,
            },
            quantity: 1,
        });


        const session = await stripe.checkout.sessions.create({
            
            line_items : line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify ? success = true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify ? success = false&orderId=${newOrder._id}`,
        });

        res.status(200).json({ success :true , session_url: session.url });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
        
        
        
    }



}

export { placeOrder };