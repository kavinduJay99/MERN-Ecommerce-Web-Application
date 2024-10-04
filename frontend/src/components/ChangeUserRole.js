import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)

    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-300 bg-opacity-50'>
       <div className='mx-auto bg-white shadow-md p-5 w-full max-w-sm rounded-xl'>

        <div className='flex justify-between items-center pb-5'>
            <h1 className='font-semibold text-xl '>Change User Role</h1>

            <button className='block ml-auto text-2xl  hover:text-red-600 cursor-pointer' onClick={onClose}>
                <IoMdClose/>
            </button>
        </div>

             <p className='text-l'>Name : {name}</p>   
             <p className='text-l'>Email : {email}</p> 

            <div className='flex items-center justify-between my-3'>
                <p className='text-lg'>Role :</p>  
                <select className='border px-3 py-1 appearance-none row-start-1 col-start-1 rounded-lg bg-slate-50 bg-slate-400 ' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>


            <button className='w-fit mx-auto block  py-1 px-5 rounded-lg bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
       </div>
    </div>
  )
}

export default ChangeUserRole