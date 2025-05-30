import React, { use } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import axios from 'axios'




const LoginPopUp = ({setShowLogin}) => {

    //fetch url from api
    const {url , setToken} = useContext(StoreContext)

    const [currState , setCurrState] = useState("Login")


    // send data to backend
    const [data , setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    //
    const onChangeHandler = (e) => {
        const {name , value} = e.target

        setData({
            ...data,
            [name] : value
        })
    }

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;

        if(currState === "Login"){
            newUrl += "/api/user/login";
        }else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl , data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token" , response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message);
        }






    }

    //verify user

    // useEffect(()=>{
    //    console.log(data)
    // },[data])





  return (
    <div  className="login-popup">
        <form  onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input  name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>

            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox"  required/>
                <p>By continuing, I agree to the Terms of Use and Privacy Policy</p>
            </div>
            {currState === "Login" ? 
           <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> : 
           <p>Already have an account ? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
            
            
        </form>
    </div>
  )
}

export default LoginPopUp