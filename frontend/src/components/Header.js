import React, { useContext, useState } from 'react'
import { FiSmartphone } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user =useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const  [menuDisplay,setMenuDisplay]  = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput =useLocation()
  const [search,setSearch] = useState(searchInput?.search.split("-")[1])

  console.log("searchInput",searchInput?.search.split("-")[1])

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
    method : SummaryApi.logout_user.method,
    credentials : "include"
  })

  const data = await fetchData.json()

  if(data.success){
    toast.success(data.message)
    dispatch(setUserDetails(null))
    navigate("/")
  }

  if(data.error){
    toast.error(data.message)
  }
  }

  const handleSearch = (e)=> {
    const  {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else(
      navigate(`/search`)
    )
  } 
  
  
  return (
    <header className=' h-24 shadow-md rounded-b-xl bg-teal-400 fixed w-full z-40 '>

      <div className='h-full container mx-auto flex items-center  px-4 justify-between ' >
       
        <div className='text-white text-xl'>
        <FiSmartphone className="w-10 h-14"/>
        </div>

        <div className=' hidden lg:flex items-center w-full justify-between max-w-2xl border rounded-xl focus-within:shadow-lg bg-white pl-6 mt-1'>
          <input type='text' placeholder='Search here...' className='w-full outline-none  bg-white' onChange={handleSearch} value={search}/>
          
          <div className='text-2xl min-w-[50px] h-8 bg-white flex items-center justify-center rounded-lg text-black hover:text-white hover:bg-teal-400 transition-all p-4 m-1'>
            <Link to={"/"}>
            <IoIosSearch />
            </Link>
          
          </div>

        </div>

        <div className='flex items-center gap-7 '>
          
          <div className='relative flex justify-center '>

            {
              user?._id && (
                <div className='text-2xl cursor-pointer relative flex justify-center text-white' onClick={()=>setMenuDisplay(preve => !preve)}>
                <FaUser  />
              </div>
              )
            }

            {
              menuDisplay  && (
                <div className='absolute bg-white bottom-0 top-7 h-fit p-1 shadow-lg rounded-lg '>
              <nav>
                {
                  user?.role === ROLE.ADMIN && (
                    <Link to={"/Admin-panel/all-products"}  className='whitespace-nowrap text-lg hidden md:block hover:bg-teal-400 hover:text-white hover:rounded-lg p-4' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                  )
                }
              </nav>
            </div>
              )
            }
          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl  relative text-white'>
                  <span><FaCartShopping /></span>

                  <div className='bg-red-600 text-white w-5 h-5  rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                  </div>
              </Link>
            )
          }
          

          <div className='text-lg border-2 px-2 pb-1 mt-1  relative rounded-md font-semibold text-white hover:bg-white hover:text-teal-600 hover:border-teal-300 '>
            {user?._id ? (
              <button  onClick={handleLogout}>
                LogOut
              </button>

            ) : (

              <Link to={"/login"}>
                LogIn
              </Link>
            )}
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header
