import React from 'react'
import './signup.css'
import { Signup as SignupQuery } from '../../DB/FirestoreQueries'
import {useNavigate} from 'react-router-dom'
function Signup() {
  const navigate=useNavigate()
  const [email,setEmail]=React.useState("");
  const [name,setName]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [loader,setLoader]=React.useState(false)
  const authenticate=(e)=>
  {
    e.preventDefault();
    setLoader(true)
    SignupQuery(name,email,password).then(res=>
      {
        navigate('/home')
      
      }).catch(err=>
        {
          console.log(err)
          setLoader(false)
        })
      }

  return (
    <div className='SignUp-body'>
      <div className='SignUp-inner-container'>
        <div className='SignUp-right-container'>
            <h1>Finance App</h1>
            <h2>The <span style={{color:'#5AFF6A'}}>#1</span> personal finance & budgeting app.</h2>
            <img src='/assets/loginVector.png'/>
        </div>
        <div className='SignUp-left-container'>
          <div className='SignUp-left-inner-container'>
            <h1>Sign up</h1>
            <form  onSubmit={(e)=>authenticate(e)}>
            <input placeholder='Name' type='text' required value={name} onChange={(e)=>setName(e.target.value)} />
            <input placeholder='Email' type='email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder='Password' type='password' required value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password"/>
            {!loader && <button type='submit'>Sign up</button>}
            {!loader && <p>Already have account? <span onClick={()=> navigate('/')} style={{textDecoration:'underline',cursor:'pointer'}}>Sign in</span></p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup