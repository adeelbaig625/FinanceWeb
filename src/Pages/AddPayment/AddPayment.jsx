import React from 'react'
import Header from '../../Components/Header/Header'
import './addpayment.css'
import {AddPayment as AddPaymentFirestore} from '../../DB/FirestoreQueries'
function AddPayment() {
    const [title,setTitle]=React.useState('')
    const [description,setDescription]=React.useState('')
    const [amount,setAmount]=React.useState('')
    const [duedate,setDueDate]=React.useState('')
    const add=(e)=>
    {
        e.preventDefault()
        AddPaymentFirestore({title:title,description:description,amount:amount,duedate:duedate})
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
            <button type='submit'>Add Payment</button>
            
            </form>
        </div>
    </div>
  )
}

export default AddPayment