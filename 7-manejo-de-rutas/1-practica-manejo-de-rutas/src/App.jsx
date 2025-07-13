import React from 'react'
import { NavBar } from './components/NavBar'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Store from './pages/Store'
import Cart from './pages/Cart'


const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/carrito" element={<Cart/>}/>
    </Routes>
    </>
  )
}

export default App
