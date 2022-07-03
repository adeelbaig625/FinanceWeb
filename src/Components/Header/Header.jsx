import React from 'react'
import './header.css'
import {useNavigate} from 'react-router-dom'
function Header() {
  const navigate=useNavigate()
  return (
    <div className='header'>
        <h1 style={{cursor:'pointer'}} onClick={()=>navigate("/home", { replace: true })}>Finance App</h1>
        <div className='header-right-container'>
       
        <div>Logout</div>
        </div>
        
    </div>
  )
}

export default Header