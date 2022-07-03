import React from 'react'
import './login.css'
import { Signin } from '../../DB/FirestoreQueries';
import {useNavigate} from 'react-router-dom'
import { getAuth ,onAuthStateChanged} from 'firebase/auth'
function Login() {
  const [email,setEmail]=React.useState("");
  const navigate=useNavigate()
  const [password,setPassword]=React.useState("");
  const [loader,setLoader]=React.useState(false)

  const authenticate=(e)=>
  {
    e.preventDefault();
    setLoader(true)
    Signin(email,password).then(res=>
      {
        navigate('/home', { replace: true })
      }).catch(err=>
        {
          setLoader(false)
        })
  }
  React.useEffect(()=>
  {
    const authref =  getAuth();
    const unregisterAuthObserver =onAuthStateChanged(authref, async(user) => {
      if(user)
      {
        navigate('/home', { replace: true })
      }
    
            })
    
            return () => unregisterAuthObserver()
  
  })
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
            <input placeholder='Password' type='password' required value={password} onChange={(e)=>setPassword(e.target.value)}  autoComplete="new-password"/>
            {!loader && <button type='submit'>Log in</button>}
            {!loader &&<p>Don't have account? <span onClick={()=> navigate('/signup')} style={{textDecoration:'underline',cursor:'pointer'}}>Sign up</span></p>}
            </form>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login