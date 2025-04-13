import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/SideBar'
import { Routes , Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login'




const App = () => {

  const url = "http://localhost:4000"
  

  return (
    <div>
          <ToastContainer />
         <Navbar />
         <hr />
         <div className="app-content">
          <SideBar />
          <Routes>
           <Route path="/" element={<Login url={url}/>} />
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Order url={url}/>} />
          </Routes>
         </div>
    </div>
  )
}

export default App


