import React, { useContext } from 'react'
import './Verify.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url} =useContext(StoreContext);
    const navigate= useNavigate();

    const verifyPayment=async()=>{
        const response= await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }else{
            toast.error("Something went wrong");
            navigate("/");
        }
    }


    useEffect(() => {
            verifyPayment() 
    },[])
    //order payment status and order id
    console.log(success, orderId)
    
  return (
    <div className='verify'>
        <div className='spinner'>
        </div>
    </div>
  )
}

export default Verify