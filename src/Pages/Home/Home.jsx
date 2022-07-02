import React from 'react'
import './home.css'
import Header from '../../Components/Header/Header'
function Home() {
  return (
    <div className='home'>
        <Header/>
        <div className='home-inner-container'>
            <h2>Payments</h2>
            <div className='home-inner-right-container'>
            <button>
                Add Payment
            </button>
            <button>
                Delete Payment
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
            </div>
        </div>
    </div>
  )
}

export default Home