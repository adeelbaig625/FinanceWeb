import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase'
import { getAuth ,onAuthStateChanged} from 'firebase/auth'
import { UpdatePayment } from '../../DB/FirestoreQueries';
import Header from '../../Components/Header/Header'
function Home() {
    const navigate=useNavigate()
    const [data,setData]=React.useState([])
   

    React.useEffect(()=>
    {
        const authref =  getAuth();
        const unregisterAuthObserver =onAuthStateChanged(authref, async(user) => {
                if(user)
                {
                        const q = query(collection(db,"Users" ,user.uid,"Payments"), where("isDelete", "==", false))
                        const unsubscribe = onSnapshot(q, (querySnapshot) => {
                            const payments = [];
                            querySnapshot.forEach((doc) => {
                              payments.push({id:doc.id,...doc.data()});
                            });
                            setData(payments)
                          });
                          return ()=>unsubscribe()     
                }
                else
                {
                        navigate('/',{replace:true})
                }
         
                })
        
                return () => unregisterAuthObserver()
      
    })
    const updateStatus=(id,status)=>
    {
        UpdatePayment(id,{status:status})
    }

    const deletePayment=(id)=>
    {
        UpdatePayment(id,{isDelete:true})
    }
  return (
    <div className='home'>
        <Header/>
        <div className='home-inner-container'>
            <h2>Payments</h2>
            <div className='home-inner-right-container'>
            <button onClick={()=>navigate('/addpayment')}>
                Add Payment
            </button>
           
            </div>
        </div>
        <div className='payment-table'>
            <div className='table-name-div'>
            <div className='table-col'>
                        S.NO
                </div>
                <div className='table-col'>
                        Title
                </div>
                <div className='table-col'>
                        Description
                </div>
                <div className='table-col'>
                        Amount
                </div>
                <div className='table-col'>
                        Due date
                </div>
                <div className='table-col'>
                        Status
                </div>
                <div className='table-col'>
                       
                </div>
            </div>
            {data?.map((d,index)=>
            
                <div className='table-data-div'>
            <div className='table-col'>
                       {index+1}
                </div>
                <div className='table-col'>
                        {d.title}
                </div>
                <div className='table-col'>
                        {d.description}
                </div>
                <div className='table-col'>
                        {d.amount}
                </div>
                <div className='table-col'>
                        {d.duedate}
                </div>
                
                      <div className='table-switch-btn'>
                        <p className={d.status?'':'active'} onClick={()=>updateStatus(d.id,false)}>Not paid</p>
                        <p className={d.status?'active':''} onClick={()=>updateStatus(d.id,true)}>Paid</p>
                       
                </div>
                <div className='table-col'>
                       <img src='/assets/edit.png' onClick={()=>navigate(`/editpayment/${d.id}`)}/>
                       <img src='/assets/remove.png' onClick={()=>deletePayment(d.id)}/>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Home