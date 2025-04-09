import userModel from "../models/userModel.js";


//add item to user cart

const addToCart = async (req, res) => {
   try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartItems;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] =  1
    }else{
        cartData[req.body.itemId] += 1
    }

    await userModel.findByIdAndUpdate(req.body.userId , {cartData});

    res.status(200).json({success:true , message : "Item added to cart"});
    

   } catch (error) {
    res.status(500).json({success:false , message : "Internal server error"});
    console.log(error);
   }

}


//remover item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId , {cartData});

        res.status(200).json({success:true , message : "Item removed from cart"});


    } catch (error) {
        res.status(500).json({success:false , message : "Internal server error"});
        console.log(error);

        
    }

}


//fetch user cart
const getCart = async (req, res) => {

    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.status(200).json({success:true , cartData});
    } catch (error) {
        res.status(500).json({success:false , message : "Internal server error"});
        console.log(error);
        
    }
}


export { addToCart, removeFromCart, getCart };