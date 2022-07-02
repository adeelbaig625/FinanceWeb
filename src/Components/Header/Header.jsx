import React from 'react'
import './header.css'
function Header() {
  return (
    <div className='header'>
        <h1>Finance App</h1>
        <div className='header-right-container'>
        <div>Profile</div>
        <div>Logout</div>
        </div>
        
    </div>
  )
}

export default Header