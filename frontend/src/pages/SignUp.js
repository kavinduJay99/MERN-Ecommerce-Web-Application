import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet'

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilePic : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    
    const imagePic = await imageTobase64(file)
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      } 
    })

  }


  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.signUP.url,{
            method : SummaryApi.signUP.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
    
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }

  }

  return (
    <>
        <Helmet>
            <title>Sign up</title>
        </Helmet>
            <section id='signup'>
                <div className='mx-auto container p-4 pt-32 font-poppins'>

                    <div className='bg-white  border-secondary p-5 w-full max-w-sm mx-auto border-4 rounded-2xl pt-7 mt-14 '>

                            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                                <div>
                                    <img src={data.profilePic || loginIcons} alt='login icons'/>
                                </div>
                                <form>
                                <label>
                                    <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload  Photo
                                    </div>
                                    <input type='file' className='hidden' onChange={handleUploadPic}/>
                                </label>
                                </form>
                            </div>

                            <form className='pt-5 flex flex-col gap-2 px-1 text-l text-tex' onSubmit={handleSubmit}>
                            <div className='grid'>
                                    <label>Name : </label>
                                    <div className='bg-slate-50 p-2 border rounded-2xl my-1'>
                                        <input 
                                            type='text' 
                                            placeholder='Enter Your Name' 
                                            name='name'
                                            value={data.name}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent'/>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <label>Email : </label>
                                    <div className='bg-slate-50 p-2 border rounded-2xl my-1'>
                                        <input 
                                            type='email' 
                                            placeholder='Enter Email' 
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent'/>
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
                                            required
                                            className='w-full h-full outline-none bg-transparent'/>
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
                                </div>

                                <div>
                                    <label>Confirm Password : </label>
                                    <div className='bg-slate-50 p-2 flex border rounded-2xl my-1'>
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            placeholder='Enter Confirm Password'
                                            value={data.confirmPassword}
                                            name='confirmPassword' 
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent'/>

                                        <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                            <span>
                                                {
                                                    showConfirmPassword ? (
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
                                </div>

                                <button className='bg-teal-600 hover:bg-teal-500 text-white px-6 py-1 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

                            </form>

                            <p className='my-5 text-center font-poppins text-tex'>Already have account ? <Link to={"/login"} className=' text-black hover:text-red-500 '>Login</Link></p>
                    </div>


                </div>
            </section>
    </>
  )
}

export default SignUp