import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'





const PlaceOrder = () => {

  const {getTotalCartAmount , token , food_list , cartItems , url} = useContext(StoreContext);

  const [data , setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipCode : "",
    country : "",
    phone : ""
  })

  const onChangeHandler = (event) => {
      const {name , value} = event.target;
      setData({
        ...data,
        [name] : value
      })
  }

  const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      let orderData = {

        address : data,
        items : orderItems,
        amount : getTotalCartAmount() + 2

      }
      let response = await axios.post(url + "/api/order/place" , orderData , {headers:{token}});

      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }else{
        alert(response.data.message);
      }

  }

  //verify create details
  // useEffect (()=>{
  //   console.log(data);
  // },[data])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} type="text" placeholder='First Name' value={data.firstName}/>
          <input required name='lastName'  onChange={onChangeHandler} type="text" placeholder='Last Name' value={data.lastName}/>
        </div>
        <input required name='email' onChange={onChangeHandler} type="email" placeholder='Email Address' value={data.email}/>
        <input required name='street' onChange={onChangeHandler} type="text" placeholder='Street' value={data.street}/>

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state}   type="text" placeholder='State'/>
      </div>

      <div className="multi-fields">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country}   className='country' type="text" placeholder='Country'/>
      </div>

    <input  required name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone' />

      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() > 0 ? "$ 2" : "$ 0"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}</b>
            </div>
            
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder