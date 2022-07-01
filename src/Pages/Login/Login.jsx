import React from 'react'
import './login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../../firebase'
import {useNavigate} from 'react-router-dom'
function Login() {
  const [email,setEmail]=React.useState("");
  const navigate=useNavigate()
  const [password,setPassword]=React.useState("");
  const authenticate=(e)=>
  {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then(res=>
      {
        navigate('/signup')
      }).catch(err=>
        {
          console.log(err)
        })
  }
  return (
    <div className='Login-body'>
      <div className='Login-inner-container'>
        <div className='right-container'>
            <h1>Finance App</h1>
            <h2>The <span style={{color:'#5AFF6A'}}>#1</span> personal finance & budgeting app.</h2>
            <img src='/assets/loginVector.png'/>
        </div>
        <div className='left-container'>
          <div className='left-inner-container'>
            <h1>Login</h1>
            <form onSubmit={(e)=>authenticate(e)}>
            <input placeholder='Email' type='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder='Password' type='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit'>Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login