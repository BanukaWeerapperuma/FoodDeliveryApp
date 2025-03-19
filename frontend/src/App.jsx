import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import './App.css'
import { useState } from 'react'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    { showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <> </> }

    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App