import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/SideBar'
import { Routes , Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'



const App = () => {
  return (
    <div>
         <Navbar />
         <hr />
         <div className="app-content">
          <SideBar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
         </div>
    </div>
  )
}

export default App


