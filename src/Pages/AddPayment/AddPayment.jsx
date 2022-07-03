import React from 'react'
import Header from '../../Components/Header/Header'
import './addpayment.css'
import {AddPayment as AddPaymentFirestore} from '../../DB/FirestoreQueries'
import {useNavigate} from 'react-router-dom'
function AddPayment() {
    const [title,setTitle]=React.useState('')
    const [description,setDescription]=React.useState('')
    const [amount,setAmount]=React.useState('')
    const [duedate,setDueDate]=React.useState('')
    const[loader,setLoader]=React.useState(false)
    const navigate=useNavigate()
    const add=async(e)=>
    {
        e.preventDefault()
        setLoader(true)
        try{
         const addPayment=await AddPaymentFirestore({title:title,description:description,amount:amount,duedate:duedate})
         setTitle('')
         setDescription('')
         setAmount('')
         setDueDate('')
         navigate('/home',{replace:true})
        }
        catch(e)
        {
            console.log(e)
        }
        finally
        {
          setLoader(false)
        }
     
    }
  return (
    <div className='AddPayment'>
        <Header/>
        <h1>Add Payment</h1>
        <div className='AddPayment-Container'>
        <form  onSubmit={(e)=>add(e)}>
            <input placeholder='Title' type='text' value={title} required onChange={(e)=>setTitle(e.target.value)} />
            <input placeholder='Description' value={description} type='text' required onChange={(e)=>setDescription(e.target.value)}/>
            <input placeholder='Amount' value={amount} type='number' required onChange={(e)=>setAmount(e.target.value)} />
            <input placeholder='Due Date' value={duedate} type='date' required onChange={(e)=>setDueDate(e.target.value)} />
            <button type='submit' disabled={loader}>Add Payment</button>
            
            </form>
        </div>
    </div>
  )
}

export default AddPayment