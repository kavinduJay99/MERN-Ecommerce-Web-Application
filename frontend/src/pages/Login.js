import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { Helmet } from 'react-helmet'

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)
    
  return (
    <>
        <Helmet>
            <title>Login</title>
        </Helmet>
            <section id='login '>
            <div className='mx-auto container p-4 pt-32 font-poppins'>
                
                <div className='bg-whit  border-secondary p-5 w-full max-w-sm mx-auto border-4 rounded-2xl pt-7 mt-20'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icon' className='rounded-full' />
                        </div>

                            <form className='pt-5 flex flex-col gap-2 px-1 text-l text-tex' onSubmit={handleSubmit}>
                                <div className='grid'>
                                    <label>Email : </label>
                                    <div className='bg-slate-50 p-2 border rounded-2xl my-1'>
                                        <input 
                                            type='email' 
                                            placeholder='Enter Email' 
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            className='w-full h-full outline-none bg-transparent '/>
                                    </div>
                                </div>

                                <div>
                                    <label>Password : </label>
                                    <div className='bg-slate-50 p-2 flex border rounded-2xl my-1'>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder='Enter Password'
                                            value={data.password}
                                            name='password' 
                                            onChange={handleOnChange}
                                            className='w-full h-full outline-none bg-transparent '/>
                                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                            <span>
                                                {
                                                    showPassword ? (
                                                        <FaEyeSlash/>
                                                    )
                                                    :
                                                    (
                                                        <FaEye/>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={'/forgot-password'} className='block w-fit ml-auto pt-1 hover:text-red-500'>
                                        Forgot password ?
                                    </Link>
                                </div>

                                <button className='bg-teal-600 hover:bg-teal-500 text-white px-6 py-1 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                            </form>

                            <p className='my-5 text-center text-tex '>Don't have an account ? <Link to={"/sign-up"} className=' text-black hover:text-red-500'>Register</Link></p>
                    </div>
                </div>
            </section>
    </>
  )
}

export default Login