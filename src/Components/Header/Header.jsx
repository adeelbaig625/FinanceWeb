import React from 'react'
import './header.css'
import {useNavigate} from 'react-router-dom'
import {Logout} from '../../DB/FirestoreQueries'
function Header() {
  const navigate=useNavigate()
  const onLogout=()=>
  {
    Logout()
  }
  return (
    <div className='header'>
        <h1 style={{cursor:'pointer'}} onClick={()=>navigate("/home", { replace: true })}>Finance App</h1>
        <div className='header-right-container'>
       
        <div onClick={()=>onLogout()}>Logout</div>
        </div>
        
    </div>
  )
}

export default Header