import React from 'react'
import { Link } from 'react-router-dom'
import Success1 from '../assest/Success1.gif'


const Success = () => {
  return (
    <div className=' w-full max-w-md mx-auto py-60 flex justify-center items-center flex-col rounded-lg'>
        <img  className="rounded-full " src={Success1} width={150} height={150}/>
        <p className='text-green-600 mt-10 font-bold text-3xl'>Payment Successfull</p>
        <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success
