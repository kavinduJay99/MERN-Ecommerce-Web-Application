import React from 'react'
import { Link } from 'react-router-dom'
import faild from '../assest/faild.png'

const Cancel = () => {
  return (
    <div className=' w-full max-w-md mx-auto py-60 flex justify-center items-center flex-col rounded-lg'>
        <img  className="rounded-full " src={faild} width={150} height={150}/>
        <p className='text-red-600  font-bold text-3xl'>Payment Faild</p>
        <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-green-red hover:bg-red-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Cancel