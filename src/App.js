
import './App.css';
import React, {useState,useEffect} from 'react'
import {getToken1,onMessageListener} from './firebase'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import { getAuth ,onAuthStateChanged} from 'firebase/auth'
import AddPayment from './Pages/AddPayment/AddPayment';
import EditPayment from './Pages/EditPayment/EditPayment';
function App() {
  const { pathname } = useLocation()
  const navigate=useNavigate()


    return (
       
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addpayment' element={<AddPayment/>}/>
          <Route path='/editpayment/:paymentid' element={<EditPayment/>}/>
        </Routes>
    
    );
  }
  
  
  


export default App;
