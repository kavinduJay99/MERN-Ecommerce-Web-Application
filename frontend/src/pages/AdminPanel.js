import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { Helmet } from 'react-helmet'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <>
        <Helmet>
            <title>Admin Panel</title>
        </Helmet>
            <div className='min-h-[calc(100vh-60px)] md:flex hidden font-poppins'>
                <aside className='bg-white min-h-full  w-full  max-w-60 customShadow mt-24 my-1 pt-4 rounded-r-lg border '>
                        <div className='h-40  flex justify-center items-center flex-col '>
                            <div className='text-5xl cursor-pointer relative flex justify-center'>
                                {
                                user?.profilePic ? (
                                    <img src={user?.profilePic} className='w-20 h-20 rounded-full ' alt={user?.name} />
                                ) : (
                                    <FaUser/>
                                )
                                }
                            </div>
                            <p className='capitalize text-blac text-l font-semibold'>{user?.name}</p>
                            <p className='text-xs text-blac'>{user?.role}</p>
                        </div>

                        {/***navigation */}       
                        <div>   
                            <nav className='grid pt-1 p-4'>
                                <Link to={"all-users"} className='px-2 py-1  hover:bg-teal-200 hover:rounded-lg'>All Users</Link>
                                <Link to={"all-products"} className='px-2 py-1  hover:bg-teal-200 hover:rounded-lg'>All Products</Link>
                            </nav>
                        </div>  
                </aside>

                <main className='w-full h-full p-2'>
                    <Outlet/>
                </main>
            </div>
    </>
  )
}

export default AdminPanel