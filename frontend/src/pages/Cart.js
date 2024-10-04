import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displaySLCurrency from '../helpers/displaySLCurrency'
import { MdDelete } from "react-icons/md";
import { Helmet } from 'react-helmet'
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const updateQty = async (id, qty) => {
        if (qty < 1 && qty !== '') return;

        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty === '' ? 0 : qty
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const handleInputChange = (id, value) => {
        const qty = value === '' ? '' : parseInt(value);
        setData(prevData => prevData.map(product => 
            product._id === id ? { ...product, quantity: qty } : product
        ));
        if (qty !== '') {
            updateQty(id, qty);
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }


    const handlePayment = async () => {

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers: {
                "content-type": 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })

        
        const responseData = await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({ sessionId : responseData.id })
        }

        console.log("payment resopnse", responseData)
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)


    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <div className='container mx-auto font-poppins'>

                <div className='text-center text-lg '>
                    {
                        data.length === 0 && !loading && (
                            <p className='bg-white py-5'>No Data</p>
                        )
                    }
                </div>

                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4 '>
                    {/***view product */}
                    <div className='w-full max-w-2xl mt-28'>
                        {
                            loading ? (
                                loadingCart?.map((el, index) => {
                                    return (
                                        <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                        </div>
                                    )
                                })

                            ) : (
                                data.map((product, index) => {
                                    return (
                                        <div key={product?._id + "Add To Cart Loading"} className='w-full  bg-slate-200 h-32 my-2 border border-slate-300  rounded-lg grid grid-cols-[128px,1fr]'>
                                            <div className='w-32 h-32 bg-white rounded-lg'>
                                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                            </div>
                                            <div className='px-4 py-2 relative'>
                                                {/**delete product */}
                                                <div className='absolute right-1 top-1 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                    <MdDelete />
                                                </div>

                                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-red-600 font-medium text-l mt-3'>{displaySLCurrency(product?.productId?.sellingPrice)}</p>
                                                    <p className='text-slate-600 font-semibold text-l mt-3'>{displaySLCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                </div>
                                                <div className='flex items-center gap-3 '>
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-4 h-4 flex justify-center items-center rounded ' onClick={() => updateQty(product?._id, product?.quantity - 1)}>-</button>
                                                    <input 
                                                        type="number" 
                                                        value={product?.quantity === 0 ? '' : product?.quantity} 
                                                        onChange={(e) => handleInputChange(product?._id, e.target.value)} 
                                                        className='w-12 text-center border border-gray-300 rounded' 
                                                        placeholder='0'
                                                    />
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-4 h-4 flex justify-center items-center rounded ' onClick={() => updateQty(product?._id, product?.quantity + 1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>

                    {/***summary***/}
                    {
                        data[0] && (
                            <div className=' w-full max-w-xl pt-2 mt-5 lg:mt-0'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                                </div>
                            ) : (
                                <div className='h-36 bg-whit rounded-lg mt-28'>
                                    <h2 className='text-white justify bg-teal-600 px-4 py-1 h-12 rounded-t-xl '>Summary</h2>
                                    <div className='flex items-center justify-between px-6 pt-2 gap-2 font-medium text-lg text-blac'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-6 pt-2 gap-2 font-medium text-lg text-blac'>
                                        <p>Total Price</p>
                                        <p>{displaySLCurrency(totalPrice)}</p>
                                    </div>

                                    <button 
                                    className='bg-red-500 p-2 text-white w-full mt-4 rounded-b-xl' 
                                    onClick={handlePayment}>Payment</button>

                                </div>
                            )
                        }
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Cart
