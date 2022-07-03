import React from 'react'
import Header from '../../Components/Header/Header'
import './editPayment.css'
import {GetSinglePayment, UpdatePayment} from '../../DB/FirestoreQueries'
function EditPayment() {
    const [title,setTitle]=React.useState('')
    const [description,setDescription]=React.useState('')
    const [amount,setAmount]=React.useState('')
    const [duedate,setDueDate]=React.useState('')
    const[loader,setLoader]=React.useState(false)
    React.useEffect(()=>
    {
        GetSinglePayment().then(res=>
            {
               setTitle(res.title)
               setAmount(res.amount)
               setDueDate(res.duedate)
               setDescription(res.description)
            })
    },[])
    const edit=async(e)=>
    {
        e.preventDefault()
        setLoader(true)
        try{
         const UpdatePaymentref=await UpdatePayment({title:title,description:description,amount:amount,duedate:duedate})
        window.location.reload()
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
    <div className='EditPayment'>
        <Header/>
        <h1>Edit Payment</h1>
        <div className='EditPayment-Container'>
        <form  onSubmit={(e)=>edit(e)}>
            <input placeholder='Title' type='text' value={title} required onChange={(e)=>setTitle(e.target.value)} />
            <input placeholder='Description' value={description} type='text' required onChange={(e)=>setDescription(e.target.value)}/>
            <input placeholder='Amount' value={amount} type='number' required onChange={(e)=>setAmount(e.target.value)} />
            <input placeholder='Due Date' value={duedate} type='date' required onChange={(e)=>setDueDate(e.target.value)} />
            <button type='submit' disabled={loader}>Edit Payment</button>
            
            </form>
        </div>
    </div>
  )
}

export default EditPayment