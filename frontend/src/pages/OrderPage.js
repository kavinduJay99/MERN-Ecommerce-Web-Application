import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';


const OrderPage = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url,{
      method: SummaryApi.getOrder.method,
      credentials: 'include',
    })

    const responseData = await response.json()

    setData(responseData.data)
    console.log("order list",responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      {
      !data[0] && (
        <p className='bg-slate-200 h-12 px-96 py-2'>No Orders available</p>
      )
      }
      <div>
        {
          data.map((item,index)=>{
            return(
              <div key={item.userId+index }>
                <p  className='font-semibold text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div>
                  
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default OrderPage;
