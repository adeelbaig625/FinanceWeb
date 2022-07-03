import React from 'react'
import './header.css'
import {useNavigate} from 'react-router-dom'
import {Logout} from '../../DB/FirestoreQueries'
import {getAuth,signOut } from 'firebase/auth'
function Header() {
  const navigate=useNavigate()
  const onLogout=()=>
  {
    const auth=getAuth()
    Logout().then(async res=>
      {
        const signoutref=await signOut(auth)
        navigate('/',{replace:true})
      })
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